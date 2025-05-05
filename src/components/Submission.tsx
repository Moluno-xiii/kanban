import { useSelector } from "react-redux";
import { useModalContext } from "../contexts/ModalContext";
import { TeamTaskSubmission, dateToString } from "../utils/helperFunctions";
import DeleteUserTaskSubmissionModal from "./modals/DeleteUserTaskSubmissionModal";
import { RootState } from "../store";
import { useState } from "react";
import ReviewTeamTaskSubmissionModal from "./modals/ReviewTeamTaskSubmissionModal";
import useGetTeamMemberRole from "../hooks/useGetTeamMemberRole";
import Loading from "./ui/Loading";

interface SubmissionType {
  submission: TeamTaskSubmission;
}

const Submission: React.FC<SubmissionType> = ({ submission }) => {
  const {
    activeModal,
    activeUserSubmission,
    handleActiveModal,
    handleActiveUserSubmission,
  } = useModalContext();
  const { user } = useSelector((state: RootState) => state.auth);
  const [reviewStatus, setReviewStatus] = useState<string | null>("");
  const handleClose = () => {
    handleActiveModal(null);
    handleActiveUserSubmission(null);
  };
  const {
    data: userRole,
    isPending,
    // error : userRoleError,
  } = useGetTeamMemberRole(submission.team_id);

  if (isPending) return <Loading message={"loading submission"} />;

  return (
    <li className="border-secondary flex flex-col gap-y-2 rounded-md border p-2">
      <em className="text-secondary text-lg capitalize md:text-xl">
        {submission.status}
      </em>
      <span>Submitted at : {dateToString(submission.created_at)}</span>
      <span>
        Additional submission Note :{" "}
        {submission.additional_submission_note
          ? submission.additional_submission_note
          : "NONE"}
      </span>
      {submission.status === "accepted" || submission.status === "rejected" ? (
        <div className="flex flex-col gap-y-2">
          <span>
            Additional review Note :{" "}
            {submission.additional_review_note
              ? submission.additional_review_note
              : "NONE"}
          </span>
          <span>
            Review date :{" "}
            {submission.reviewed_at
              ? submission.reviewed_at.split("T").join(" ")
              : "NONE"}
          </span>
        </div>
      ) : null}
      {user?.email === submission.submitted_by &&
      submission.status === "under review" ? (
        <button
          aria-label="delete submission button"
          className="btn-error self-end"
          onClick={() => {
            handleActiveModal("delete user submission");
            handleActiveUserSubmission(submission.id);
          }}
        >
          Delete submission
        </button>
      ) : null}
      {(user?.id === submission.admin_id ||
        user?.id === submission.super_admin_id ||
        userRole?.role === "admin") &&
      submission.status === "under review" ? (
        <div className="flex flex-row items-center justify-between">
          <button
            className="btn-error"
            onClick={() => {
              handleActiveModal("review user submission");
              handleActiveUserSubmission(submission.id);
              setReviewStatus("reject");
            }}
          >
            Reject submission
          </button>
          <button
            className="btn"
            onClick={() => {
              handleActiveModal("review user submission");
              handleActiveUserSubmission(submission.id);
              setReviewStatus("accept");
            }}
          >
            Accept submission
          </button>
        </div>
      ) : null}
      {activeModal === "delete user submission" &&
      activeUserSubmission === submission.id ? (
        <DeleteUserTaskSubmissionModal
          submission={submission}
          closeModal={handleClose}
        />
      ) : null}
      {activeModal === "review user submission" &&
      activeUserSubmission === submission.id ? (
        <ReviewTeamTaskSubmissionModal
          submission={submission}
          type={reviewStatus}
          closeModal={handleClose}
        />
      ) : null}
    </li>
  );
};

export default Submission;
