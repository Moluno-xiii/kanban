import { createFileRoute } from "@tanstack/react-router";
import EmptyState from "../../../../components/ui/EmptyState";
import Loading from "../../../../components/ui/Loading";
import UnreadInvitations from "../../../../components/UnreadInvitations";
import useGetUserInvitations from "../../../../hooks/useGetUserInvitations";
import { InvitationNotification } from "../../../../utils/helperFunctions";

export const Route = createFileRoute("/dashboard/organizations/invitations/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: notifications, isPending } = useGetUserInvitations();

  if (isPending) return <Loading message={"Loading user notifications"} />;

  if (!notifications || notifications.length < 1)
    return (
      <EmptyState
        emptyStateText="You don't have any invitations from other organizations, invitations you receive
        will appear here."
        button={false}
      />
    );
  return (
    <div className="flex flex-col gap-y-4">
      <ul className="flex flex-col gap-y-2">
        {notifications.map((notification: InvitationNotification) => (
          <UnreadInvitations
            key={notification.id}
            notification={notification}
          />
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
