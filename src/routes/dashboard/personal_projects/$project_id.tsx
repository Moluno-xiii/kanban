import { createFileRoute } from "@tanstack/react-router";
import AddTodoForm from "../../../components/forms/AddTodoForm";
import Error from "../../../components/ui/Error";
import GoBack from "../../../components/ui/GoBack";
import Loading from "../../../components/ui/Loading";
import Modal from "../../../components/ui/Modal";
import { useProjectModalContext } from "../../../contexts/ProjectModalContext";
import useDeleteTodo from "../../../hooks/useDeleteTodo";
import useProject from "../../../hooks/useProject";
import useProjectTodos from "../../../hooks/useProjectTodos";
import { dateToString, Todo } from "../../../utils/helperFunctions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateTodoStatus } from "../../../utils/todo";

export const Route = createFileRoute(
  "/dashboard/personal_projects/$project_id",
)({
  component: RouteComponent,
  errorComponent: () => <div>Could not Load page content, try again.</div>,
});

function RouteComponent() {
  const { project_id } = Route.useParams();
  const queryClient = useQueryClient();
  const { data: project, isPending, error } = useProject(project_id);
  const {
    data: todos,
    isPending: loadingTodos,
    error: todoError,
  } = useProjectTodos(project_id);
  const deleteMutation = useDeleteTodo(project_id);

  const mutation = useMutation({
    onSuccess: () => {
      toast.success("Todo status updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["todo", project_id] });
    },
    onError: (err: { message: string }) => {
      toast.error(err.message || "An unexpected error occured");
    },
    mutationFn: ({
      id,
      is_finished,
    }: {
      id: string;
      is_finished: "yes" | "no";
    }) => updateTodoStatus(id, is_finished),
  });

  const {
    handleTodoModal,
    handleProjectModal,
    isTodoModalOpen,
    isDeleteTodoModalOpen,
    setIsDeleteTodoModalOpen,
  } = useProjectModalContext();

  const onOpenTodoModal = () => {
    handleTodoModal(true);
    handleProjectModal(false, project_id);
  };

  if (isPending || loadingTodos)
    return <Loading message="loading project data" />;
  if (error) return <Error errorMessage={error.message} />;
  if (todoError) return <Error errorMessage={todoError.message} />;

  return (
    <div className="flex flex-col gap-y-6">
      <GoBack route={"/dashboard/personal_projects"} />
      <div className="flex flex-col gap-y-3">
        <div className="flex flex-row items-center justify-between">
          <span className="text-xl first-letter:capitalize">
            Project name : {project.project_name}
          </span>
          <button className="btn" onClick={onOpenTodoModal}>
            add todo
          </button>

          {isTodoModalOpen ? (
            <Modal handleClose={() => handleTodoModal(false)} title="Add todo">
              <AddTodoForm
                handleModal={handleTodoModal}
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
            <li
              key={todo.id}
              className="border-secondary mx-auto flex w-fit max-w-md flex-col gap-y-2 rounded-md border-2 p-2 shadow-lg"
            >
              <span
                aria-label="todo title "
                className="text-lg first-letter:capitalize sm:text-xl"
              >
                {todo.title}
              </span>
              <span>Completed : {todo.is_finished}</span>
              <span>Date created : {dateToString(todo.created_at)}</span>
              <div className="flex flex-row items-center justify-between gap-2">
                <button
                  className="hover:text-error/60 text-error w-fit cursor-pointer transition-all duration-200 hover:underline"
                  onClick={() => setIsDeleteTodoModalOpen(true)}
                >
                  {deleteMutation.isPending
                    ? "Deleting todo..."
                    : "Delete Todo"}
                </button>
                <button
                  className="hover:text-secondary/60 text-secondary w-fit cursor-pointer transition-all duration-200 hover:underline"
                  onClick={() =>
                    mutation.mutate({
                      id: todo.id,
                      is_finished: todo.is_finished === "yes" ? "no" : "yes",
                    })
                  }
                >
                  {todo.is_finished === "yes"
                    ? "Mark as unfinished"
                    : "Mark as finished"}
                  {/* {mutation.isPending
                    ? "Editing todo..."
                    : todo.is_finished === "yes"
                      ? "Mark todo as unfinished"
                      : "Mark todo as finished"} */}
                </button>
              </div>

              {isDeleteTodoModalOpen ? (
                <Modal
                  title="Are you sure you want to Delete this project??"
                  handleClose={() => setIsDeleteTodoModalOpen(false)}
                >
                  <div className="flex flex-row items-center justify-end gap-x-2">
                    <button
                      aria-label="Yes, i want to delete todo button"
                      className="btn-error"
                      onClick={() =>
                        deleteMutation.mutate({
                          todoId: todo.id,
                        })
                      }
                    >
                      {deleteMutation.isPending ? "Deleting todo..." : "Yes"}
                    </button>
                    <button
                      aria-label="No, i don't want to delete todo button"
                      className="btn"
                      onClick={() => setIsDeleteTodoModalOpen(false)}
                    >
                      No
                    </button>
                  </div>
                </Modal>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
