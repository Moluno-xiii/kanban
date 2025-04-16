import { createFileRoute } from "@tanstack/react-router";
import Loading from "../../../components/ui/Loading";
import EmptyState from "../../../components/ui/EmptyState";
import { dateToString } from "../../../utils/helperFunctions";
import useGetUserNotifications from "../../../hooks/useGetUserNotifications";

export const Route = createFileRoute("/dashboard/notifications/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: notifications, isPending } = useGetUserNotifications();
  if (isPending) return <Loading message={"Loading user notifications"} />;
  console.log(notifications);
  if (!notifications || notifications.length < 1)
    return (
      <EmptyState button={false} emptyStateText="You have no notifications." />
    );

  return (
    <div className="flex flex-col gap-y-4">
      <ul className="flex flex-col gap-y-2">
        <span className="text-xl md:text-2xl">Notifications</span>
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className="border-secondary flex flex-col gap-2 rounded-md border p-2"
          >
            <div className="flex flex-row items-center justify-between">
              <span className="first-letter:uppercase">
                {notification.message}
              </span>
              <button className="text-secondary w-fit cursor-pointer text-sm transition-all duration-200 first-letter:capitalize hover:underline">
                mark as read
              </button>
            </div>
            <span>Invitation role : {notification.role}</span>
            <span>{dateToString(notification.created_at)}</span>
            <span>Invite status : {notification.invitation_status}</span>
          </li>
        ))}
      </ul>

      <ul className="mt-6 flex flex-col gap-y-2">
        <span className="text-xl md:text-2xl">Read notifications</span>
        {/* {readMessages.map((notification) => (
          <li
            key={notification.id}
            className="border-secondary flex flex-row items-center justify-between rounded-md border p-2"
          >
            <span className="first-letter:uppercase">
              {notification.message}
            </span>
          </li>
        ))} */}
      </ul>
    </div>
  );
}
