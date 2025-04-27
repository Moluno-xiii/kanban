import { useSuspenseQuery } from "@tanstack/react-query";
import { getProjectTodos } from "../utils/todo";

const useProjectTodos = (project_id: string, is_finished?: "yes" | "no") => {
  return useSuspenseQuery({
    queryKey: ["todo", project_id, is_finished],
    queryFn: () => getProjectTodos(project_id, is_finished),
    select: (res) => res.todos,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useProjectTodos;
