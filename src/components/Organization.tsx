import { Link } from "@tanstack/react-router";

import type { OrganizationType } from "../routes/dashboard/organizations/index";

interface Proptypes {
  organization: OrganizationType;
}
const Organization: React.FC<Proptypes> = ({ organization }) => {
  return (
    <li className="border-secondary mx-auto flex w-full max-w-lg flex-col gap-y-2 rounded-md border p-2 drop-shadow-2xl">
      <div className="flex flex-row items-center justify-between">
        <span className="text-2xl capitalize">{organization.title}</span>
        <Link
          className="text-primary hover:text-primary/70 transition-all duration-300 hover:underline"
          params={{ organization_id: organization.id }}
          to="/dashboard/organizations/$organization_id"
        >
          View details
        </Link>
      </div>
      <span>Number of members : {organization.numberOfMembers}</span>
      <span>Date Created : {organization.dateCreated}</span>
    </li>
  );
};

export default Organization;
