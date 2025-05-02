import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import GoBack from "../../../../../../components/ui/GoBack";

const TaskDescription = lazy(
  () => import("../../../../../../components/TaskDescription"),
);
const TaskSubmissions = lazy(
  () => import("../../../../../../components/TaskSubmissions"),
);

export const Route = createFileRoute(
  "/dashboard/organizations/teams/$team_id/tasks/$task_id",
)({
  component: RouteComponent,
  validateSearch: (search) => {
    return {
      type: (search.type as string) || "description",
    };
  },
});

function RouteComponent() {
  const { team_id, task_id } = Route.useParams();
  const { type } = useSearch({ from: Route.id });

  const subRouteButtons = ["description", "submissions"];
  return (
    <div className="flex flex-col gap-y-4">
      <GoBack
        route={`/dashboard/organizations/teams/${team_id}/tasks?type=all`}
      />
      <div className="flex flex-row items-center gap-x-4">
        {subRouteButtons.map((button) => (
          <SortingButton
            route="/dashboard/organizations/teams/$team_id/tasks/$task_id"
            type={button}
            task_id={task_id}
            team_id={team_id}
            key={button}
            urlQuery={type}
          />
        ))}
      </div>
      {type === "description" ? (
        <Suspense fallback={<span>Loading task description...</span>}>
          <TaskDescription task_id={task_id} team_id={team_id} />
        </Suspense>
      ) : null}
      {type === "submissions" ? (
        <Suspense fallback={<span>Loading task submissions...</span>}>
          <TaskSubmissions task_id={task_id} team_id={team_id} />
        </Suspense>
      ) : null}
    </div>
  );
}

interface PropTypes {
  team_id: string;
  task_id: string;
  type: string;
  urlQuery: string;
  route: string;
}
const SortingButton: React.FC<PropTypes> = ({
  team_id,
  task_id,
  type,
  urlQuery,
  route,
}) => {
  const navigate = useNavigate();
  return (
    <button
      aria-label={`show task ${type} button.`}
      onClick={() => {
        navigate({
          to: route,
          search: () => ({ type }),
          params: { team_id, task_id },
        });
      }}
      className={`${type === urlQuery ? "text-secondary underline" : "text-text hover:text-secondary transition-all duration-200 hover:underline"} cursor-pointer capitalize sm:text-lg md:text-xl`}
    >
      Task {type}
    </button>
  );
};

export default SortingButton;
