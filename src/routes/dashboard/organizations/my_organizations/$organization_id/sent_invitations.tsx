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
import { useModalContext } from "../../../../../contexts/ModalContext";
import DeleteAllOrganizationInvitationsModal from "../../../../../components/modals/DeleteAllOrganizationInvitationsModal";

export const Route = createFileRoute(
  "/dashboard/organizations/my_organizations/$organization_id/sent_invitations",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { organization_id } = Route.useParams();
  const { user } = useAuthGuard();
  const [activeInvitationTab, setActiveInvitationTab] = useState("");
  const { activeModal, handleActiveModal } = useModalContext();

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
      <div className="flex flex-col justify-between gap-y-3 md:flex-row md:items-center">
        <GoBack
          route={`/dashboard/organizations/my_organizations/${organization_id}`}
        />
        {invitations.length ? (
          <div className="flex flex-col gap-x-4 gap-y-2 md:flex-row md:items-center">
            <button
              onClick={() =>
                handleActiveModal("delete all organization invitations")
              }
              className="btn-error"
            >
              Delete all sent invitations
            </button>
            <button
              onClick={() =>
                handleActiveModal("delete all read organization invitations")
              }
              className="btn-error"
            >
              Delete all read invitations
            </button>
          </div>
        ) : null}
        {activeModal === "delete all organization invitations" ? (
          <DeleteAllOrganizationInvitationsModal
            organization_id={organization_id}
            super_admin_id={user?.id as string}
            title="All invitations"
          />
        ) : null}
        {activeModal === "delete all read organization invitations" ? (
          <DeleteAllOrganizationInvitationsModal
            organization_id={organization_id}
            super_admin_id={user?.id as string}
            title="All Read invitations"
            status={true}
          />
        ) : null}
      </div>
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
