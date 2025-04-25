import toast from "react-hot-toast";
import useGetUserNotifications from "../hooks/useGetUserNotifications";
import { dateToString, NotificationType } from "../utils/helperFunctions";
import EmptyState from "./ui/EmptyState";
import { useModalContext } from "../contexts/ModalContext";
import DeleteUserNotificationsModal from "./modals/DeleteUserNotificationsModal";

const ReadNotifications: React.FC = () => {
  const { data: readNotifications, error } = useGetUserNotifications(true);
  console.log(readNotifications);
  const { activeModal, handleActiveModal } = useModalContext();
  if (error) toast.error(error.message);
  if (error) return <span>{error.message}</span>;
  if (!readNotifications || !readNotifications.length)
    return (
      <EmptyState
        button={false}
        emptyStateText="You have no read notifications."
      />
    );

  return (
    <ul className="flex flex-col gap-y-3">
      {readNotifications?.length ? (
        <button
          onClick={() => handleActiveModal("delete all read notifications")}
          className="btn-error self-end"
        >
          Delete all read notifications
        </button>
      ) : null}
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
          {activeModal === "delete all read notifications" ? (
            <DeleteUserNotificationsModal
              closeModal={() => handleActiveModal(null)}
              status={true}
              title="Are you sure you want to delete all READ notifications?"
            />
          ) : null}
        </li>
      ))}
    </ul>
  );
};

export default ReadNotifications;
