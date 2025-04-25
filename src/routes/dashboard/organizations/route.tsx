import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import Loading from "../../../components/ui/Loading";
import Error from "../../../components/ui/Error";
import useGetUserInvitations from "../../../hooks/useGetUserInvitations";
import { InvitationNotification } from "../../../utils/helperFunctions";
export const Route = createFileRoute("/dashboard/organizations")({
  component: RouteComponent,
  pendingComponent: () => Loading({ message: "Loading organizations data" }),
});

function RouteComponent() {
  const status = false;
  const { data: invitations, isPending, error } = useGetUserInvitations(status);
  console.log(invitations);

  if (isPending) return <Loading message="Loading organization members" />;

  if (error) {
    return (
      <Error errorMessage={error.message || "An unexpected error occured."} />
    );
  }

  return (
    <div className="flex h-full w-full flex-col gap-y-4">
      <OrganizationNav invitations={invitations} />
      <Outlet />
    </div>
  );
}

const OrganizationNav = ({
  invitations,
}: {
  invitations: InvitationNotification[];
}) => {
  return (
    <nav className="relative flex flex-row items-center gap-x-3">
      <Link
        className="[&.active]:border-b-secondary [&.active]:text-secondary transition-all duration-300 [&.active]:border-b"
        to="/dashboard/organizations/my_organizations"
        aria-label="Link to my organizations"
        preload="render"
      >
        My organizations
      </Link>
      <Link
        className="[&.active]:border-b-secondary [&.active]:text-secondary transition-all duration-300 [&.active]:border-b"
        to="/dashboard/organizations/other_organizations"
        aria-label="Link to other organizations i belong to"
        preload="intent"
      >
        Other organizations
      </Link>
      <Link
        className="[&.active]:border-b-secondary [&.active]:text-secondary relative transition-all duration-300 [&.active]:border-b"
        to="/dashboard/organizations/invitations"
        search={{ type: "unread" }}
        aria-label="Link to other organizations i belong to"
        preload="intent"
      >
        {invitations.length > 0 && invitations[0].read === false ? (
          <span className="bg-text absolute right-4 size-2 rounded-full"></span>
        ) : null}
        Invitations
      </Link>
    </nav>
  );
};
