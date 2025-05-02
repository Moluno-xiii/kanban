import { Link } from "@tanstack/react-router";
import useGetTeamMemberRole from "../hooks/useGetTeamMemberRole";
import { dateToString, Task, TaskTypes } from "../utils/helperFunctions";
import Loading from "./ui/Loading";
import Error from "./ui/Error";
import { useModalContext } from "../contexts/ModalContext";
import DeleteTeamTaskModal from "./modals/DeleteTeamTaskModal";
import useGetTeamTasks from "../hooks/useGetTeamTasks";

interface PropTypes {
  team_id: string;
  secondaryTasks?: Task[];
  type?: string;
  taskType?: TaskTypes;
}

const Tasks: React.FC<PropTypes> = ({
  team_id,
  type,
  taskType,
  secondaryTasks,
}) => {
  const {
    data: userRole,
    isPending: LoadingUserRole,
    error: userRoleError,
  } = useGetTeamMemberRole(team_id);
  const { data: tasks, isPending, error } = useGetTeamTasks(team_id, taskType);

  if (isPending || LoadingUserRole)
    return <Loading message={`Loading ${type} tasks`} />;
  if (error) return <Error errorMessage={error.message} />;
  if (userRoleError) return <Error errorMessage={userRoleError.message} />;

  if (!isPending && !LoadingUserRole && !!error && !userRoleError && !tasks)
    return (
      <span className="text-secondary text-center text-lg md:text-xl">
        No {taskType} tasks available, all {taskType} tasks will appear here.
      </span>
    );

  if (secondaryTasks)
    return (
      <ul className="flex flex-col gap-4">
        {secondaryTasks.map((task: Task) => (
          <TaskComponent
            key={task.id}
            team_id={team_id}
            userRole={userRole}
            task={task}
          />
        ))}
      </ul>
    );

  return (
    <ul className="flex flex-col gap-4">
      {tasks.map((task: Task) => (
        <TaskComponent
          key={task.id}
          team_id={team_id}
          userRole={userRole}
          task={task}
        />
      ))}
    </ul>
  );
};

export default Tasks;

const TaskComponent = ({
  task,
  team_id,
  userRole,
}: {
  task: Task;
  team_id: string;
  userRole: { role: string };
}) => {
  const {
    activeModal,
    activeTeamTask,
    handleActiveModal,
    handleActiveTeamTask,
  } = useModalContext();
  return (
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
      {task.date_finished ? (
        <span>Finished on : {task.date_finished.split("T").join(" ")}</span>
      ) : null}
      <div className="flex flex-row items-center justify-between">
        <Link
          to="/dashboard/organizations/teams/$team_id/tasks/$task_id"
          params={{ team_id, task_id: task.id }}
          search={{ type: "description" }}
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
  );
};
