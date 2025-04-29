import useGetTeamTasks from "../hooks/useGetTeamTasks";
import { Tasks } from "./Tasks";
import Loading from "./ui/Loading";
import Error from "./ui/Error";

interface Props {
  team_id: string;
}

const FinishedTeamTasks: React.FC<Props> = ({ team_id }) => {
  const {
    data: tasks,
    isPending,
    error,
  } = useGetTeamTasks(team_id, "finished");

  if (isPending) return <Loading message="loading finished tasks" />;
  if (error) return <Error errorMessage={error.message} />;

  if (!isPending && !tasks.length)
    return (
      <span className="text-cener text-secondary text-lg md:text-xl">
        No finished tasks available, all finished tasks will appear here.
      </span>
    );
  return (
    <div className="flex flex-col gap-y-4">
      <span className="text-secondary">Finished Tasks ({tasks.length})</span>
      <Tasks tasks={tasks} team_id={team_id} />;
    </div>
  );
};

export default FinishedTeamTasks;
