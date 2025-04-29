import { Link } from "@tanstack/react-router";
import { dateToString, Task } from "../utils/helperFunctions";
import useGetUserTasks from "../hooks/useGetUserTasks";
import Loading from "./ui/Loading";
import Error from "./ui/Error";
import EmptyState from "./ui/EmptyState";

interface Props {
  tasks?: Task[];
  team_id: string;
  type: string;
}

const UserTasks: React.FC<Props> = ({ team_id, type }) => {
  const { data: tasks, isPending, error } = useGetUserTasks(team_id, type);

  if (isPending) return <Loading message={`Loading your tasks...`} />;
  if (error) return <Error errorMessage={error.message} />;

  if (!error && !isPending && !tasks.length)
    return (
      <EmptyState
        button={false}
        emptyStateText={`You have no ${type} tasks, your ${type} tasks will appear here.`}
      />
    );
  return (
    <ul className="flex flex-col gap-4">
      <span className="text-secondary text-xl capitalize md:text-2xl">
        {type} Tasks ({tasks.length})
      </span>
      {tasks.map((task: Task) => (
        <li
          key={task.id}
          className="border-secondary flex flex-col gap-y-1 rounded-md border p-2"
        >
          <span
            aria-label="task title"
            className="text-secondary text-lg capitalize sm:text-xl"
          >
            {task.title}
          </span>
          <span aria-label="assigned by" className="">
            Assigned by : {task.assigned_by}
          </span>
          <span aria-label="task status">Status : {task.status}</span>
          <span aria-label="date created">
            Created at : {dateToString(task.created_at)}
          </span>{" "}
          <span aria-label="task finished date">
            Date finished : {dateToString(task.date_finished)}
          </span>
          <div className="flex flex-row items-center justify-between">
            <Link
              to="/dashboard/organizations/teams/$team_id/tasks/$task_id"
              params={{ team_id, task_id: task.id }}
              className="btn"
              aria-label="view task details"
            >
              View task details
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UserTasks;
