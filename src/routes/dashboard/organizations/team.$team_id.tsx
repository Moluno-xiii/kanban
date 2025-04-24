import { createFileRoute } from "@tanstack/react-router";
import Error from "../../../components/ui/Error";
import Loading from "../../../components/ui/Loading";
import ReturnBack from "../../../components/ui/ReturnBack";
import useGetTeam from "../../../hooks/useGetTeam";
import { dateToString } from "../../../utils/helperFunctions";
import { lazy, Suspense } from "react";
const TeamMembers = lazy(() => import("../../../components/TeamMembers.tsx"));

export const Route = createFileRoute("/dashboard/organizations/team/$team_id")({
  component: RouteComponent,
});

// TEam name, description, datecreated, admin email, team members, team tasks, completed/finished tasks,
// if user is not a member of the team, redirect the user. fetch team data, if user id isn't super admin or admin, redirect.
function RouteComponent() {
  const { team_id } = Route.useParams();
  const { data: team, isPending, error } = useGetTeam(team_id);
  console.log(team);
  if (isPending) return <Loading message="Loading team data" />;

  if (error) {
    return <Error errorMessage={"Team doesn't exist."} />;
  }

  return (
    <div className="flex flex-col gap-y-4">
      <ReturnBack />
      <p className="text-secondary text-lg uppercase sm:text-xl">{team.name}</p>
      <div className="flex flex-col gap-y-2">
        <span>Description : {team.description}</span>
        <span>Created at : {dateToString(team.created_at)}</span>
      </div>
      <Suspense fallback={<span>Loading team members...</span>}>
        <TeamMembers team={team} />
        <div>
          {/* Div for team tasks, inside here, there should be a link to the
          team/tasks route, and inside there, there should be 2 routes, finished
          and unfinished tasks. */}
        </div>
      </Suspense>
      <button
        className="bg-error text-text self-end rounded-md p-2 disabled:cursor-not-allowed"
        disabled
      >
        Delete team
      </button>
    </div>
  );
}
