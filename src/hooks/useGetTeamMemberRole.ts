import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { getTeamMemberRole } from "../utils/team_members";

const useGetTeamMemberRole = (team_id: string) => {
  const { user } = useSelector((state: RootState) => state.auth);
  return useQuery({
    queryKey: ["team-member-role", team_id],
    queryFn: () => getTeamMemberRole(user?.id as string, team_id),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    select: (res) => res[0],
  });
};

export default useGetTeamMemberRole;
