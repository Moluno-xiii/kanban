import { Link, useRouterState } from "@tanstack/react-router";
import useGetOrganizationMembers from "../hooks/useGetOrganizationMembers";
import { Member } from "../utils/helperFunctions";
import OrganizationMember from "./OrganizationMember";
import Loading from "./ui/Loading";
import Error from "./ui/Error";
import useGetUserOrganizationRole from "../hooks/useGetUserOrganizationRole";

interface PropTypes {
  organization_id: string;
}

const OrganizationMembers: React.FC<PropTypes> = ({ organization_id }) => {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const baseRoute = currentPath.includes("my_organizations")
    ? "my_organizations"
    : "other_organizations";

  const {
    data: members,
    isPending: isFetchingMembers,
    error,
  } = useGetOrganizationMembers(organization_id);
  const { data: userRole } = useGetUserOrganizationRole(organization_id);
  const user_role = userRole ? userRole[0].role.toLowerCase() : null;
  console.log(user_role);
  if (isFetchingMembers)
    return <Loading message="Loading organization members" />;

  if (error) {
    return (
      <Error errorMessage={error.message || "An unexpected error occured."} />
    );
  }

  return (
    <div>
      {members.length >= 1 ? (
        <div className="border-secondary mt-4 flex flex-col gap-y-2 rounded-md border p-2 shadow-sm">
          <div className="flex flex-row items-center justify-between gap-3">
            <span className="text-secondary text-xl md:text-2xl">
              Members ({members.length})
            </span>
            {members.length > 5 &&
            (user_role === "super admin" || user_role === "admin") ? (
              <Link
                className="text-secondary hover:text-secondary/70 transition-all duration-300 hover:underline"
                params={{ organization_id }}
                to={`/dashboard/organizations/${baseRoute}/$organization_id/members`}
              >
                View all members
              </Link>
            ) : null}
          </div>
          <ul className="flex flex-col gap-y-2">
            {members.slice(0, 5).map((member: Member) => (
              <OrganizationMember
                key={member.primary_key}
                member={member}
                organization_id={organization_id}
              />
            ))}
          </ul>
        </div>
      ) : (
        <span className="text-center text-lg sm:text-xl">No members yet</span>
      )}
    </div>
  );
};

export default OrganizationMembers;
