import { createFileRoute } from "@tanstack/react-router";
import useGetInvitation from "../../../../hooks/useGetInvitation";
import Error from "../../../../components/ui/Error.tsx";
import Loading from "../../../../components/ui/Loading";

export const Route = createFileRoute(
  "/dashboard/organizations/invitations/$invitation_id",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { invitation_id } = Route.useParams();
  const { data, isPending, isError } = useGetInvitation(invitation_id);
  console.log(data);

  if (isError) return <Error errorMessage={"Invitation not found"} />;
  if (isPending) return <Loading message={"Loading invitation"} />;

  return (
    <div className="flex flex-col gap-y-4">
      <span className="text-lg md:text-xl">{data[0].message}</span>
      <span>Invitation status : {data[0].invitation_status}</span>
      <span>Role : {data[0].role}</span>

      <div className="flex flex-row items-center justify-between">
        <button className="btn">accept invite</button>
        <button className="btn-error">Reject invite</button>
      </div>
    </div>
  );
}
