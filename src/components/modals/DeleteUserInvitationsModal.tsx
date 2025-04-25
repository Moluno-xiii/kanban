import useDeleteUserInvitations from "../../hooks/useDeleteUserInvitations";
import Modal from "../ui/Modal";

interface PropTypes {
  closeModal: () => void;
  status?: boolean;
  title: string;
}

const DeleteUserInvitationsModal: React.FC<PropTypes> = ({
  closeModal,
  status,
  title,
}) => {
  const deleteInvitationsMutation = useDeleteUserInvitations({
    closeModal,
    status,
  });

  return (
    <Modal title={title} handleClose={() => closeModal()}>
      <div className="flex flex-row items-center justify-end gap-x-2">
        <button
          aria-label="Yes, i want to delete my notifications button"
          className="btn-error"
          onClick={() => deleteInvitationsMutation.mutate()}
        >
          {deleteInvitationsMutation.isPending
            ? "Deleting invitations..."
            : "Yes"}
        </button>
        <button
          aria-label="No, i don't want to delete  my invitations button"
          className="btn"
          onClick={() => closeModal()}
        >
          No
        </button>
      </div>
    </Modal>
  );
};

export default DeleteUserInvitationsModal;
