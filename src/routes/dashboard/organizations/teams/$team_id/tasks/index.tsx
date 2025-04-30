import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { lazy, Suspense, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import AddTeamTaskModal from "../../../../../../components/modals/AddTeamTaskModal";
import Error from "../../../../../../components/ui/Error";
import Loading from "../../../../../../components/ui/Loading";
import ReturnBack from "../../../../../../components/ui/ReturnBack";
import SortingButton from "../../../../../../components/ui/SortingButton";
import { useModalContext } from "../../../../../../contexts/ModalContext";
import useGetTeamMemberRole from "../../../../../../hooks/useGetTeamMemberRole";
import useGetTeamTasks from "../../../../../../hooks/useGetTeamTasks";
import { TaskTypes } from "../../../../../../utils/helperFunctions";
const Tasks = lazy(() => import("../../../../../../components/Tasks"));

export const Route = createFileRoute(
  "/dashboard/organizations/teams/$team_id/tasks/",
)({
  component: RouteComponent,
  validateSearch: (search) => {
    return {
      type: (search.type as string) || "all",
    };
  },
});

const ctaButtons = ["all", "finished", "unfinished", "unassigned"];

function RouteComponent() {
  const { team_id } = Route.useParams();
  const { type } = useSearch({ from: Route.id });
  const { data: tasks, isPending, error } = useGetTeamTasks(team_id);
  const {
    data: userRole,
    isPending: isLoadingUserRole,
    error: userRoleError,
  } = useGetTeamMemberRole(team_id);
  const { activeModal, handleActiveModal } = useModalContext();
  const [taskType, setTaskType] = useState<TaskTypes | undefined>(undefined);

  if (isPending || isLoadingUserRole)
    return <Loading message="Loading team tasks" />;
  if (error) return <Error errorMessage={error.message} />;
  if (userRoleError) return <Error errorMessage={userRoleError.message} />;

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-row items-center justify-between">
        <ReturnBack />
        {userRole.role.toLowerCase() === "member" ? (
          <Link
            to="/dashboard/organizations/teams/$team_id/tasks/assigned_tasks"
            params={{ team_id }}
            search={{ type: "all" }}
            className="hover:text-secondary flex flex-row items-center gap-x-3 transition-all duration-200 hover:underline"
          >
            My Assigned tasks
            <FaArrowRight size={15} />
          </Link>
        ) : null}
      </div>
      <div className="flex flex-row items-center justify-between">
        <p className="text-secondary text-xl md:text-2xl">
          All Team Tasks ({tasks.length})
        </p>

        {userRole?.role.toLowerCase() !== "member" ? (
          <button
            onClick={() => handleActiveModal("add team task")}
            className="btn"
            aria-label="add task button"
          >
            Add Task
          </button>
        ) : null}
      </div>

      <ul className="flex flex-row items-center gap-4">
        {ctaButtons.map((button) => (
          <li key={button}>
            <SortingButton
              team_id={team_id}
              type={button}
              urlQuery={type}
              setTaskType={setTaskType}
              route="/dashboard/organizations/teams/$team_id/tasks"
            />
          </li>
        ))}
      </ul>
      <Suspense fallback={<span>Loading {type} tasks...</span>}>
        <Tasks type={type} taskType={taskType} team_id={team_id} />
      </Suspense>
      {activeModal === "add team task" ? (
        <AddTeamTaskModal
          team_id={team_id}
          organization_id={userRole?.organization_id}
          admin_id={tasks[0].admin_id}
          super_admin_id={tasks[0].super_admin_id}
          handleActiveModal={handleActiveModal}
          team_name={userRole?.team_name}
        />
      ) : null}
    </div>
  );
}
