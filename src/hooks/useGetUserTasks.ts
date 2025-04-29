import { useQuery } from "@tanstack/react-query";
import { getUserTasks } from "../utils/team_tasks";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const useGetUserTasks = (team_id: string, status?: string) => {
  const { user } = useSelector((state: RootState) => state.auth);
  return useQuery({
    queryKey: ["user_tasks", user?.email as string, team_id, status],
    queryFn: () => getUserTasks(user?.email as string, team_id, status),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetUserTasks;
