import { useQuery } from "@tanstack/react-query";
import { getTeamTasks } from "../utils/team_tasks";

const useGetTeamTasks = (
  team_id: string,
  status?: "unfinished" | "unassigned" | "finished",
) => {
  return useQuery({
    queryKey: ["team_tasks", team_id, status],
    queryFn: async () => await getTeamTasks(team_id, status),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetTeamTasks;
