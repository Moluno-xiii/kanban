import { useQuery } from "@tanstack/react-query";
import { TeamTaskSubmission } from "../utils/helperFunctions";
import { getTaskSubmissions } from "../utils/team_tasks_submissions";

const useGetTaskSubmissions = (
  task_id: TeamTaskSubmission["task_id"],
  team_id: TeamTaskSubmission["team_id"],
) => {
  return useQuery({
    queryKey: ["task_submissions"],
    queryFn: () => getTaskSubmissions(team_id, task_id),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetTaskSubmissions;
