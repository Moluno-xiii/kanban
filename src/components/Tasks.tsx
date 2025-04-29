import { Link } from "@tanstack/react-router";
import useGetTeamMemberRole from "../hooks/useGetTeamMemberRole";
import { dateToString, Task } from "../utils/helperFunctions";
import Loading from "./ui/Loading";
import Error from "./ui/Error";
import { useModalContext } from "../contexts/ModalContext";
import DeleteTeamTaskModal from "./modals/DeleteTeamTaskModal";

interface PropTypes {
  team_id: string;
  tasks: Task[];
}

export const Tasks: React.FC<PropTypes> = ({ team_id, tasks }) => {
  const { data: userRole, isPending, error } = useGetTeamMemberRole(team_id);
  const {
    activeModal,
    activeTeamTask,
    handleActiveModal,
    handleActiveTeamTask,
  } = useModalContext();
  if (isPending) return <Loading message="Loading team tasks" />;
  if (error) return <Error errorMessage={error.message} />;
  return (
    <ul className="flex flex-col gap-4">
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
          {task.assigned_to ? (
            <span aria-label="assigned to" className="">
              Assigned to : {task.assigned_to}
            </span>
          ) : (
            <span aria-label="task status">Status : {task.status}</span>
          )}
          <span aria-label="date created">
            Created at : {dateToString(task.created_at)}
          </span>{" "}
          <span aria-label="task status">Status : {task.status}</span>
          <div className="flex flex-row items-center justify-between">
            <Link
              to="/dashboard/organizations/teams/$team_id/tasks/$task_id"
              params={{ team_id, task_id: task.id }}
              className="btn"
              aria-label="view task details"
            >
              View task details
            </Link>
            {userRole?.role.toLowerCase() !== "member" ? (
              <button
                aria-label="delete task button"
                onClick={() => {
                  handleActiveTeamTask(task.id);
                  handleActiveModal("delete team task");
                }}
                className="btn-error"
              >
                Delete task
              </button>
            ) : null}
          </div>
          {activeModal === "delete team task" && activeTeamTask === task.id ? (
            <DeleteTeamTaskModal
              handleClose={() => handleActiveModal(null)}
              task_id={task.id}
              team_id={team_id}
            />
          ) : null}
        </li>
      ))}
    </ul>
  );
};
