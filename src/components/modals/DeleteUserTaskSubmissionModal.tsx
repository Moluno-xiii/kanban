import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { TeamTaskSubmission } from "../../utils/helperFunctions";
import { deleteUserSubmission } from "../../utils/team_tasks_submissions";
import Modal from "../ui/Modal";

interface PropTypes {
  closeModal: () => void;
  submission: TeamTaskSubmission;
}

const DeleteUserTaskSubmissionModal: React.FC<PropTypes> = ({
  closeModal,
  submission,
}) => {
  const queryClient = useQueryClient();
  const deleteSubmissionMutation = useMutation({
    mutationFn: async () => {
      await deleteUserSubmission(
        submission.submitted_by,
        submission.team_id,
        submission.id,
      );
    },
    onSuccess: () => {
      closeModal();
      queryClient.invalidateQueries({
        queryKey: ["task_submissions", submission.task_id],
      });
      queryClient.refetchQueries({
        queryKey: ["task_submissions", submission.task_id],
      });
      toast.success("Submission deleted successfully!");
    },
    onError: (err: { message: string }) => {
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occured, try again.";
      console.error(message);
      toast.error(message);
    },
  });

  return (
    <Modal
      title="Are you sure you want to delete this submission?"
      handleClose={() => closeModal()}
    >
      <div className="flex flex-row items-center justify-end gap-x-2">
        <button
          aria-label="Yes, i want to delete this submission button"
          className="btn-error"
          onClick={() => deleteSubmissionMutation.mutate()}
        >
          {deleteSubmissionMutation.isPending
            ? "Deleting Submissoin..."
            : "Yes"}
        </button>
        <button
          aria-label="No, i don't want to delete this submission button"
          className="btn"
          onClick={() => closeModal()}
        >
          No
        </button>
      </div>
    </Modal>
  );
};

export default DeleteUserTaskSubmissionModal;
