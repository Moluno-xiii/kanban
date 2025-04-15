import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import EmptyState from "../../../../../components/ui/EmptyState";
import Error from "../../../../../components/ui/Error";
import GoBack from "../../../../../components/ui/GoBack";
import Loading from "../../../../../components/ui/Loading";
import useAuthGuard from "../../../../../hooks/useAuthGuard";
import useDeleteInvitation from "../../../../../hooks/useDeleteInvitation";
import {
  dateToString,
  InvitationNotification,
} from "../../../../../utils/helperFunctions";
import { getOrganizationInvitations } from "../../../../../utils/invitations";
import { useState } from "react";

export const Route = createFileRoute(
  "/dashboard/organizations/my_organizations/$organization_id/sent_invitations",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { organization_id } = Route.useParams();
  const { user } = useAuthGuard();
  const [activeInvitationTab, setActiveInvitationTab] = useState("");
  const cancelInviteMutation = useDeleteInvitation(organization_id);

  const {
    data: invitations,
    isPending,
    error,
  } = useQuery({
    queryKey: ["sent-invitations", organization_id],
    queryFn: () =>
      getOrganizationInvitations(organization_id, user?.id as string),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  if (isPending) return <Loading message="Loading organization invitations" />;

  if (error)
    return (
      <Error
        errorMessage={
          error.message ||
          "An unexpected error occured, reload the page and try again"
        }
      />
    );

  return (
    <div className="flex h-full w-full flex-col gap-y-3">
      <GoBack
        route={`/dashboard/organizations/my_organizations/${organization_id}`}
      />
      {!invitations || invitations.length < 1 ? (
        <EmptyState
          button={false}
          emptyStateText="You haven't any invitations for this Organization, invitations you send will appear here."
        />
      ) : (
        <ul className="flex flex-col gap-3">
          {invitations.map((invitation: InvitationNotification) => (
            <li
              key={invitation.id}
              className="border-secondary flex flex-col gap-y-2 rounded-md border p-2"
            >
              <span className="text-lg md:text-xl">{invitation.message}</span>
              <span>Sent at {dateToString(invitation.created_at)}</span>
              <span>Invitee : {invitation.invitee_email}</span>
              <span>Invitation role : {invitation.role}</span>
              <span>Invitation Status : {invitation.invitation_status}</span>
              <span>
                Has invitation been read? : {invitation.read ? "Yes" : "No"}
              </span>
              <button
                onClick={() => {
                  setActiveInvitationTab(invitation.id);
                  cancelInviteMutation.mutate(invitation.id);
                }}
                className="btn-error self-end"
              >
                {cancelInviteMutation.isPending &&
                activeInvitationTab === invitation.id
                  ? "Deleting invite..."
                  : " Delete invite"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
