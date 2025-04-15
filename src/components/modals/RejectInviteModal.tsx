import { useProjectModalContext } from "../../contexts/ProjectModalContext";
import useDeleteTodo from "../../hooks/useDeleteTodo";
import Modal from "../ui/Modal";

interface RejectInviteTypes {
  todoId: string;
  projectId: string;
}

const RejectInvite: React.FC<RejectInviteTypes> = ({ todoId, projectId }) => {
  const { setIsDeleteTodoModalOpen } = useProjectModalContext();
  const deleteTodoMutation = useDeleteTodo(projectId);
  return (
    <Modal
      title="Are you sure you want to Delete this Todo??"
      handleClose={() => setIsDeleteTodoModalOpen(false)}
    >
      <div className="flex flex-row items-center justify-end gap-x-2">
        <button
          aria-label="Yes, i want to delete todo button"
          className="btn-error"
          onClick={() =>
            deleteTodoMutation.mutate({
              todoId,
            })
          }
        >
          {deleteTodoMutation.isPending ? "Deleting todo..." : "Yes"}
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
  );
};

export default RejectInvite;
