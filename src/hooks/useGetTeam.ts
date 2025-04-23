import { useQuery } from "@tanstack/react-query";
import { getTeam } from "../utils/teams";

const useGetTeam = (team_id: string) => {
  return useQuery({
    queryKey: ["team", team_id],
    queryFn: () => getTeam(team_id),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    select: (res) => res[0],
  });
};

export default useGetTeam;
