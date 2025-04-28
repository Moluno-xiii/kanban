import { Link } from "@tanstack/react-router";
import { useModalContext } from "../contexts/ModalContext";
import useGetTeamMemberRole from "../hooks/useGetTeamMemberRole";
import useGetTeamTasks from "../hooks/useGetTeamTasks";
import AddTeamTaskModal from "./modals/AddTeamTaskModal";
import Error from "./ui/Error";
import Loading from "./ui/Loading";
import { Tasks } from "./Tasks";

interface Props {
  team_id: string;
  admin_id: string;
  super_admin_id: string;
}

const TeamTasks: React.FC<Props> = ({ admin_id, team_id, super_admin_id }) => {
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
          <div className="flex flex-row items-center justify-between">
            <span className="text-secondary text-lg sm:text-xl">
              Tasks
              {/* ({tasks.length}) */}
            </span>
            {userRole !== "member" ? (
              <button
                onClick={() => handleActiveModal("add team task")}
                className="btn"
              >
                Add Task
              </button>
            ) : null}
          </div>
          <Tasks team_id={team_id} tasks={tasks.slice(0, 4)} />
          {tasks.length > 5 ? (
            <Link
              to="/dashboard/organizations/teams/$team_id/tasks"
              params={{ team_id }}
              className="btn self-end"
            >
              View all tasks
            </Link>
          ) : null}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-y-2 text-center">
          <span className="text-secondary text-xl sm:text-2xl">
            No team tasks yet, team tasks added will appear here.
          </span>
          {userRole !== "member" ? (
            <button
              onClick={() => handleActiveModal("add team task")}
              className="btn"
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
        />
      ) : null}
    </div>
  );
};

export default TeamTasks;
