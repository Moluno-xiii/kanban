import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import AddMemberForm from "../../../../../components/forms/AddMemberForm";
import Error from "../../../../../components/ui/Error";
import GoBack from "../../../../../components/ui/GoBack";
import Loading from "../../../../../components/ui/Loading";
import Modal from "../../../../../components/ui/Modal";
import useGetAdminOrganization from "../../../../../hooks/useGetAdminOrganization";
import useGetOrganizationMembers from "../../../../../hooks/useGetOrganizationMembers";
import { RootState } from "../../../../../store";
import { dateToString, Member } from "../../../../../utils/helperFunctions";

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
    isError,
  } = useGetAdminOrganization(organization_id);
  const [addMemberModal, setAddMemberModal] = useState(false);

  const handleAddMemberModal = (state: boolean) => {
    setAddMemberModal(state);
  };

  const {
    data: members,
    isPending: isFetchingMembers,
    error,
  } = useGetOrganizationMembers(organization_id);

  if (isFetchingMembers)
    return <Loading message="Loading organization members" />;

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

  if (error)
    return (
      <Error
        errorMessage={
          error.message ||
          "An unexpected error occured, reload the page and try again"
        }
      />
    );

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
      {members.length >= 1 ? (
        <div className="border-secondary mt-4 flex flex-col gap-y-2 rounded-md border p-2 shadow-sm">
          <div className="flex flex-row items-center justify-between gap-3">
            <span className="text-xl md:text-2xl">Members</span>
            {members.length > 5 ? (
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
            {members.slice(0, 5).map((member: Member) => (
              <li
                key={member.member_id}
                className="flex flex-col justify-between sm:flex-row sm:items-center"
              >
                <span>{member.member_email}</span>
                <div className="flex flex-row items-center gap-x-2">
                  <span className="capitalize">{member.role}</span>
                  <Link
                    to="/dashboard/organizations/my_organizations/$organization_id/members/$member_id"
                    params={{ member_id: member.member_id, organization_id }}
                    className="hover:text-secondary/70 text-secondary flex cursor-pointer flex-row items-center gap-x-2 transition-all duration-200"
                  >
                    View member
                    <FaArrowRight size={15} />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <span className="text-center text-lg sm:text-xl">No members yet</span>
      )}
    </div>
  );
}
