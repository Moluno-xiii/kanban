import { useQuery } from "@tanstack/react-query";
import useAuthGuard from "../hooks/useAuthGuard";
import { getMemberTeams } from "../utils/team_members";
import Loading from "./ui/Loading";
import Error from "./ui/Error";

interface Props {
  organization_id: string;
}

const MemberTeams: React.FC<Props> = ({ organization_id }) => {
  console.log(organization_id);
  const { user } = useAuthGuard();
  const {
    data: teams,
    isPending,
    error,
  } = useQuery({
    queryKey: ["member-teams", organization_id, user?.id as string],
    queryFn: async () =>
      await getMemberTeams(organization_id, user?.id as string),
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
          You don't belong to any teams, teams you belong to will appear here.
        </span>
      ) : (
        <span>You belong to teams.</span>
      )}
    </div>
  );
};

export default MemberTeams;
