import { useQuery } from "@tanstack/react-query";
import { getTeamTasks } from "../utils/team_tasks";

const useGetTeamTasks = (team_id: string) => {
  return useQuery({
    queryKey: ["team_tasks", team_id],
    queryFn: async () => await getTeamTasks(team_id),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetTeamTasks;
