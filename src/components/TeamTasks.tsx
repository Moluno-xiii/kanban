import { Link } from "@tanstack/react-router";
import { useModalContext } from "../contexts/ModalContext";
import useGetTeamMemberRole from "../hooks/useGetTeamMemberRole";
import useGetTeamTasks from "../hooks/useGetTeamTasks";
import AddTeamTaskModal from "./modals/AddTeamTaskModal";
import Error from "./ui/Error";
import Loading from "./ui/Loading";
import Tasks from "./Tasks";

interface Props {
  team_id: string;
  admin_id: string;
  super_admin_id: string;
  organization_id: string;
  team_name: string;
}

const TeamTasks: React.FC<Props> = ({
  admin_id,
  team_id,
  super_admin_id,
  organization_id,
  team_name,
}) => {
  const { activeModal, handleActiveModal } = useModalContext();
  const { data: userRole, isPending: loadingUserRole } =
    useGetTeamMemberRole(team_id);
  const { data: tasks, isPending, error } = useGetTeamTasks(team_id);

  if (isPending || loadingUserRole)
    return <Loading message="Loading team tasks" />;
  if (error) return <Error errorMessage={error.message} />;

  return (
    <div className="flex flex-col gap-y-3">
      {tasks.length ? (
        <div className="flex flex-col gap-y-3">
          <div className="flex flex-col justify-between gap-y-2 sm:flex-row sm:items-center">
            <span className="text-secondary text-lg sm:text-xl">
              Tasks ({tasks.length})
            </span>
            {userRole?.role.toLowerCase() !== "member" ? (
              <div className="flex flex-row gap-x-4 sm:items-center">
                <button
                  aria-label="add task button"
                  onClick={() => handleActiveModal("add team task")}
                  className="btn"
                >
                  Add Task
                </button>
                <Link
                  className="btn"
                  to="/dashboard/organizations/teams/$team_id/submissions"
                  params={{ team_id }}
                  search={{ type: "all" }}
                >
                  View all task submissions
                </Link>
              </div>
            ) : null}
          </div>
          <Tasks team_id={team_id} secondaryTasks={tasks.slice(0, 4)} />
          <div className="flex flex-row items-center justify-between">
            <Link
              to="/dashboard/organizations/teams/$team_id/tasks/assigned_tasks"
              params={{ team_id }}
              className="btn"
              search={() => ({ type: "all" })}
              aria-label="link to view all my assigned tasks"
            >
              View my assigned tasks
            </Link>
            {tasks.length > 5 ? (
              <Link
                to="/dashboard/organizations/teams/$team_id/tasks"
                params={{ team_id }}
                className="btn"
                search={() => ({ type: "all" })}
                aria-label="link to view all tasks"
              >
                View all tasks
              </Link>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-y-2 text-center">
          <span
            aria-label="tasks empty state text"
            className="text-secondary text-xl sm:text-2xl"
          >
            No team tasks yet, team tasks added will appear here.
          </span>
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
      )}
      {activeModal === "add team task" ? (
        <AddTeamTaskModal
          admin_id={admin_id}
          team_id={team_id}
          super_admin_id={super_admin_id}
          handleActiveModal={handleActiveModal}
          organization_id={organization_id}
          team_name={team_name}
        />
      ) : null}
    </div>
  );
};

export default TeamTasks;
