import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/dashboard/organizations/other_organizations/$organization_id/members/$member_id",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { member_id } = Route.useParams();
  return (
    <div className="flex flex-col gap-y-3">
      Hello
      "/dashboard/organizations/other_organizations/$organization_id/members/$member_id"!
      <span>{member_id}</span>
    </div>
  );
}
