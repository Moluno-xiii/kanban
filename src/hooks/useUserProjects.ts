import { useQuery } from "@tanstack/react-query";
import { getUserProjects } from "../utils/project";

function useUserProjects(userId: string) {
  return useQuery({
    queryKey: ["user-projects", userId],
    queryFn: () => getUserProjects(userId),
    enabled: !!userId,
    select: (res) => res.projects,
    staleTime: Infinity,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}

export default useUserProjects;
