import { useSuspenseQuery } from "@tanstack/react-query";
import { getUserProjects } from "../utils/project";

function useUserProjects(userId: string) {
  return useSuspenseQuery({
    queryKey: ["user-projects", userId],
    queryFn: () => getUserProjects(userId),
    select: (res) => res.projects,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

export default useUserProjects;
