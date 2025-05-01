import { useQuery } from "@tanstack/react-query";
import { TeamTaskSubmission } from "../utils/helperFunctions";
import { getAllUserTeamTaskSubmissions } from "../utils/team_tasks_submissions";

const useGetUserTeamTaskSubmissions = (
  user_email: TeamTaskSubmission["sumitted_by"],
  team_id: TeamTaskSubmission["team_id"],
) => {
  return useQuery({
    queryKey: ["task_submissions"],
    queryFn: () => getAllUserTeamTaskSubmissions(user_email, team_id),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetUserTeamTaskSubmissions;
