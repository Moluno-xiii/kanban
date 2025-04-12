import { useSuspenseQuery } from "@tanstack/react-query";
import { getProjectTodos } from "../utils/todo";

const useProjectTodos = (project_id: string) => {
  return useSuspenseQuery({
    queryKey: ["todo", project_id],
    queryFn: () => getProjectTodos(project_id),
    select: (res) => res.todos,
    staleTime: Infinity,
    refetchOnMount: false,
  });
};

export default useProjectTodos;
