import { useModalContext } from "../contexts/ModalContext";
import useMarkNotificationAsRead from "../hooks/useMarkNotificationAsRead";
import { dateToString, NotificationType } from "../utils/helperFunctions";
import DeleteUserNotificationsModal from "./modals/DeleteUserNotificationsModal";
import EmptyState from "./ui/EmptyState";

interface PropTypes {
  notifications: NotificationType[];
}

const UnreadNotifications: React.FC<PropTypes> = ({ notifications }) => {
  const updateNotificationMutation = useMarkNotificationAsRead();
  const { activeModal, handleActiveModal } = useModalContext();

  if (!notifications || !notifications.length)
    return (
      <EmptyState
        button={false}
        emptyStateText="You have no unread notifications."
      />
    );

  return (
    <ul className="flex flex-col gap-y-4">
      {notifications?.length ? (
        <button
          onClick={() => handleActiveModal("delete all unread notifications")}
          className="btn-error self-end"
        >
          Delete all unread notifications
        </button>
      ) : (
        <span>No unread notifications</span>
      )}
      {notifications.map((notification: NotificationType) => (
        <li
          key={notification.id}
          className="border-secondary flex flex-col gap-2 rounded-md border p-2"
        >
          <div className="flex flex-row items-center justify-between">
            <span className="text:lg uppercase md:text-xl">
              {notification.title}
            </span>

            <button
              className="text-secondary w-fit cursor-pointer text-sm transition-all duration-200 first-letter:capitalize hover:underline"
              onClick={() =>
                updateNotificationMutation.mutate({
                  user_id: notification.user_id,
                  notification_id: notification.id,
                })
              }
            >
              mark as read
            </button>
          </div>
          <span className="first-letter:uppercase">{notification.message}</span>
          <span>Dated {dateToString(notification.created_at)}</span>
          {activeModal === "delete all unread notifications" ? (
            <DeleteUserNotificationsModal
              closeModal={() => handleActiveModal(null)}
              status={false}
              title="Are you sure you want to delete all UNREAD notifications?"
            />
          ) : null}
        </li>
      ))}
    </ul>
  );
};

export default UnreadNotifications;
