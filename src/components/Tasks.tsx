import { Link } from "@tanstack/react-router";
import useGetTeamMemberRole from "../hooks/useGetTeamMemberRole";
import { dateToString, Task } from "../utils/helperFunctions";
import Loading from "./ui/Loading";
import Error from "./ui/Error";

interface PropTypes {
  team_id: string;
  tasks: Task[];
}

export const Tasks: React.FC<PropTypes> = ({ team_id, tasks }) => {
  const { data: userRole, isPending, error } = useGetTeamMemberRole(team_id);
  if (isPending) return <Loading message="Loading team tasks" />;
  if (error) return <Error errorMessage={error.message} />;
  console.log(userRole);
  return (
    <ul className="flex flex-col gap-2">
      {tasks.map((task: Task) => (
        <li
          key={task.id}
          className="border-secondary flex flex-col gap-y-1 rounded-md border p-2"
        >
          <span className="text-secondary text-lg capitalize sm:text-xl">
            {task.title}
          </span>
          <span className="">Assigned by {task.assigned_by}</span>
          {task.assigned_to ? (
            <span className="">Assigned by {task.assigned_to}</span>
          ) : null}
          <span>Created at : {dateToString(task.created_at)}</span>
          <span>Status : {task.status}</span>
          <div className="flex flex-row items-center justify-between">
            <Link
              to="/dashboard/organizations/teams/$team_id/tasks/$task_id"
              params={{ team_id, task_id: task.id }}
              className="btn"
            >
              View task details
            </Link>
            {userRole.toLowerCase() !== "member" ? (
              <button className="btn-error">Delete task</button>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
};
