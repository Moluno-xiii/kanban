import { createFileRoute, Link } from "@tanstack/react-router";
import GoBack from "../../../../components/ui/GoBack";
import { organizationsData } from "..";
import { useState } from "react";
import Modal from "../../../../components/ui/Modal";
import AddMemberForm from "../../../../components/forms/AddMemberForm";

export const Route = createFileRoute(
  "/dashboard/organizations/$organization_id/",
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
  const data = organizationsData[Number(organization_id) - 1];
  const [addMemberModal, setAddMemberModal] = useState(false);

  const handleAddMemberModal = (state: boolean) => {
    setAddMemberModal(state);
  };

  if (
    Number(organization_id) < 1 ||
    Number(organization_id) > organizationsData.length
  )
    return (
      <div>
        <GoBack route={"/dashboard/organizations"} />
        Data not found.
      </div>
    );
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-row items-center justify-between">
        <GoBack route={"/dashboard/organizations"} />
      </div>
      <div className="flex flex-row items-center justify-between gap-3">
        <span className="text-xl capitalize md:text-2xl">{data.title}</span>
        <button className="btn" onClick={() => handleAddMemberModal(true)}>
          Add Members
        </button>

        {addMemberModal ? (
          <Modal
            handleClose={() => handleAddMemberModal(false)}
            title="Add Member Form"
          >
            <AddMemberForm handleModal={() => handleAddMemberModal(false)} />
          </Modal>
        ) : null}
      </div>
      <span>Admin : {data.createdBy}</span>
      <div className="border-primary flex flex-col gap-y-2 rounded-md border p-2 shadow-sm">
        <div className="flex flex-row items-center justify-between gap-3">
          <span className="text-xl md:text-2xl">Members</span>
          {membersData.length > 5 ? (
            <Link
              className="text-primary hover:text-primary/70 transition-all duration-300 hover:underline"
              params={{ organization_id: data.id }}
              to="/dashboard/organizations/$organization_id/members"
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
