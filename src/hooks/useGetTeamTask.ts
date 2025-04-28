import { useQuery } from "@tanstack/react-query";
import { getTeamTask } from "../utils/team_tasks";

const useGetTeamTask = (task_id: string, team_id: string) => {
  return useQuery({
    queryKey: ["team_task", task_id, team_id],
    queryFn: async () => await getTeamTask(task_id, team_id),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    select: (res) => res[0],
  });
};

export default useGetTeamTask;
