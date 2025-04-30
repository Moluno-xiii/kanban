import { QueryClient } from "@tanstack/react-query";
import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { lazy, Suspense, useState } from "react";
import AddTodoForm from "../../../components/forms/AddTodoForm";
import DeleteProjectModal from "../../../components/modals/DeleteProjectModal";
import Error from "../../../components/ui/Error";
import GoBack from "../../../components/ui/GoBack";
import Loading from "../../../components/ui/Loading";
import Modal from "../../../components/ui/Modal";
import { useModalContext } from "../../../contexts/ModalContext";
import useProject from "../../../hooks/useProject";
import useProjectTodos from "../../../hooks/useProjectTodos";
import { dateToString } from "../../../utils/helperFunctions";
import { getUserProject } from "../../../utils/project";
import { getProjectTodos } from "../../../utils/todo";

const SortedPersonalProjectTodos = lazy(
  () => import("../../../components/SortedPersonalTodos"),
);

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
  validateSearch: (search) => {
    return {
      type: (search.type as string) || null,
    };
  },
  errorComponent: () => <div>Could not Load page content, try again.</div>,
});

function RouteComponent() {
  const { project_id } = Route.useParams();
  const { type } = useSearch({ from: Route.id });
  const navigate = useNavigate();
  const {
    activeModal,
    activeProjectModalId,
    handleActiveModal,
    handleProjectModal,
  } = useModalContext();
  const [todoType, setTodoType] = useState<"yes" | "no">("no");

  const { data: project, isPending, error } = useProject(project_id);
  const { data: todos, isPending: loadingTodos } = useProjectTodos(project_id);

  if (isPending || loadingTodos)
    return <Loading message="Loading project data" />;

  if (error) return <Error errorMessage={error.message} />;

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

        <div className="flex flex-row items-center gap-x-5">
          <button
            className={`hover:text-secondary cursor-pointer text-lg transition-all duration-200 hover:underline md:text-xl ${type === "unfinished" ? "text-secondary underline" : "text-text"}`}
            onClick={() => {
              navigate({
                to: "/dashboard/personal_projects/$project_id",
                params: { project_id },
                search: () => ({ type: "unfinished" }),
              });
              setTodoType("no");
            }}
          >
            Unfinished Todos
          </button>
          <button
            onClick={() => {
              navigate({
                to: "/dashboard/personal_projects/$project_id",
                params: { project_id },
                search: () => ({ type: "finished" }),
              });
              setTodoType("yes");
            }}
            className={`hover:text-secondary cursor-pointer text-lg transition-all duration-200 hover:underline md:text-xl ${type === "finished" ? "text-secondary underline" : "text-text"}`}
          >
            Finished Todos
          </button>
        </div>
        <Suspense fallback={<span>Loading {type} todos...</span>}>
          <SortedPersonalProjectTodos
            todoType={todoType}
            type={type}
            project_id={project_id}
          />
        </Suspense>
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
