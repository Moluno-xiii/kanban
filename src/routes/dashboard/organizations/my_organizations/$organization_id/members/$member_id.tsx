import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import ChangeMemberRoleModal from "../../../../../../components/modals/ChangeMemberRoleMoal";
import DeleteMemberModal from "../../../../../../components/modals/DeleteUserModal";
import EmptyState from "../../../../../../components/ui/EmptyState";
import Loading from "../../../../../../components/ui/Loading";
import ReturnBack from "../../../../../../components/ui/ReturnBack";
import { useModalContext } from "../../../../../../contexts/ModalContext";
import { dateToString } from "../../../../../../utils/helperFunctions";
import { getOrganizationMember } from "../../../../../../utils/members";

export const Route = createFileRoute(
  "/dashboard/organizations/my_organizations/$organization_id/members/$member_id",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { member_id, organization_id } = Route.useParams();
  const { activeModal, handleActiveModal } = useModalContext();

  const {
    data: member,
    isPending,
    error,
  } = useQuery({
    queryKey: ["organization-member", member_id],
    queryFn: () => getOrganizationMember(organization_id, member_id),
    select: (res) => res[0],
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  if (isPending) return <Loading message="Loading member data" />;

  if (!member || member.length < 1 || error)
    return <EmptyState button={false} emptyStateText="Member doesn't exist" />;

  return (
    <div className="flex flex-col gap-y-4">
      <ReturnBack />
      <p className="text-lg sm:text-xl">{member.member_email}</p>
      <span>Date joined : {dateToString(member.created_at)}</span>
      <span>Role : {member.role}</span>

      {member.role !== "super admin" ? (
        <div className="flex flex-row items-center justify-between gap-4">
          <button
            onClick={() => handleActiveModal("edit organization member role")}
            className="btn"
          >
            Edit member role
          </button>
          <button
            onClick={() => handleActiveModal("delete organization member")}
            className="btn-error w-fit self-end"
          >
            Delete member
          </button>
        </div>
      ) : null}

      {activeModal === "delete organization member" ? (
        <DeleteMemberModal
          member={member}
          closeModal={() => handleActiveModal(null)}
        />
      ) : null}
      {activeModal === "edit organization member role" ? (
        <ChangeMemberRoleModal
          member={member}
          closeModal={() => handleActiveModal(null)}
        />
      ) : null}
    </div>
  );
}
