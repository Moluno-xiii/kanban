import useDeleteUserNotifications from "../../hooks/useDeleteUserNotifications";
import Modal from "../ui/Modal";

interface PropTypes {
  closeModal: () => void;
}

const DeleteUserNotificationsModal: React.FC<PropTypes> = ({ closeModal }) => {
  const deleteNotificationsMutation = useDeleteUserNotifications({
    closeModal,
  });
  return (
    <Modal
      title="Are you sure you want to Delete all your notifications?"
      handleClose={() => closeModal()}
    >
      <div className="flex flex-row items-center justify-end gap-x-2">
        <button
          aria-label="Yes, i want to delete all my notifications button"
          className="btn-error"
          onClick={() => deleteNotificationsMutation.mutate()}
        >
          {deleteNotificationsMutation.isPending
            ? "Deleting Notifications..."
            : "Yes"}
        </button>
        <button
          aria-label="No, i don't want to delete all my notifications button"
          className="btn"
          onClick={() => closeModal()}
        >
          No
        </button>
      </div>
    </Modal>
  );
};

export default DeleteUserNotificationsModal;
