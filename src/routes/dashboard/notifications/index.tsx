import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import EmptyState from "../../../components/ui/EmptyState";
import Loading from "../../../components/ui/Loading";
import useGetUserNotifications from "../../../hooks/useGetUserNotifications";
import { dateToString, NotificationType } from "../../../utils/helperFunctions";
import DeleteUserNotificationsModal from "../../../components/modals/DeleteUserNotificationsModal";

export const Route = createFileRoute("/dashboard/notifications/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: notifications, isPending } = useGetUserNotifications();
  const [isDeleteNotificationModalOpen, setIsDeleteNotificationModalOpen] =
    useState(false);
  if (isPending) return <Loading message={"Loading user notifications"} />;
  console.log(notifications);
  if (!notifications || notifications.length < 1)
    return (
      <EmptyState button={false} emptyStateText="You have no notifications." />
    );

  return (
    <div className="flex flex-col gap-y-4">
      <ul className="flex flex-col gap-y-3">
        <div className="flex flex-row items-center justify-between">
          <span className="text-xl md:text-2xl">Notifications</span>
          <button
            onClick={() => setIsDeleteNotificationModalOpen(true)}
            className="btn-error"
          >
            Delete all notifications
          </button>
          {isDeleteNotificationModalOpen ? (
            <DeleteUserNotificationsModal
              closeModal={() => setIsDeleteNotificationModalOpen(false)}
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

              <button className="text-secondary w-fit cursor-pointer text-sm transition-all duration-200 first-letter:capitalize hover:underline">
                mark as read
              </button>
            </div>
            <span className="first-letter:uppercase">
              {notification.message}
            </span>
            <span>Dated {dateToString(notification.created_at)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
