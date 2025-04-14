import { createFileRoute, Link } from "@tanstack/react-router";
import { FaArrowRightLong } from "react-icons/fa6";
import EmptyState from "../../../../components/ui/EmptyState";
import Loading from "../../../../components/ui/Loading";
import useGetUserNotifications from "../../../../hooks/useGetUserInvitations";
import { dateToString } from "../../../../utils/helperFunctions";

export const Route = createFileRoute("/dashboard/organizations/invitations/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: notifications, isPending } = useGetUserNotifications();
  if (isPending) return <Loading message={"Loading user notifications"} />;
  console.log(notifications);
  if (!notifications || notifications.length < 1)
    return (
      <EmptyState
        emptyStateText="You don't have any invitations organizations, invitations you receive
        will appear here."
        button={false}
      />
    );
  return (
    <div className="flex flex-col gap-y-4">
      <ul className="flex flex-col gap-y-2">
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className="border-secondary flex flex-col gap-2 rounded-md border p-2"
          >
            <div className="flex flex-row items-center justify-between">
              <span className="text-lg first-letter:uppercase md:text-xl">
                {notification.message}
              </span>
              <button className="text-secondary w-fit cursor-pointer text-sm transition-all duration-200 first-letter:capitalize hover:underline">
                mark as read
              </button>
            </div>
            <span>Invitation role : {notification.role}</span>
            <span>{dateToString(notification.created_at)}</span>
            <span>Invite status : {notification.invitation_status}</span>
            {/*  I could fetch all the notifications pertaining to invites using the 'type' property type = 'invitation'. */}
            <Link
              to="/dashboard/organizations/invitations/$invitation_id"
              params={{ invitation_id: notification.id }}
              className="text-secondary hover:text-secondary/80 flex flex-row items-center justify-end gap-x-2 transition-all duration-200 hover:underline"
            >
              View invitation
              <FaArrowRightLong size={15} />
            </Link>
          </li>
        ))}
      </ul>

      {/* <ul className="mt-6 flex flex-col gap-y-2">
        <span className="text-xl md:text-2xl">Read notifications</span>
        {readMessages.map((notification) => (
          <li
            key={notification.id}
            className="border-secondary flex flex-row items-center justify-between rounded-md border p-2"
          >
            <span className="first-letter:uppercase">
              {notification.message}
            </span>
          </li>
        ))}
      </ul> */}
    </div>
  );
}
