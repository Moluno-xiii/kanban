import useMarkNotificationAsRead from "../hooks/useMarkNotificationAsRead";
import { NotificationType, dateToString } from "../utils/helperFunctions";

const Notification = ({ notification }: { notification: NotificationType }) => {
  const updateNotificationMutation = useMarkNotificationAsRead();

  return (
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
      <span>
        Notification status : {notification.has_read ? "read" : "not read"}
      </span>
    </li>
  );
};

export default Notification;
