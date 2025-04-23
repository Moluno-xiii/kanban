import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import DeleteUserNotificationsModal from "../../../components/modals/DeleteUserNotificationsModal";
import EmptyState from "../../../components/ui/EmptyState";
import Loading from "../../../components/ui/Loading";
import { useModalContext } from "../../../contexts/ModalContext.tsx";
import useGetUserNotifications from "../../../hooks/useGetUserNotifications";
import useMarkNotificationAsRead from "../../../hooks/useMarkNotificationAsRead.ts";
import { dateToString, NotificationType } from "../../../utils/helperFunctions";

const ReadNotifications = lazy(
  () => import("../../../components/ReadNotifications.tsx"),
);

export const Route = createFileRoute("/dashboard/notifications/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: notifications, isPending } = useGetUserNotifications(false);
  const { activeModal, handleActiveModal } = useModalContext();
  const updateNotificationMutation = useMarkNotificationAsRead();
  if (isPending) return <Loading message={"Loading user notifications"} />;
  console.log(notifications);
  if (!notifications)
    return (
      <EmptyState button={false} emptyStateText="You have no notifications." />
    );

  return (
    <div className="flex flex-col gap-y-6">
      <ul className="flex flex-col gap-y-3">
        <div className="flex flex-row items-center justify-between">
          <span className="text-secondary text-xl md:text-2xl">
            {notifications.length ? "Unread notifications" : "Notifications"}
          </span>
          {notifications.length ? (
            <button
              onClick={() => handleActiveModal("delete all notifications")}
              className="btn-error"
            >
              Delete all notifications
            </button>
          ) : (
            <span>No unread notifications</span>
          )}
          {activeModal === "delete all notifications" ? (
            <DeleteUserNotificationsModal
              closeModal={() => handleActiveModal(null)}
            />
          ) : null}
        </div>
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
            <span className="first-letter:uppercase">
              {notification.message}
            </span>
            <span>Dated {dateToString(notification.created_at)}</span>
            <span>
              Notification status :{" "}
              {notification.has_read ? "read" : "not read"}
            </span>
          </li>
        ))}
      </ul>

      <div>
        <Suspense fallback={<span>Loading read notifications...</span>}>
          <ReadNotifications />
        </Suspense>
      </div>
    </div>
  );
}
