import toast from "react-hot-toast";
import useGetUserNotifications from "../hooks/useGetUserNotifications";
import { dateToString, NotificationType } from "../utils/helperFunctions";

const ReadNotifications: React.FC = () => {
  const { data: readNotifications, error } = useGetUserNotifications(true);
  if (error) toast.error(error.message);
  if (!readNotifications || readNotifications.length < 0)
    return <span>No read notifications</span>;

  return (
    <ul className="flex flex-col gap-y-3">
      <span className="text-xl md:text-2xl">Read Notifications</span>
      {readNotifications.map((notification: NotificationType) => (
        <li
          key={notification.id}
          className="border-secondary flex flex-col gap-2 rounded-md border p-2"
        >
          <div className="flex flex-row items-center justify-between">
            <span className="text:lg uppercase md:text-xl">
              {notification.title}
            </span>
          </div>
          <span className="first-letter:uppercase">{notification.message}</span>
          <span>Dated {dateToString(notification.created_at)}</span>
          <span>
            Notification status {notification.has_read ? "read" : "not read"}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default ReadNotifications;
