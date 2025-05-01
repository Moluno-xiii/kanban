import { useQuery } from "@tanstack/react-query";
import { getUserProjects } from "../utils/project";

function useUserProjects(userId: string) {
  return useQuery({
    queryKey: ["user-projects", userId],
    queryFn: () => getUserProjects(userId),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

export default useUserProjects;
