import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "../ui/Modal";
import { deleteTeamTask } from "../../utils/team_tasks";
import toast from "react-hot-toast";

interface Props {
  task_id: string;
  team_id: string;
  handleClose: () => void;
}

const DeleteTeamTaskModal: React.FC<Props> = ({
  task_id,
  team_id,
  handleClose,
}) => {
  const queryClient = useQueryClient();
  const deleteTaskMutation = useMutation({
    mutationFn: () => deleteTeamTask(task_id, team_id),
    onSuccess: () => {
      toast.success("Task deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["team_tasks", team_id],
      });
      queryClient.refetchQueries({
        queryKey: ["team_tasks", team_id],
      });
      handleClose();
    },
    onError: (err: { message: string }) => {
      const message =
        err instanceof Error ? err.message : "An unexpected error occured.";
      console.error(message);
      toast.error(message);
    },
  });

  return (
    <Modal
      handleClose={handleClose}
      title="Are you sure you want to delete this task?"
    >
      <div className="flex flex-row items-center gap-5">
        <button
          aria-label="no, i don't want to delete this task button"
          className="btn-error"
          onClick={handleClose}
        >
          No
        </button>
        <button
          aria-label="Yes, i want to delete this task button"
          className="btn"
          onClick={() => deleteTaskMutation.mutate()}
        >
          {deleteTaskMutation.isPending ? "Deleting task..." : "Yes"}
        </button>
      </div>
    </Modal>
  );
};

export default DeleteTeamTaskModal;
