import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Error from "../../../../../components/ui/Error";
import Loading from "../../../../../components/ui/Loading";
import ReturnBack from "../../../../../components/ui/ReturnBack";
import useGetTeam from "../../../../../hooks/useGetTeam";
import { dateToString } from "../../../../../utils/helperFunctions";
import { lazy, Suspense, useEffect } from "react";
import useGetTeamMemberRole from "../../../../../hooks/useGetTeamMemberRole.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/index.ts";
import toast from "react-hot-toast";
const TeamMembers = lazy(
  () => import("../../../../../components/TeamMembers.tsx"),
);
const TeamTasks = lazy(() => import("../../../../../components/TeamTasks.tsx"));

export const Route = createFileRoute(
  "/dashboard/organizations/teams/$team_id/",
)({
  component: RouteComponent,
});

// TEam name, description, datecreated, admin email, team members, team tasks, completed/finished tasks,
// if user is not a member of the team, redirect the user. fetch team data, if user id isn't super admin or admin, redirect.
function RouteComponent() {
  const { team_id } = Route.useParams();
  const { data: team, isPending, error } = useGetTeam(team_id);
  const { data: userRole, isPending: isLoadingUserRole } = useGetTeamMemberRole(
    team?.id,
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  console.log("user role i need", userRole);

  useEffect(() => {
    if (!team || !user || isPending || isLoadingUserRole) return;

    if (
      user.id !== team.super_admin_id &&
      userRole.toLowerCase() !== "member" &&
      userRole.toLowerCase() !== "admin"
    ) {
      toast.error("You're not a member of this team.");
      navigate({ to: "/dashboard/organizations", replace: true });
    }
  }, [team, user, isPending, isLoadingUserRole, userRole]);

  if (isPending) return <Loading message="Loading team data for this team" />;

  if (error) {
    return <Error errorMessage={"Team doesn't exist."} />;
  }

  return (
    <div className="flex flex-col gap-y-4 md:gap-y-6">
      <ReturnBack />
      <div className="flex flex-col gap-y-2">
        <p className="text-secondary text-lg uppercase sm:text-xl">
          {team.name}
        </p>
        <span>Description : {team.description}</span>
        <span>Created at : {dateToString(team.created_at)}</span>
      </div>
      <Suspense fallback={<span>Loading team members...</span>}>
        <TeamMembers team={team} />
      </Suspense>
      <Suspense fallback={<span>Loading team tasks...</span>}>
        <TeamTasks
          admin_id={team.admin_id}
          super_admin_id={team.super_admin_id}
          team_id={team.id}
        />
      </Suspense>
      {userRole !== "member" ? (
        <button
          className="bg-error text-text self-end rounded-md p-2 disabled:cursor-not-allowed"
          disabled
        >
          Delete team
        </button>
      ) : null}
    </div>
  );
}
