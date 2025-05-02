import useGetTeamTask from "../hooks/useGetTeamTask";
import Loading from "./ui/Loading";
import Error from "./ui/Error";
import { dateToString } from "../utils/helperFunctions";
import SubmitTeamTaskModal from "./modals/SubmitTeamTaskModal";
import { useModalContext } from "../contexts/ModalContext";
import EmptyState from "./ui/EmptyState";

interface Props {
  task_id: string;
  team_id: string;
}

const TaskDescription: React.FC<Props> = ({ task_id, team_id }) => {
  const { data: task, error, isPending } = useGetTeamTask(task_id, team_id);
  const {
    activeModal,
    activeTeamTask,
    handleActiveModal,
    handleActiveTeamTask,
  } = useModalContext();
  if (isPending) return <Loading message={"Loading task description"} />;
  if (error) return <Error errorMessage={"Task doesn't exist."} />;
  if (task && !task.id && !error)
    return (
      <EmptyState button={false} emptyStateText="Description not found." />
    );
  return (
    <div className="flex flex-col gap-y-4">
      <p
        aria-label="Task title"
        className="text-secondary text-xl capitalize md:text-2xl"
      >
        {" "}
        {task.title}
      </p>
      <div className="flex flex-col gap-y-2">
        <span aria-label="task description">
          Task description : {task.description}
        </span>
        <span aria-label="task's creation date ">
          Date created : {dateToString(task.created_at)}
        </span>
        {task.assigned_to ? (
          <span aria-label="email of user task was assigned to">
            Assigned to : {task.assigned_to}
          </span>
        ) : (
          <span aria-label="task status">Status : {task.status}</span>
        )}
        <span aria-label="email of user task was assigned by">
          Assigned by : {task.assigned_by}
        </span>
      </div>
      {task.status !== "finished" ? (
        <button
          className="btn w-fit"
          onClick={() => {
            handleActiveTeamTask(task.id);
            handleActiveModal("submit team task");
          }}
        >
          Submit task
        </button>
      ) : (
        <span>Task status : {task.status}</span>
      )}
      {activeModal === "submit team task" && activeTeamTask === task.id ? (
        <SubmitTeamTaskModal task={task} />
      ) : null}
    </div>
  );
};

export default TaskDescription;
