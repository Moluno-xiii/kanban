import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Task, TeamTaskSubmission } from "../../utils/helperFunctions";
import { submitTask } from "../../utils/team_tasks_submissions";
import Modal from "../ui/Modal";
import { useModalContext } from "../../contexts/ModalContext";
import toast from "react-hot-toast";

interface Props {
  task: Task;
}

const SubmitTeamTaskModal: React.FC<Props> = ({ task }) => {
  const queryClient = useQueryClient();
  const { handleActiveModal, handleActiveTeamTask } = useModalContext();

  const handleClose = () => {
    handleActiveModal(null);
    handleActiveTeamTask(null);
  };

  const submitTaskMutation = useMutation({
    mutationFn: (
      submission_note: TeamTaskSubmission["additional_submission_note"],
    ) =>
      submitTask(
        task.team_id,
        task.assigned_to,
        task.id,
        task.super_admin_id,
        task.admin_id,
        submission_note,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["task_submissions", task.id],
      });
      queryClient.refetchQueries({
        queryKey: ["task_submissions", task.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["team-submissions", task.team_id],
      });
      queryClient.refetchQueries({
        queryKey: ["team-submissions", task.team_id],
      });

      handleClose();
      toast.success("Task submitted successfully!");
    },
    onError: (err: { message: string }) => {
      console.error(err.message);
      throw new Error(err.message);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const dataObject = Object.fromEntries(formData) as unknown as {
      submission_note: string;
    };
    console.log(dataObject);
    submitTaskMutation.mutate(dataObject.submission_note);
  };

  return (
    <Modal title={`Submit "${task.title}" Task`} handleClose={handleClose}>
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
          <label className="text-lg sm:text-xl" htmlFor="submission_note">
            Additional submission note{" "}
            <span className="text-primary text-xs sm:text-sm">(Optional)</span>
          </label>
          <textarea id="submission_note" name="submission_note" />
        </div>
        <div className="flex flex-row items-center justify-between">
          <button onClick={handleClose} className="btn-error">
            Close
          </button>
          <button className="btn self-end" type="submit">
            {submitTaskMutation.isPending ? "Submitting task..." : "  Submit"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SubmitTeamTaskModal;
