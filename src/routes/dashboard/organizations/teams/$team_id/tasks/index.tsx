import { createFileRoute } from "@tanstack/react-router";
import Loading from "../../../../../../components/ui/Loading";
import Error from "../../../../../../components/ui/Error";
import useGetTeamTasks from "../../../../../../hooks/useGetTeamTasks";
import ReturnBack from "../../../../../../components/ui/ReturnBack";
import { Tasks } from "../../../../../../components/Tasks";

export const Route = createFileRoute(
  "/dashboard/organizations/teams/$team_id/tasks/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { team_id } = Route.useParams();
  const { data: tasks, isPending, error } = useGetTeamTasks(team_id);

  if (isPending) return <Loading message="Loading team tasks" />;
  if (error) return <Error errorMessage={error.message} />;
  console.log("tasks", tasks);
  return (
    <div className="flex flex-col gap-y-4">
      <ReturnBack />
      <p className="text-secondary text-xl md:text-2xl">All Team Tasks</p>
      <Tasks tasks={tasks} team_id={team_id} />
    </div>
  );
}
