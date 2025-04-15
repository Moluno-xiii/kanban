import { createFileRoute } from "@tanstack/react-router";
import { BiDotsVerticalRounded } from "react-icons/bi";
import EmptyState from "../../../../../components/ui/EmptyState";
import Error from "../../../../../components/ui/Error";
import GoBack from "../../../../../components/ui/GoBack";
import Loading from "../../../../../components/ui/Loading";
import useGetOrganizationMembers from "../../../../../hooks/useGetOrganizationMembers";
import { Member } from "../../../../../utils/helperFunctions";

export const Route = createFileRoute(
  "/dashboard/organizations/my_organizations/$organization_id/members",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { organization_id } = Route.useParams();
  const {
    data: members,
    isPending,
    error,
  } = useGetOrganizationMembers(organization_id);

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

  if (!members || members.length < 1)
    return (
      <EmptyState
        button={true}
        emptyStateText="No members yet, members you add will appear here"
      />
    );

  return (
    <div className="flex flex-col gap-y-4">
      <GoBack
        route={"/dashboard/organizations/my_organizations/$organization_id"}
      />
      <span>Organization : {organization_id}</span>
      <ul className="flex flex-col gap-y-2">
        {members.map((member: Member) => (
          <li
            key={member.member_id}
            className="border-secondary flex flex-row items-center justify-between rounded-md border p-2 drop-shadow-2xl"
          >
            <span>{member.member_email}</span>
            <div className="flex flex-row items-center gap-x-3">
              <span className="capitalize">{member.role}</span>
              <BiDotsVerticalRounded className="cursor-pointer" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
