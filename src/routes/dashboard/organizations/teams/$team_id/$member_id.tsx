import { createFileRoute } from "@tanstack/react-router";
import ReturnBack from "../../../../../components/ui/ReturnBack";
import { useQuery } from "@tanstack/react-query";
import { getTeamMember } from "../../../../../utils/team_members";
import Loading from "../../../../../components/ui/Loading";
import Error from "../../../../../components/ui/Error";
import { dateToString } from "../../../../../utils/helperFunctions";

export const Route = createFileRoute(
  "/dashboard/organizations/teams/$team_id/$member_id",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { team_id, member_id } = Route.useParams();

  const {
    data: member,
    isPending,
    error,
  } = useQuery({
    queryKey: ["team_member", team_id, member_id],
    queryFn: () => getTeamMember(member_id, team_id),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    select: (res) => res[0],
  });

  if (isPending) return <Loading message={"Loading team member"} />;
  if (error) return <Error errorMessage={"Member not found"} />;
  console.log(member);
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
        <span>Number of </span>
        <span>Date joined : {dateToString(member.created_at)}</span>
      </div>
    </div>
  );
}
