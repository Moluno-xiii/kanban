import { createFileRoute } from "@tanstack/react-router";
import EmptyState from "../../../../components/ui/EmptyState";

export const Route = createFileRoute("/dashboard/organizations/invitations/")({
  component: RouteComponent,
});

function RouteComponent() {
  const invitationsData = [{}];
  if (!invitationsData || invitationsData.length < 1)
    return (
      <EmptyState
        emptyStateText="You don't have any invitations organizations, invitations you receive
        will appear here."
        button={false}
      />
    );
  return <div>Hello "/dashboard/organizations/invitations/"!</div>;
}
