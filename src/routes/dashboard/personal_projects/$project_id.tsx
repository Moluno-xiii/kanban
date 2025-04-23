import { QueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import AddTodoForm from "../../../components/forms/AddTodoForm";
import DeleteProjectModal from "../../../components/modals/DeleteProjectModal";
import ProjectTodo from "../../../components/ProjectTodo";
import Error from "../../../components/ui/Error";
import GoBack from "../../../components/ui/GoBack";
import Loading from "../../../components/ui/Loading";
import Modal from "../../../components/ui/Modal";
import { useModalContext } from "../../../contexts/ModalContext";
import useProject from "../../../hooks/useProject";
import useProjectTodos from "../../../hooks/useProjectTodos";
import { dateToString, Todo } from "../../../utils/helperFunctions";
import { getUserProject } from "../../../utils/project";
import { getProjectTodos } from "../../../utils/todo";

export const Route = createFileRoute(
  "/dashboard/personal_projects/$project_id",
)({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const { queryClient } = context as {
      queryClient: QueryClient;
    };

    const [todos, project] = await Promise.all([
      queryClient.ensureQueryData({
        queryKey: ["todo", params.project_id],
        queryFn: () => getProjectTodos(params.project_id),
      }),
      queryClient.ensureQueryData({
        queryKey: ["project", params.project_id],
        queryFn: () => getUserProject(params.project_id),
      }),
    ]);

    return { todos, project };
  },
  pendingComponent: () => Loading({ message: "Loading project data" }),
  errorComponent: () => <div>Could not Load page content, try again.</div>,
});

function RouteComponent() {
  const { project_id } = Route.useParams();
  const {
    activeModal,
    activeProjectModalId,
    handleActiveModal,
    handleProjectModal,
  } = useModalContext();

  const { data: project, isPending, error } = useProject(project_id);
  const {
    data: todos,
    isPending: loadingTodos,
    error: todoError,
  } = useProjectTodos(project_id);

  if (isPending || loadingTodos)
    return <Loading message="loading project data" />;
  if (error) return <Error errorMessage={error.message} />;
  if (todoError) return <Error errorMessage={todoError.message} />;

  return (
    <div className="flex flex-col gap-y-6">
      <GoBack route={"/dashboard/personal_projects"} />
      <div className="flex flex-col gap-y-3">
        <div className="flex flex-row items-center justify-between">
          <span className="text-xl first-letter:capitalize sm:text-2xl">
            {project.project_name}
          </span>
          <button className="btn" onClick={() => handleActiveModal("add todo")}>
            add todo
          </button>

          {activeModal === "add todo" ? (
            <Modal handleClose={() => handleActiveModal(null)} title="Add todo">
              <AddTodoForm
                handleModal={handleActiveModal}
                projectId={project_id}
              />
            </Modal>
          ) : null}
        </div>
        <span>Project Description : {project.description}</span>
        <span>Number of Todos : {todos?.length || 0}</span>
        <span>Date created : {dateToString(project.created_at as string)}</span>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {todos?.map((todo: Todo) => (
            <ProjectTodo key={todo.id} project_id={project_id} todo={todo} />
          ))}
        </ul>
      </div>
      <button
        aria-label="delete project button"
        className="btn-error self-end"
        onClick={() => {
          handleActiveModal("delete project");
          handleProjectModal(project.project_id);
        }}
      >
        Delete Project
      </button>
      {activeModal === "delete project" &&
      activeProjectModalId === project.project_id ? (
        <DeleteProjectModal nested={true} />
      ) : null}
    </div>
  );
}
