import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import AddOrganizationForm from "../../../../components/forms/AddOrganizationForm";
import Organization from "../../../../components/Organization";
import EmptyState from "../../../../components/ui/EmptyState";
import Loading from "../../../../components/ui/Loading";
import Modal from "../../../../components/ui/Modal";
import useGetUserOrganizations from "../../../../hooks/useGetUserOrganizations";

export const Route = createFileRoute(
  "/dashboard/organizations/my_organizations/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const [organizationModal, setOrganizationModal] = useState(false);
  const { data: organizations, isPending, isError } = useGetUserOrganizations();
  if (isPending) {
    return <Loading message="Loading organizations" />;
  }
  if (isError) {
    return (
      <span className="h-full w-full items-center justify-center text-center">
        An Error occured, reload the page and try again.
      </span>
    );
  }
  if (!organizations || organizations.length < 1)
    return (
      <EmptyState
        button={true}
        handleClick={() => setOrganizationModal(true)}
        emptyStateText="No Organizations, Organizations you belong to will appear here."
        buttonText="Add Organization"
      >
        {organizationModal ? (
          <Modal
            handleClose={() => setOrganizationModal(false)}
            title="Add Organization"
          >
            <AddOrganizationForm
              handleCloseModal={() => setOrganizationModal(false)}
            />
          </Modal>
        ) : null}
      </EmptyState>
    );
  return (
    <div className="flex flex-col gap-y-4">
      <button onClick={() => setOrganizationModal(true)} className="btn w-fit">
        Add Organization
      </button>
      {organizationModal ? (
        <Modal
          handleClose={() => setOrganizationModal(false)}
          title="Add Organization"
        >
          <AddOrganizationForm
            handleCloseModal={() => setOrganizationModal(false)}
          />
        </Modal>
      ) : null}
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {organizations?.map((organization) => (
          <Organization organization={organization} key={organization.id} />
        ))}
      </ul>
    </div>
  );
}
