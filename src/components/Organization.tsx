import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { dateToString, OrganizationType } from "../utils/helperFunctions";
import DeleteOrganizationModal from "./modals/DeleteOrganizationModal";

interface Proptypes {
  organization: OrganizationType;
}

const Organization: React.FC<Proptypes> = ({ organization }) => {
  const [deleteOrgModal, setDeleteOrgModal] = useState(false);

  return (
    <>
      <li className="border-secondary mx-auto flex w-full max-w-lg flex-col gap-y-2 rounded-md border p-2 drop-shadow-2xl">
        <div className="flex flex-row items-center justify-between">
          <span className="text-2xl capitalize">{organization.name}</span>
          <Link
            className="text-secondary hover:text-secondary/70 transition-all duration-300 hover:underline"
            params={{ organization_id: organization.id }}
            to="/dashboard/organizations/my_organizations/$organization_id"
            preload="render"
          >
            View details
          </Link>
        </div>
        <span>
          Description :{" "}
          {organization.description.split(" ").slice(0, 5).join(" ") + "..."}
        </span>
        <span>Date Created : {dateToString(organization.created_at)}</span>
        <button
          onClick={() => setDeleteOrgModal(true)}
          className="btn-error w-fit self-end"
        >
          Delete Organization
        </button>
      </li>
      {deleteOrgModal ? (
        <DeleteOrganizationModal
          organization_id={organization.id}
          setDeleteOrgModal={setDeleteOrgModal}
        />
      ) : null}
    </>
  );
};

export default Organization;
