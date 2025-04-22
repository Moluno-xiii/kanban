import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useProjectModalContext } from "../contexts/ProjectModalContext";
import useDeleteTodo from "../hooks/useDeleteTodo";
import { dateToString, Todo } from "../utils/helperFunctions";
import { updateTodoStatus } from "../utils/todo";
import DeleteTodoModal from "./modals/DeleteTodoModal";

interface Props {
  project_id: string;
  todo: Todo;
}

const ProjectTodo: React.FC<Props> = ({ project_id, todo }) => {
  const queryClient = useQueryClient();
  const deleteTodoMutation = useDeleteTodo(project_id);
  const { isDeleteTodoModalOpen, setIsDeleteTodoModalOpen } =
    useProjectModalContext();

  const updateTodoStatusMutation = useMutation({
    onSuccess: () => {
      toast.success("Todo status updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["todo", project_id] });
      queryClient.refetchQueries({ queryKey: ["todo", project_id] });
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
  return (
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
          {deleteTodoMutation.isPending ? "Deleting todo..." : "Delete Todo"}
        </button>
        <button
          className="hover:text-secondary/60 text-secondary w-fit cursor-pointer transition-all duration-200 hover:underline"
          onClick={() =>
            updateTodoStatusMutation.mutate({
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
        <DeleteTodoModal projectId={project_id} todoId={todo.id} />
      ) : null}
    </li>
  );
};

export default ProjectTodo;
