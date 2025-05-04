import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useGetTeam from "../hooks/useGetTeam";
import { RootState } from "../store";
import { TeamTaskSubmission } from "../utils/helperFunctions";
import { getAllTeamTaskSubmissions } from "../utils/team_tasks_submissions";
import Submission from "./Submission";
import EmptyState from "./ui/EmptyState";
import Error from "./ui/Error";
import Loading from "./ui/Loading";
import toast from "react-hot-toast";
import useGetTeamMemberRole from "../hooks/useGetTeamMemberRole";

interface Props {
  team_id: string;
  type: string;
}

const subroutes = ["all", "under review", "accepted", "rejected"];

const TeamSubmissions: React.FC<Props> = ({ team_id, type }) => {
  const {
    data: submissions,
    isPending,
    error,
  } = useQuery({
    queryFn: () =>
      getAllTeamTaskSubmissions(team_id, type as TeamTaskSubmission["status"]),
    queryKey: ["team-submissions", team_id, type],
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    data: team_data,
    isPending: isLoadingTeamData,
    error: teamDataError,
  } = useGetTeam(team_id);
  const {
    data: userRole,
    isPending: isLoadingUserRole,
    error: userRoleError,
  } = useGetTeamMemberRole(team_id);

  useEffect(() => {
    if (!user || !team_data || !userRole) return;
    if (
      user?.id !== team_data?.admin_id &&
      user?.id !== team_data?.super_admin_id &&
      userRole.role !== "admin"
    ) {
      toast.error("You're not authorized to access this page!");
      navigate({ to: "/dashboard/organizations", replace: true });
    }
    console.log(team_data);
  }, [user, isLoadingTeamData, isLoadingUserRole, team_data, userRole]);

  if (isPending)
    return <Loading message={`Loading team's ${type} submissions.`} />;
  if (error) return <Error errorMessage={error.message} />;
  if (teamDataError) return <Error errorMessage={"TEam doesn't exist."} />;
  if (userRoleError) return <Error errorMessage={userRoleError.message} />;

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-row items-center gap-x-4">
        {subroutes.map((route) => (
          <SortingButton
            key={route}
            team_id={team_id}
            urlQuery={type}
            type={route}
            route="/dashboard/organizations/teams/$team_id/submissions/"
          />
        ))}
      </div>
      {!isPending && !error && !submissions.length ? (
        <EmptyState
          button={false}
          emptyStateText={`No ${type} submissions for this team yet, submissions made will appear here. `}
        />
      ) : (
        <section
          className="flex flex-col gap-y-2"
          aria-label={`${type} submission details.`}
        >
          {type === "all" ? (
            <span className="text-secondary text-lg md:text-xl">
              All submissions ({submissions.length})
            </span>
          ) : null}
          <ul className="flex flex-col gap-y-2">
            {submissions.map((submission: TeamTaskSubmission) => (
              <Submission key={submission.id} submission={submission} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default TeamSubmissions;

interface PropTypes {
  team_id: string;
  type: string;
  urlQuery: string;
  route: string;
}

const SortingButton: React.FC<PropTypes> = ({
  team_id,
  type,
  urlQuery,
  route,
}) => {
  const navigate = useNavigate();
  return (
    <button
      aria-label={`show ${type} submissions button.`}
      onClick={() => {
        if (type === "under review") {
          navigate({
            to: route,
            search: () => ({ type: "under_review" }),
            params: { team_id },
          });
        } else {
          navigate({
            to: route,
            search: () => ({ type }),
            params: { team_id },
          });
        }
      }}
      className={`${type === urlQuery ? "text-secondary underline" : type === "under review" && urlQuery === "under_review" ? "text-secondary underline" : "text-text hover:text-secondary transition-all duration-200 hover:underline"} cursor-pointer capitalize sm:text-lg md:text-xl`}
    >
      {type}
    </button>
  );
};
