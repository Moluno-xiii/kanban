import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { getAllUserSubmissions } from "../utils/team_tasks_submissions";

const useGetAllUserSubmissions = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return useQuery({
    queryKey: ["task_submissions"],
    queryFn: () => getAllUserSubmissions(user?.email as string),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetAllUserSubmissions;
