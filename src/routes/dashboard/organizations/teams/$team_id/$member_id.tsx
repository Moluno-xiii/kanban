import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import Error from "../../../../../components/ui/Error";
import Loading from "../../../../../components/ui/Loading";
import ReturnBack from "../../../../../components/ui/ReturnBack";
import { dateToString } from "../../../../../utils/helperFunctions";
import { getTeamMember } from "../../../../../utils/team_members";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import { useModalContext } from "../../../../../contexts/ModalContext";
import DeleteTeamMemberModal from "../../../../../components/modals/DeleteTeamMemberModal";
import EditTeamMemberRoleModal from "../../../../../components/modals/EditTeamMemberRole";
import { getMemberFinishedTasks } from "../../../../../utils/team_tasks";
import useGetTeamMemberRole from "../../../../../hooks/useGetTeamMemberRole";

export const Route = createFileRoute(
  "/dashboard/organizations/teams/$team_id/$member_id",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { team_id, member_id } = Route.useParams();
  const { user } = useSelector((state: RootState) => state.auth);
  const { activeModal, handleActiveModal } = useModalContext();
  const {
    data: member,
    isPending,
    error,
  } = useQuery({
    queryKey: ["team_member", team_id, member_id],
    queryFn: async () => await getTeamMember(member_id, team_id),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    select: (res) => res[0],
  });
  const { data: memberRole, isPending: loadingMemberRole } =
    useGetTeamMemberRole(team_id);

  const { data: tasks, isPending: isLoadingfinishedTasks } = useQuery({
    queryKey: ["user-tasks", member?.member_email],
    queryFn: () => getMemberFinishedTasks(member.member_email, team_id),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  console.log(tasks);

  if (isPending || isLoadingfinishedTasks || loadingMemberRole)
    return <Loading message={"Loading team member"} />;
  if (error) return <Error errorMessage={"Member not found"} />;

  return (
    <div className="flex flex-col gap-y-4">
      <ReturnBack />
      <p className="text-secondary">{member.member_email}</p>
      <div className="flex flex-col gap-y-2">
        <span>Role : {member.role.toLowerCase()}</span>
        <span>
          Number of finished tasks (use email for this, incase a user exits and
          joins again.)
        </span>
        <span>Number of finished tasks : {tasks?.length} </span>
        <span>Date joined : {dateToString(member.created_at)}</span>
        {user?.id === member.super_admin_id || memberRole?.role === "admin" ? (
          <div className="flex flex-row items-center justify-between gap-x-2">
            <button
              onClick={() => handleActiveModal("delete team member")}
              className="btn-error"
            >
              Delete member
            </button>
            <button
              onClick={() => handleActiveModal("edit team member role")}
              className="btn"
            >
              Change member role
            </button>
          </div>
        ) : null}
      </div>
      <div>
        {activeModal === "delete team member" ? (
          <DeleteTeamMemberModal
            member={member}
            closeModal={() => handleActiveModal(null)}
          />
        ) : null}
        {activeModal === "edit team member role" ? (
          <EditTeamMemberRoleModal
            member={member}
            closeModal={() => handleActiveModal(null)}
          />
        ) : null}
      </div>
    </div>
  );
}
