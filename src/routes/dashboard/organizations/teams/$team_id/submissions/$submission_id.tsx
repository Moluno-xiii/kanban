import { createFileRoute } from "@tanstack/react-router";
import ReturnBack from "../../../../../../components/ui/ReturnBack";

export const Route = createFileRoute(
  "/dashboard/organizations/teams/$team_id/submissions/$submission_id",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { team_id, submission_id } = Route.useParams();
  return (
    <div className="flex flex-col gap-y-4">
      <ReturnBack />
      Hello
      "/dashboard/organizations/teams/$team_id/submissions/$submission_id"!
      <span>TEam id : {team_id}</span>
      <span>submission id : {submission_id}</span>
    </div>
  );
}
