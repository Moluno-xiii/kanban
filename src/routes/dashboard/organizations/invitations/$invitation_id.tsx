import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Error from "../../../../components/ui/Error.tsx";
import GoBack from "../../../../components/ui/GoBack.tsx";
import Loading from "../../../../components/ui/Loading";
import useGetInvitation from "../../../../hooks/useGetInvitation";
import { updateInvitationStatus } from "../../../../utils/invitations.ts";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAcceptInvitation from "../../../../hooks/useAcceptInvitation.ts";

export const Route = createFileRoute(
  "/dashboard/organizations/invitations/$invitation_id",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { invitation_id } = Route.useParams();
  const { data, isPending, isError } = useGetInvitation(invitation_id);
  const navigate = useNavigate();
  const acceptInvitation = useAcceptInvitation({
    invitation_id,
    role: data?.role as string,
    organization_id: data?.organization_id,
    super_admin_id: data?.inviter_id,
    organization_name: data?.organization_name,
  });

  const rejectInvitation = useMutation({
    mutationFn: () => updateInvitationStatus("rejected", invitation_id),
    onSuccess: () => {
      toast.error("Invitation rejected!");
      navigate({
        to: "/dashboard/organizations/invitations",
        replace: true,
        search: { type: "unread" },
      });
    },
    onError: (error: { message: string }) => {
      toast.error(error.message || "An unexpected error occured");
      console.error(error.message);
    },
  });

  if (isPending) return <Loading message={"Loading invitation"} />;
  if (isError || !data || data.length < 1)
    return <Error errorMessage={"Invitation has expired or doesn't exist"} />;

  return (
    <div className="flex flex-col gap-y-4">
      <GoBack route="/dashboard/organizations/invitations" />
      <span className="text-lg md:text-xl">{data.message}</span>
      <span>Invitation status : {data.invitation_status}</span>
      <span>Role : {data.role}</span>

      {data.invitation_status !== "accepted" ? (
        <div className="flex flex-row items-center justify-between">
          <button
            className="btn-error"
            onClick={() => rejectInvitation.mutate()}
          >
            {rejectInvitation.isPending
              ? "Rejecting invitation..."
              : "Reject invite"}
          </button>
          <button className="btn" onClick={() => acceptInvitation.mutate()}>
            {acceptInvitation.isPending
              ? "Accepting invitation..."
              : "accept invite"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
