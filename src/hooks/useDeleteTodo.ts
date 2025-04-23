import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProjectTodo } from "../utils/todo";
import toast from "react-hot-toast";
import { useModalContext } from "../contexts/ModalContext";

const useDeleteTodo = (projectId: string) => {
  const queryClient = useQueryClient();
  const { handleActiveModal, handleTodoModal } = useModalContext();

  return useMutation({
    mutationFn: ({ todoId }: { todoId: string }) =>
      deleteProjectTodo(todoId, projectId),
    onSuccess: () => {
      handleTodoModal("");
      handleActiveModal(null);
      toast.success("Todo deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["todo", projectId] });
      queryClient.refetchQueries({ queryKey: ["todo", projectId] });
    },
    onError: (err: { message: string }) => {
      toast.error(err.message || "An unexpected error occurred");
    },
  });
};

export default useDeleteTodo;
