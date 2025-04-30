import { createFileRoute } from "@tanstack/react-router";
import useGetOrganizationMember from "../../../../../../hooks/useGetOrganizationMember";
import Loading from "../../../../../../components/ui/Loading";
import Error from "../../../../../../components/ui/Error";
import { dateToString } from "../../../../../../utils/helperFunctions";
import ReturnBack from "../../../../../../components/ui/ReturnBack";

export const Route = createFileRoute(
  "/dashboard/organizations/other_organizations/$organization_id/members/$member_id",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { member_id, organization_id } = Route.useParams();
  const {
    data: member,
    isPending,
    error,
  } = useGetOrganizationMember(member_id, organization_id);

  if (isPending) return <Loading message="Loading organization members" />;

  if (error) {
    return (
      <Error errorMessage={error.message || "An unexpected error occured."} />
    );
  }

  return (
    <div className="flex flex-col gap-y-4">
      <ReturnBack />
      <p className="text-lg sm:text-xl">{member.organization_name}</p>
      <div className="flex flex-col gap-y-2">
        <span>Member email : {member.member_email}</span>
        <span>Member role : {member.role}</span>
        <span>Date joined : {dateToString(member.created_at)}</span>
      </div>
    </div>
  );
}
