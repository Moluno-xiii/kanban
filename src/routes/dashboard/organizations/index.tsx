import { createFileRoute } from "@tanstack/react-router";
import Organization from "../../../components/Organization";
import { Dispatch, SetStateAction, useState } from "react";
import Modal from "../../../components/ui/Modal";
import AddOrganizationForm from "../../../components/forms/AddOrganizationForm";

export interface OrganizationType {
  id: string;
  title: string;
  dateCreated: string;
  numberOfMembers: number;
  createdBy: string;
}

export const organizationsData: OrganizationType[] = [
  {
    id: "1",
    title: "organization 1",
    // no project array here, cos i'll fetch the organization projects using the organization ID.
    dateCreated: "May 25 2025",
    numberOfMembers: 2,
    createdBy: "helenOfTroy@siren.com",
  },
  {
    id: "2",
    title: "organization 2",
    dateCreated: "July 25 2025",
    numberOfMembers: 5,
    createdBy: "helenOfTroy@siren.com",
  },
  {
    id: "3",
    title: "organization 3",
    dateCreated: "May 21 2025",
    numberOfMembers: 67,
    createdBy: "helenOfTroy@siren.com",
  },
  {
    id: "4",
    title: "organization 4",
    dateCreated: "April 25 2025",
    numberOfMembers: 6,
    createdBy: "helenOfTroy@siren.com",
  },
  {
    id: "5",
    title: "organization 5",
    dateCreated: "May 25 2025",
    numberOfMembers: 4,
    createdBy: "helenOfTroy@siren.com",
  },
  {
    id: "6",
    title: "organization 6",
    dateCreated: "October 15 2025",
    numberOfMembers: 4,
    createdBy: "helenOfTroy@siren.com",
  },
  {
    id: "7",
    title: "organization 7",
    dateCreated: "May 25 2025",
    numberOfMembers: 4,
    createdBy: "helenOfTroy@siren.com",
  },
  {
    id: "8",
    title: "organization 8",
    dateCreated: "May 25 2025",
    numberOfMembers: 4,
    createdBy: "helenOfTroy@siren.com",
  },
  {
    id: "9",
    title: "organization 9",
    dateCreated: "May 25 2025",
    numberOfMembers: 4,
    createdBy: "helenOfTroy@siren.com",
  },
  {
    id: "10",
    title: "organization 10",
    dateCreated: "May 25 2025",
    numberOfMembers: 4,
    createdBy: "helenOfTroy@siren.com",
  },
];

export const Route = createFileRoute("/dashboard/organizations/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [organizationModal, setOrganizationModal] = useState(false);
  if (organizationsData.length < 1)
    return (
      <EmptyState
        organizationModal={organizationModal}
        setOrganizationModal={setOrganizationModal}
      />
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
            handleModal={() => setOrganizationModal(false)}
          />
        </Modal>
      ) : null}
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {organizationsData.map((organization) => (
          <Organization organization={organization} key={organization.id} />
        ))}
      </ul>
    </div>
  );
}

const EmptyState = ({
  setOrganizationModal,
  organizationModal,
}: {
  setOrganizationModal: Dispatch<SetStateAction<boolean>>;
  organizationModal: boolean;
}) => {
  return (
    <div className="flex min-h-full min-w-full flex-col items-center justify-center gap-y-2">
      <span>
        No Organizations, Organizations you belong to will appear here.
      </span>
      <button onClick={() => setOrganizationModal(true)} className="btn">
        Add Organization
      </button>
      {organizationModal ? (
        <Modal
          handleClose={() => setOrganizationModal(false)}
          title="Add Organization"
        >
          <AddOrganizationForm
            handleModal={() => setOrganizationModal(false)}
          />
        </Modal>
      ) : null}
    </div>
  );
};
