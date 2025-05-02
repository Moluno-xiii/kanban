import { useQuery } from "@tanstack/react-query";
import { TeamTaskSubmission } from "../utils/helperFunctions";
import { getAllTeamTaskSubmissions } from "../utils/team_tasks_submissions";

const useGetAllTeamTaskSubmissions = (
  team_id: TeamTaskSubmission["team_id"],
  status: TeamTaskSubmission["status"] | "under_review" | "all",
) => {
  return useQuery({
    queryKey: ["task_submissions"],
    queryFn: () => getAllTeamTaskSubmissions(team_id, status),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetAllTeamTaskSubmissions;
