import { useSuspenseQuery } from "@tanstack/react-query";
import { getUserProject } from "../utils/project";

const useProject = (project_id: string) => {
  return useSuspenseQuery({
    queryKey: ["project", project_id],
    queryFn: () => getUserProject(project_id),
    select: (res) => res.project?.[0],
    staleTime: Infinity,
    refetchOnMount: false,
  });
};

export default useProject;
