import { createFileRoute, Link } from "@tanstack/react-router";
import { FaArrowRight } from "react-icons/fa";
import EmptyState from "../../../../../../components/ui/EmptyState";
import Error from "../../../../../../components/ui/Error";
import GoBack from "../../../../../../components/ui/GoBack";
import Loading from "../../../../../../components/ui/Loading";
import useGetOrganizationMembers from "../../../../../../hooks/useGetOrganizationMembers";
import { Member } from "../../../../../../utils/helperFunctions";

export const Route = createFileRoute(
  "/dashboard/organizations/my_organizations/$organization_id/members/",
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
      <ul className="flex flex-col gap-y-2">
        {members.map((member: Member) => (
          <li
            key={member.member_id}
            className="border-secondary z-10 flex flex-col justify-between rounded-md border p-2 drop-shadow-2xl sm:flex-row sm:items-center"
          >
            <span>{member.member_email}</span>
            <div className="flex flex-row items-center gap-x-3">
              <span className="capitalize">{member.role}</span>
              <Link
                to="/dashboard/organizations/my_organizations/$organization_id/members/$member_id"
                params={{ member_id: member.member_id, organization_id }}
                className="hover:text-secondary/70 text-secondary flex cursor-pointer flex-row items-center gap-x-2 transition-all duration-200"
              >
                View member
                <FaArrowRight size={15} />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
