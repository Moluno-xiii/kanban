import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import AddMemberForm from "../../../../../components/forms/AddMemberForm";
import CreateTeamModal from "../../../../../components/modals/CreateTeamModal";
import Error from "../../../../../components/ui/Error";
import GoBack from "../../../../../components/ui/GoBack";
import Loading from "../../../../../components/ui/Loading";
import Modal from "../../../../../components/ui/Modal";
import { useModalContext } from "../../../../../contexts/ModalContext.tsx";
import useGetAdminOrganization from "../../../../../hooks/useGetAdminOrganization";
import { RootState } from "../../../../../store";
import { dateToString } from "../../../../../utils/helperFunctions";
import UpdateOrganizationDetailsModal from "../../../../../components/modals/UpdateOrganizationDetailsModal.tsx";
import DeleteOrganizationModal from "../../../../../components/modals/DeleteOrganizationModal.tsx";
const OrganizationTeams = lazy(
  () => import("../../../../../components/OrganizationTeams.tsx"),
);
const OrganizationMembers = lazy(
  () => import("../../../../../components/OrganizationMembers.tsx"),
);

export const Route = createFileRoute(
  "/dashboard/organizations/my_organizations/$organization_id/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { organization_id } = Route.useParams();
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    data: organization,
    isPending,
    error,
  } = useGetAdminOrganization(organization_id);
  const { activeModal, handleActiveModal } = useModalContext();

  if (isPending) {
    return <Loading message="Loading organizations" />;
  }

  if (error) {
    return <Error errorMessage={"Organization not found."} />;
  }

  if (!organization || organization.length < 1)
    return (
      <div>
        <GoBack route={"/dashboard/organizations"} />
        Organization not found.
      </div>
    );

  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-row items-center justify-between">
        <GoBack route={"/dashboard/organizations/my_organizations"} />
        {user?.id === organization.super_admin_id ? (
          <Link
            to="/dashboard/organizations/my_organizations/$organization_id/sent_invitations"
            params={{ organization_id }}
            className="text-secondary hover:text-secondary/70 flex flex-row items-center gap-x-2 transition-all duration-200 hover:underline"
          >
            Sent Invitations
            <FaArrowRight size={15} />
          </Link>
        ) : null}
      </div>
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <span className="text-xl capitalize md:text-2xl">
          {organization.name}
        </span>
        <div className="flex flex-row items-center justify-between gap-x-3">
          <button
            className="btn"
            onClick={() => handleActiveModal("create team")}
          >
            Create team
          </button>
          <button
            className="btn"
            onClick={() => handleActiveModal("add organization member")}
          >
            Add Members
          </button>
          {activeModal === "create team" ? (
            <CreateTeamModal
              handleCloseModal={() => handleActiveModal(null)}
              organization_id={organization_id}
              creator_id={user?.id as string}
              super_admin_id={user?.id as string}
            />
          ) : null}
        </div>
        {activeModal === "add organization member" ? (
          <Modal
            handleClose={() => handleActiveModal(null)}
            title="Add Member Form"
          >
            <AddMemberForm
              organization_id={organization.id}
              organization_name={organization.name}
              handleModal={() => handleActiveModal(null)}
            />
          </Modal>
        ) : null}
      </div>
      <div className="flex flex-col gap-y-2">
        <span>Date Created : {dateToString(organization.created_at)}</span>
        <span>Description : {organization.description}</span>
        <button
          onClick={() => handleActiveModal("update organization details")}
          className="btn self-start"
        >
          Edit Organization details
        </button>
        {activeModal === "update organization details" ? (
          <UpdateOrganizationDetailsModal
            organization={organization}
            handleClose={() => handleActiveModal(null)}
          />
        ) : null}
      </div>

      <Suspense
        fallback={
          <span className="text-secondary text-lg sm:text-xl">
            Loading organization members...
          </span>
        }
      >
        <OrganizationMembers organization_id={organization_id} />
      </Suspense>
      <Suspense
        fallback={
          <span className="text-secondary text-lg sm:text-xl">
            Loading organization teams...
          </span>
        }
      >
        <OrganizationTeams
          organization_id={organization_id}
          super_admin_id={user?.id as string}
        />
      </Suspense>
      <button
        className="btn-error self-end"
        onClick={() => handleActiveModal("delete organization")}
      >
        Delete Organization
      </button>
      {activeModal === "delete organization" ? (
        <DeleteOrganizationModal
          organization_id={organization_id}
          organization_name={organization.name}
          closeModal={() => handleActiveModal(null)}
        />
      ) : null}
    </div>
  );
}
