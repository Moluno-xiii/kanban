import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "../ui/Modal";
import toast from "react-hot-toast";
import { reviewTaskSubmission } from "../../utils/team_tasks_submissions";
import { editTeamTaskStatus } from "../../utils/team_tasks";
import { TeamTaskSubmission } from "../../utils/helperFunctions";
import { getMemberRole } from "../../utils/members";
import { getTeamMemberRole } from "../../utils/team_members";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface Props {
  submission: TeamTaskSubmission;
  type: string | null;
  closeModal: () => void;
}

const ReviewTeamTaskSubmissionModal: React.FC<Props> = ({
  submission,
  type,
  closeModal,
}) => {
  const queryClient = useQueryClient();
  const { user } = useSelector((state: RootState) => state.auth);
  const reviewTaskMutation = useMutation({
    mutationFn: async ({
      review_note,
      reviewed_at,
    }: {
      reviewed_at: string;
      review_note?: string;
    }) => {
      const userOrganizationRole = await getMemberRole(
        user?.id as string,
        submission.organization_id,
      );
      const userTeamRole = await getTeamMemberRole(
        user?.id as string,
        submission.team_id,
      );

      if (
        userOrganizationRole[0].role !== "super admin" &&
        userTeamRole[0].role !== "admin"
      ) {
        throw new Error(
          "You're not authorized to make this action. Only team admins or Organization SUPER ADMINS can review team task submissions!",
        );
      }
      await reviewTaskSubmission(
        submission.id,
        reviewed_at,
        type === "reject" ? "rejected" : "accepted",
        review_note,
      );
      if (type === "accept") {
        await editTeamTaskStatus("finished", submission.task_id, reviewed_at);
      }
    },
    onSuccess: () => {
      toast.success(`Submission ${type}ed successfully!`);
      queryClient.invalidateQueries({
        queryKey: ["team-submissions", submission.team_id],
      });
      queryClient.refetchQueries({
        queryKey: ["team-submissions", submission.team_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["user_tasks", undefined, submission.team_id],
      });
      queryClient.refetchQueries({
        queryKey: ["user_tasks", undefined, submission.team_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["task_submissions", submission.task_id],
      });
      queryClient.refetchQueries({
        queryKey: ["task_submissions", submission.task_id],
      });

      closeModal();
    },
    onError: (err: { message: string }) => {
      const message =
        err instanceof Error ? err.message : "An unexpeced error occured!";
      console.log(submission);
      console.error(err.message);
      toast.error(message);
    },
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const dataObject = Object.fromEntries(formData) as unknown as {
      review_note: string;
      reviewed_at: string;
    };
    reviewTaskMutation.mutate(dataObject);
  };
  const date = new Date();

  return (
    <Modal
      title={`Are you sure you want to ${type} this submission?`}
      handleClose={closeModal}
    >
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-y-2">
        <div className="flex flex-col gap-y-1">
          <label htmlFor="review_note">
            Additional note{" "}
            <span className="text-secondary text-xs md:text-sm">
              {" "}
              (optional)
            </span>
          </label>
          <textarea
            aria-label="additional review note"
            name="review_note"
            id="review_note"
          />

          <input
            type="hidden"
            name="reviewed_at"
            value={date.toLocaleString()}
          />
        </div>
        <div className="flex flex-row items-center justify-center gap-x-5">
          <button onClick={closeModal} className="btn-error">
            No
          </button>
          <button type="submit" className="btn">
            {reviewTaskMutation.isPending ? `${type}ing submission...` : "Yes"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ReviewTeamTaskSubmissionModal;
