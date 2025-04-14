import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import AddMemberForm from "../../../../../components/forms/AddMemberForm";
import GoBack from "../../../../../components/ui/GoBack";
import Loading from "../../../../../components/ui/Loading";
import Modal from "../../../../../components/ui/Modal";
import useGetAdminOrganization from "../../../../../hooks/useGetAdminOrganization";
import { dateToString } from "../../../../../utils/helperFunctions";

export const Route = createFileRoute(
  "/dashboard/organizations/my_organizations/$organization_id/",
)({
  component: RouteComponent,
});

export const membersData = [
  {
    name: "agammemnonoftroy@gmail.com",
    role: "sub-admin",
  },
  {
    name: "kratosTheWarLord@gmail.com",
    role: "sub-admin",
  },
  {
    name: "moriarty@gmail.com",
    role: "member",
  },
  {
    name: "sherlockHolmes@gmail.com",
    role: "member",
  },
  {
    name: "achilles@gmail.com",
    role: "member",
  },
  {
    name: "paris@gmail.com",
    role: "member",
  },
  {
    name: "hector@gmail.com",
    role: "member",
  },
  {
    name: "odysseus@gmail.com",
    role: "member",
  },
];
function RouteComponent() {
  const { organization_id } = Route.useParams();
  const {
    data: organization,
    isPending,
    isError,
  } = useGetAdminOrganization(organization_id);
  const [addMemberModal, setAddMemberModal] = useState(false);

  const handleAddMemberModal = (state: boolean) => {
    setAddMemberModal(state);
  };

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
  if (!organization || organization.length < 1)
    return (
      <div>
        <GoBack route={"/dashboard/organizations"} />
        Data not found.
      </div>
    );
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-row items-center justify-between">
        <GoBack route={"/dashboard/organizations/my_organizations"} />
      </div>
      <div className="flex flex-row items-center justify-between gap-3">
        <span className="text-xl capitalize md:text-2xl">
          {organization.name}
        </span>
        <button className="btn" onClick={() => handleAddMemberModal(true)}>
          Add Members
        </button>
        {addMemberModal ? (
          <Modal
            handleClose={() => handleAddMemberModal(false)}
            title="Add Member Form"
          >
            <AddMemberForm
              organization_id={organization.id}
              organization_name={organization.name}
              handleModal={() => handleAddMemberModal(false)}
            />
          </Modal>
        ) : null}
      </div>
      <div className="flex flex-col gap-y-2">
        <span>Date Created : {dateToString(organization.created_at)}</span>
        <span>Description : {organization.description}</span>
      </div>
      <div className="border-secondary flex flex-col gap-y-2 rounded-md border p-2 shadow-sm">
        <div className="flex flex-row items-center justify-between gap-3">
          <span className="text-xl md:text-2xl">Members</span>
          {membersData.length > 5 ? (
            <Link
              className="text-secondary hover:text-secondary/70 transition-all duration-300 hover:underline"
              params={{ organization_id }}
              to="/dashboard/organizations/my_organizations/$organization_id/members"
            >
              View all members
            </Link>
          ) : null}
        </div>
        <ul className="flex flex-col gap-y-2">
          {membersData.slice(0, 5).map((member) => (
            <li
              key={member.name}
              className="flex flex-row items-center justify-between"
            >
              <span>{member.name}</span>
              <span className="capitalize">{member.role}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
