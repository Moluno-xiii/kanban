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
  console.log("task", task);
  return (
    <div className="flex flex-col gap-y-4">
      <ReturnBack />
      <p className="text-secondary text-xl capitalize md:text-2xl">
        {" "}
        {task.title}
      </p>
      <div className="flex flex-col gap-y-2">
        <span>Task description : {task.descriiption}</span>
        <span>Date created : {dateToString(task.created_at)}</span>
        {task.assigned_to ? (
          <span>Assigned to : {task.assigned_to}</span>
        ) : (
          <span>Status : {task.status}</span>
        )}
        <span>Assigned by : {task.assigned_by}</span>
      </div>
      {!task.assigned_to ? (
        <button className="btn self-end">Assign task</button>
      ) : null}
    </div>
  );
}
