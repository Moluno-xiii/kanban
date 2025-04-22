import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import SentInvitation from "../../../../../components/SentInvitation";
import EmptyState from "../../../../../components/ui/EmptyState";
import Error from "../../../../../components/ui/Error";
import GoBack from "../../../../../components/ui/GoBack";
import Loading from "../../../../../components/ui/Loading";
import useAuthGuard from "../../../../../hooks/useAuthGuard";
import { InvitationNotification } from "../../../../../utils/helperFunctions";
import { getOrganizationInvitations } from "../../../../../utils/invitations";

export const Route = createFileRoute(
  "/dashboard/organizations/my_organizations/$organization_id/sent_invitations",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { organization_id } = Route.useParams();
  const { user } = useAuthGuard();
  const [activeInvitationTab, setActiveInvitationTab] = useState("");

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
            <SentInvitation
              key={invitation.id}
              organization_id={organization_id}
              invitation={invitation}
              activeInvitationTab={activeInvitationTab}
              setActiveInvitationTab={setActiveInvitationTab}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
