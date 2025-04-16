import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import EmptyState from "../../../../../../components/ui/EmptyState";
import GoBack from "../../../../../../components/ui/GoBack";
import Loading from "../../../../../../components/ui/Loading";
import { getOrganizationMember } from "../../../../../../utils/members";
import { dateToString } from "../../../../../../utils/helperFunctions";
import useSendNotification from "../../../../../../hooks/useSendNotification";

export const Route = createFileRoute(
  "/dashboard/organizations/my_organizations/$organization_id/members/$member_id",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { member_id, organization_id } = Route.useParams();

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

  const sendNotificationMutation = useSendNotification();
  console.log(member);
  if (isPending) return <Loading message="Loading member data" />;

  if (!member || member.length < 1 || error)
    return <EmptyState button={true} emptyStateText="Member doesn't exist" />;

  return (
    <div className="flex flex-col gap-y-4">
      <GoBack
        route={
          "/dashboard/organizations/my_organizations/$organization_id/members/"
        }
      />
      <p className="text-lg sm:text-xl">{member.member_email}</p>
      <span>Date joined : {dateToString(member.created_at)}</span>
      <span>Role : {member.role}</span>

      <span>
        // add member data like completed tasks, pending tasks, their numbers,
        e.t.c
      </span>
      <button className="btn-error w-fit self-end">Delete user</button>
      <button
        onClick={() =>
          sendNotificationMutation.mutate({
            email: member.member_email,
            title: "Deletion of account",
            user_id: member.member_id,
            message: `You have been removed from the Organization : ${member.organization_name}`,
          })
        }
        className="btn-error w-fit self-end"
      >
        {sendNotificationMutation.isPending
          ? "sending notification..."
          : " send notification"}
      </button>
    </div>
  );
}
