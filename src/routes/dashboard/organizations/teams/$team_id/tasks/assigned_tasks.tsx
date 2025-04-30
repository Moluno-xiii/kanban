import { createFileRoute, useSearch } from "@tanstack/react-router";
import { Suspense } from "react";
import UserTasks from "../../../../../../components/UserTasks";
import ReturnBack from "../../../../../../components/ui/ReturnBack";
import SortingButton from "../../../../../../components/ui/SortingButton";

export const Route = createFileRoute(
  "/dashboard/organizations/teams/$team_id/tasks/assigned_tasks",
)({
  component: RouteComponent,
  validateSearch: (search) => {
    return {
      type: (search.type as string) || "all",
    };
  },
});
const subRouteParams = ["all", "finished", "unfinished"];
function RouteComponent() {
  const { team_id } = Route.useParams();
  const { type } = useSearch({ from: Route.id });
  return (
    <div className="flex flex-col gap-y-4">
      <ReturnBack />
      <ul className="flex flex-row gap-x-4">
        {subRouteParams.map((route) => (
          <li key={route}>
            <SortingButton
              type={route}
              team_id={team_id}
              urlQuery={type}
              route="/dashboard/organizations/teams/$team_id/tasks/assigned_tasks"
            />
          </li>
        ))}
      </ul>
      <Suspense fallback={<span>Loading {type} tasks...</span>}>
        <UserTasks team_id={team_id} type={type} />
      </Suspense>
    </div>
  );
}
