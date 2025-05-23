import useDeleteUserNotifications from "../../hooks/useDeleteUserNotifications";
import Modal from "../ui/Modal";

interface PropTypes {
  closeModal: () => void;
  status?: boolean;
  title: string;
}

const DeleteUserNotificationsModal: React.FC<PropTypes> = ({
  closeModal,
  status,
  title,
}) => {
  const deleteNotificationsMutation = useDeleteUserNotifications({
    closeModal,
    status,
  });

  return (
    <Modal title={title} handleClose={() => closeModal()}>
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
