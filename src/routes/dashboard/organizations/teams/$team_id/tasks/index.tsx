import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import Loading from "../../../../../../components/ui/Loading";
import Error from "../../../../../../components/ui/Error";
import useGetTeamTasks from "../../../../../../hooks/useGetTeamTasks";
import ReturnBack from "../../../../../../components/ui/ReturnBack";
import { Tasks } from "../../../../../../components/Tasks";
import useGetTeamMemberRole from "../../../../../../hooks/useGetTeamMemberRole";
import { useModalContext } from "../../../../../../contexts/ModalContext";
import AddTeamTaskModal from "../../../../../../components/modals/AddTeamTaskModal";

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

const ctaButtons = ["all", "finished", "unfinished"];

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

  if (isPending || isLoadingUserRole)
    return <Loading message="Loading team tasks" />;
  if (error) return <Error errorMessage={error.message} />;
  if (userRoleError) return <Error errorMessage={userRoleError.message} />;
  console.log(userRole);
  return (
    <div className="flex flex-col gap-y-4">
      <ReturnBack />
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
            <SortingButton team_id={team_id} type={button} />
          </li>
        ))}
      </ul>
      {type}
      <Tasks tasks={tasks} team_id={team_id} />
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

interface PropTypes {
  team_id: string;
  type: string;
}
const SortingButton: React.FC<PropTypes> = ({ team_id, type }) => {
  const navigate = useNavigate();
  return (
    <button
      aria-label={`show ${type} tasks button.`}
      onClick={() =>
        navigate({
          to: "/dashboard/organizations/teams/$team_id/tasks",
          search: () => ({ type }),
          params: { team_id },
        })
      }
      className="btn"
    >
      {type} Tasks
    </button>
  );
};
