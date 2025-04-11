import { createFileRoute } from "@tanstack/react-router";
import EmptyState from "../../../../components/ui/EmptyState";

export const Route = createFileRoute(
  "/dashboard/organizations/other_organizations/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const secondaryOrganizationsData = [{}];
  if (!secondaryOrganizationsData || secondaryOrganizationsData.length < 1)
    return (
      <EmptyState
        button={false}
        emptyStateText="    You don't belong to any secondary organizations, secondary organizations
        you belong to will appear here."
      />
    );
  return (
    <div className="flex flex-col gap-y-4">
      Hello "/dashboard/organizations/other_organizations/"!
      <span></span>
    </div>
  );
}
