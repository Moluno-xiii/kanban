import { useQuery } from "@tanstack/react-query";
import { getTeamMembers } from "../utils/team_members";

const useGetTeamMembers = (team_id: string, organization_id: string) => {
  return useQuery({
    queryKey: ["team-members", team_id],
    queryFn: () => getTeamMembers(team_id, organization_id),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

export default useGetTeamMembers;
