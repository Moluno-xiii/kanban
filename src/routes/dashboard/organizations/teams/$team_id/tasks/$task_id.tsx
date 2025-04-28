import { createFileRoute } from "@tanstack/react-router";
import Error from "../../../../../../components/ui/Error";
import Loading from "../../../../../../components/ui/Loading";
import useGetTeamTask from "../../../../../../hooks/useGetTeamTask";
import ReturnBack from "../../../../../../components/ui/ReturnBack";
import { dateToString } from "../../../../../../utils/helperFunctions";

export const Route = createFileRoute(
  "/dashboard/organizations/teams/$team_id/tasks/$task_id",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { team_id, task_id } = Route.useParams();
  const { data: task, isPending, error } = useGetTeamTask(task_id, team_id);

  if (isPending) return <Loading message={"Loading task"} />;
  if (error) return <Error errorMessage={"Task doesn't exist."} />;
  return (
    <div className="flex flex-col gap-y-4">
      <ReturnBack />
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
      {!task.assigned_to ? (
        <button
          aria-label="assign task to member button"
          className="btn self-end"
        >
          Assign task
        </button>
      ) : null}
    </div>
  );
}
