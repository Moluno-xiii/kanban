import useGetTeamTasks from "../hooks/useGetTeamTasks";
import Loading from "./ui/Loading";
import Error from "./ui/Error";
import { Tasks } from "./Tasks";

interface Props {
  team_id: string;
}

const UnfinishedTeamTasks: React.FC<Props> = ({ team_id }) => {
  const {
    data: tasks,
    isPending,
    error,
  } = useGetTeamTasks(team_id, "unfinished");

  if (isPending) return <Loading message="loading unfinished tasks" />;
  if (error) return <Error errorMessage={error.message} />;

  if (!isPending && !tasks.length)
    return (
      <span className="text-secondary text-center text-lg md:text-xl">
        No unassigned tasks available, all unassigned tasks will appear here.
      </span>
    );
  console.log("unfinished tasks, :", tasks);
  return (
    <div className="flex flex-col gap-y-4">
      <span className="text-secondary">Unfinished Tasks ({tasks.length})</span>
      <Tasks tasks={tasks} team_id={team_id} />;
    </div>
  );
};

export default UnfinishedTeamTasks;
