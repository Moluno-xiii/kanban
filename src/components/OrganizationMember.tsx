import { Link, useRouterState } from "@tanstack/react-router";
import { FaArrowRight } from "react-icons/fa6";
import { Member } from "../utils/helperFunctions";

const OrganizationMember = ({
  member,
  organization_id,
}: {
  member: Member;
  organization_id: string;
}) => {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const baseRoute = currentPath.includes("my_organizations")
    ? "my_organizations"
    : "other_organizations";

  return (
    <li
      key={member.member_id}
      className="flex flex-col justify-between sm:flex-row sm:items-center"
    >
      <span>{member.member_email}</span>
      <div className="flex flex-row items-center gap-x-2">
        <span className="capitalize">{member.role}</span>
        <Link
          to={`/dashboard/organizations/${baseRoute}/$organization_id/members/$member_id`}
          params={{ member_id: member.member_id, organization_id }}
          className="hover:text-secondary/70 text-secondary flex cursor-pointer flex-row items-center gap-x-2 transition-all duration-200"
        >
          View member
          <FaArrowRight size={15} />
        </Link>
      </div>
    </li>
  );
};

export default OrganizationMember;
