import { Link } from "@tanstack/react-router";
import { useModalContext } from "../contexts/ModalContext";
import { dateToString, OrganizationType } from "../utils/helperFunctions";
import DeleteOrganizationModal from "./modals/DeleteOrganizationModal";

interface Proptypes {
  organization: OrganizationType;
}

const Organization: React.FC<Proptypes> = ({ organization }) => {
  const {
    activeModal,
    activeProjectModalId,
    handleActiveModal,
    handleProjectModal,
  } = useModalContext();

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
          onClick={() => {
            handleProjectModal(organization.id);
            handleActiveModal("delete organization");
          }}
          className="btn-error w-fit self-end"
        >
          Delete Organization
        </button>
      </li>
      {activeModal === "delete organization" &&
      organization.id === activeProjectModalId ? (
        <DeleteOrganizationModal
          organization_id={organization.id}
          closeModal={() => handleActiveModal(null)}
          organization_name={organization.name}
        />
      ) : null}
    </>
  );
};

export default Organization;
