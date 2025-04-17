import useLeaveOrganization from "../../hooks/useLeaveOrganization";
import Modal from "../ui/Modal";

interface PropTypes {
  closeModal: () => void;
  organization_id: string;
  user_id: string;
}

const LeaveOrganizationModal: React.FC<PropTypes> = ({
  closeModal,
  organization_id,
  user_id,
}) => {
  const leaveOrganizationMutation = useLeaveOrganization({
    closeModal,
    organization_id,
    user_id,
  });
  return (
    <Modal
      title="Are you sure you want to Leave this Organization?"
      handleClose={() => closeModal()}
    >
      <div className="flex flex-row items-center justify-end gap-x-2">
        <button
          aria-label="Yes, i want to leave this Organization button"
          className="btn-error"
          onClick={() => leaveOrganizationMutation.mutate()}
        >
          {leaveOrganizationMutation.isPending
            ? "Leaving Organization..."
            : "Yes"}
        </button>
        <button
          aria-label="No, i don't want to leave this Organization button"
          className="btn"
          onClick={() => closeModal()}
        >
          No
        </button>
      </div>
    </Modal>
  );
};

export default LeaveOrganizationModal;
