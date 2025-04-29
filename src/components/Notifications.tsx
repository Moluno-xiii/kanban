import { useModalContext } from "../contexts/ModalContext";
import useGetUserNotifications from "../hooks/useGetUserNotifications";
import useMarkNotificationAsRead from "../hooks/useMarkNotificationAsRead";
import { dateToString, NotificationType } from "../utils/helperFunctions";
import DeleteUserNotificationsModal from "./modals/DeleteUserNotificationsModal";
import EmptyState from "./ui/EmptyState";
import Error from "./ui/Error";

interface Props {
  type: string;
  readStatus: boolean;
}

const Notifications: React.FC<Props> = ({ type, readStatus }) => {
  const updateNotificationMutation = useMarkNotificationAsRead();
  const { activeModal, handleActiveModal } = useModalContext();
  const {
    data: notifications,
    isPending,
    error,
  } = useGetUserNotifications(readStatus);

  if (isPending)
    return (
      <span className="text-center text-xl md:text-2xl">
        Loading {type} notifications...
      </span>
    );

  if (error) return <Error errorMessage={error.message} />;

  if (!notifications || !notifications.length)
    return (
      <EmptyState
        button={false}
        emptyStateText={`You have no ${type} notifications.`}
      />
    );
  return (
    <ul className="flex flex-col gap-y-4">
      {notifications?.length ? (
        <button
          onClick={() =>
            handleActiveModal(
              `delete all ${type as "read" | "unread"} notifications`,
            )
          }
          className="btn-error self-end"
        >
          Delete all {type} notifications
        </button>
      ) : (
        <span>No {type} notifications</span>
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

            {type === "unread" ? (
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
            ) : null}
          </div>
          <span className="first-letter:uppercase">{notification.message}</span>
          <span>Dated {dateToString(notification.created_at)}</span>
          {activeModal === "delete all unread notifications" ? (
            <DeleteUserNotificationsModal
              closeModal={() => handleActiveModal(null)}
              status={false}
              title="Are you sure you want to delete all UNREAD notifications?"
            />
          ) : activeModal === "delete all read notifications" ? (
            <DeleteUserNotificationsModal
              closeModal={() => handleActiveModal(null)}
              status={true}
              title="Are you sure you want to delete all Read notifications?"
            />
          ) : null}
        </li>
      ))}
    </ul>
  );
};

export default Notifications;
