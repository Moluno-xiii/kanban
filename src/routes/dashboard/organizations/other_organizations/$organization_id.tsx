import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/dashboard/organizations/other_organizations/$organization_id",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { organization_id } = Route.useParams();
  return (
    <div>
      Hello "/dashboard/organizations/other_organizations/$organization_id"!{" "}
      {organization_id}
    </div>
  );
}
