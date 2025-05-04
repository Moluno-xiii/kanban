import useProjectTodos from "../hooks/useProjectTodos";
import { Todo } from "../utils/helperFunctions";
import ProjectTodo from "./ProjectTodo";
import Loading from "./ui/Loading";
import Error from "./ui/Error";
import EmptyState from "./ui/EmptyState";

interface Props {
  project_id: string;
  type: string | null;
  todoType: "yes" | "no";
}

const SortedPersonalProjectTodos: React.FC<Props> = ({
  project_id,
  type,
  todoType,
}) => {
  const {
    data: todos,
    isPending,
    error,
  } = useProjectTodos(project_id, todoType);

  if (!todos.length && !isPending && !error)
    return (
      <EmptyState
        button={false}
        emptyStateText={`You have no ${type} todos, Todos you mark as finished will appear here.`}
      />
    );

  if (isPending) return <Loading message={`loading ${type} projects`} />;
  if (error) return <Error errorMessage={error.message} />;

  return (
    <ul className="grid max-w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {todos?.map((todo: Todo) => (
        <ProjectTodo key={todo.id} project_id={project_id} todo={todo} />
      ))}
    </ul>
  );
};

export default SortedPersonalProjectTodos;
