import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import Loading from "../../../components/ui/Loading";
export const Route = createFileRoute("/dashboard/organizations")({
  component: RouteComponent,
  pendingComponent: () => Loading({ message: "Loading organizations data" }),
});

function RouteComponent() {
  return (
    <div className="flex h-full w-full flex-col gap-y-4">
      <OrganizationNav />
      <Outlet />
    </div>
  );
}

const OrganizationNav = () => {
  return (
    <nav className="flex flex-row items-center gap-x-3">
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
        className="[&.active]:border-b-secondary [&.active]:text-secondary transition-all duration-300 [&.active]:border-b"
        to="/dashboard/organizations/invitations"
        aria-label="Link to other organizations i belong to"
        preload="intent"
      >
        Invitations
      </Link>
    </nav>
  );
};
