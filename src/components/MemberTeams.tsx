import { useQuery } from "@tanstack/react-query";
import useAuthGuard from "../hooks/useAuthGuard";
import { getMemberTeams } from "../utils/team_members";
import Loading from "./ui/Loading";
import Error from "./ui/Error";
import { Link } from "@tanstack/react-router";
import { FaArrowRight } from "react-icons/fa6";

interface Props {
  organization_id: string;
}

const MemberTeams: React.FC<Props> = ({ organization_id }) => {
  const { user } = useAuthGuard();
  const {
    data: teams,
    isPending,
    error,
  } = useQuery({
    queryKey: ["member-teams", organization_id, user?.id as string],
    queryFn: async () =>
      await getMemberTeams(organization_id, user?.id as string),
    // staleTime: 0,
    // refetchOnMount: true,
    // refetchOnWindowFocus: true,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  if (isPending) return <Loading message="Loading teams" />;

  if (error) {
    return (
      <Error errorMessage={error.message || "An unexpected error occured."} />
    );
  }

  console.log(teams);
  return (
    <div className="flex flex-col gap-y-2 rounded-md p-3">
      <p className="text-secondary text-lg sm:text-xl">
        Teams ({teams.length})
      </p>
      {teams.length < 1 ? (
        <span className="text-center text-xl sm:text-2xl">
          You don't belong to any secondary teams, secondary teams you belong to
          will appear here.
        </span>
      ) : (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {teams.map((team) => (
            <li
              key={team.primary_key}
              className="border-secondary rounded-md border p-2"
            >
              <div className="flex flex-row items-center justify-between">
                <span className="text-lg first-letter:capitalize sm:text-xl">
                  {team.team_name}
                </span>
                <Link
                  to="/dashboard/organizations/team/$team_id"
                  params={{ team_id: team.team_id }}
                  className="text-secondary flex flex-row items-center gap-x-2 transition-all duration-200 hover:underline"
                >
                  <span>View team</span>
                  <FaArrowRight />
                </Link>
              </div>
              <span>Role : {team.role}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MemberTeams;
