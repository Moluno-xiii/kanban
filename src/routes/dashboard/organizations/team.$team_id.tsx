import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/organizations/team/$team_id")({
  component: RouteComponent,
});
// TEam name, description, datecreated, admin email, team members, team tasks, completed/finished tasks,
function RouteComponent() {
  const { team_id } = Route.useParams();
  return (
    <div className="flex flex-col gap-y-4">
      Hello "/dashboard/organizations/team/$team_id"! {team_id}
      <button className="btn-error self-end">Delete team</button>
    </div>
  );
}
