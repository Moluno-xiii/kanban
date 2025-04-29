import useGetTeamTasks from "../hooks/useGetTeamTasks";
import { Tasks } from "./Tasks";
import Loading from "./ui/Loading";
import Error from "./ui/Error";

interface Props {
  team_id: string;
}

const UnassignedTeamTasks: React.FC<Props> = ({ team_id }) => {
  const {
    data: tasks,
    isPending,
    error,
  } = useGetTeamTasks(team_id, "unassigned");

  if (isPending) return <Loading message="loading unassigned tasks" />;
  if (error) return <Error errorMessage={error.message} />;

  if (!isPending && !tasks.length)
    return (
      <span className="text-cener text-secondary text-lg md:text-xl">
        No unassigned tasks available, all unassigned tasks will appear here.
      </span>
    );
  console.log("unassigned tasks, :", tasks);
  return (
    <div className="flex flex-col gap-y-4">
      <span className="text-secondary">Unassigned Tasks ({tasks.length})</span>
      <Tasks tasks={tasks} team_id={team_id} />;
    </div>
  );
};

export default UnassignedTeamTasks;
