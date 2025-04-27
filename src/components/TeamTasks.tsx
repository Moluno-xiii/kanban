import { useModalContext } from "../contexts/ModalContext";
import useGetTeamMemberRole from "../hooks/useGetTeamMemberRole";
import useGetTeamTasks from "../hooks/useGetTeamTasks";
import { Task } from "../utils/helperFunctions";
import AddTeamTaskModal from "./modals/AddTeamTaskModal";
import Error from "./ui/Error";
import Loading from "./ui/Loading";

interface Props {
  team_id: string;
  admin_id: string;
  super_admin_id: string;
}

const TeamTasks: React.FC<Props> = ({ admin_id, team_id, super_admin_id }) => {
  const { activeModal, handleActiveModal } = useModalContext();
  const { data: tasks, isPending, error } = useGetTeamTasks(team_id);
  const { data: userRole, isPending: loadingUserRole } =
    useGetTeamMemberRole(team_id);
  const user_role = userRole?.role.toLowerCase();
  console.log(user_role);

  if (isPending || loadingUserRole)
    return <Loading message="Loading team tasks" />;
  if (error) return <Error errorMessage={error.message} />;
  console.log(tasks);

  return (
    <div className="flex flex-col gap-y-3">
      {tasks.length ? (
        <div className="flex flex-col gap-y-3">
          <span>Tasks ({tasks.length})</span>
          <ul className="flex flex-col gap-2">
            {tasks.map((task: Task) => (
              <li key={task.id}>
                <span className="capitalize">{task.title}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-y-2 text-center">
          <span className="text-secondary text-xl sm:text-2xl">
            No team tasks yet, team tasks added will appear here.
          </span>
          {user_role !== "member" ? (
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
