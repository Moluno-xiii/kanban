import useProjectTodos from "../hooks/useProjectTodos";
import { Todo } from "../utils/helperFunctions";
import ProjectTodo from "./ProjectTodo";
import Loading from "./ui/Loading";
import Error from "./ui/Error";
import EmptyState from "./ui/EmptyState";

interface Props {
  project_id: string;
}

const FinishedPersonalProjectTodos: React.FC<Props> = ({ project_id }) => {
  const { data: todos, isPending, error } = useProjectTodos(project_id, "yes");
  console.log(todos);

  if (!todos.length)
    return (
      <EmptyState
        button={false}
        emptyStateText="You have no finished todos, Todos you mark as finished will appear here."
      />
    );

  if (isPending) return <Loading message="loading finished projects" />;
  if (error) return <Error errorMessage={error.message} />;

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {todos?.map((todo: Todo) => (
        <ProjectTodo key={todo.id} project_id={project_id} todo={todo} />
      ))}
    </ul>
  );
};

export default FinishedPersonalProjectTodos;
