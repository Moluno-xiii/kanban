import React from "react";
import { useModalContext } from "../../contexts/ModalContext";
import useGetOrganizationMembers from "../../hooks/useGetOrganizationMembers";
import { Member, TeamType } from "../../utils/helperFunctions";
import Modal from "../ui/Modal";
import Error from "../ui/Error";
import useAddMemberToTeam from "../../hooks/useAddMemberToTeam";
import useAuthGuard from "../../hooks/useAuthGuard";

interface PropTypes {
  team: TeamType;
}

const AddTeamMemberModal: React.FC<PropTypes> = ({ team }) => {
  const { handleActiveModal } = useModalContext();
  const { user } = useAuthGuard();
  const {
    data: organizationMembers,
    isPending,
    error,
  } = useGetOrganizationMembers(
    team.organization_id,
    undefined,
    user?.id as string,
    team.super_admin_id,
  );
  const addTeamMemberMutation = useAddMemberToTeam(
    team.id,
    team.organization_id,
  );

  if (error) return <Error errorMessage={error.message} />;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const dataObject = Object.fromEntries(formData);
    const selectedMember = JSON.parse(dataObject.memberEmail as string);
    const finalObject = {
      member_id: selectedMember.id,
      member_email: selectedMember.email,
      organization_id: team.organization_id,
      team_id: team.id,
      super_admin_id: team.super_admin_id,
      team_name: team.name,
      role: "Member",
      admin_id: team.admin_id,
    };
    addTeamMemberMutation.mutate(finalObject);
  };

  return (
    <Modal handleClose={() => handleActiveModal(null)} title="Add Team member">
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-y-2"
      >
        {!organizationMembers?.length && !isPending ? (
          <span className="mx-auto max-w-md text-center text-lg sm:text-xl lg:max-w-lg">
            You have no members in your organization, add new members to your
            organization to continue.
            <br />
            Admins and Super Admins do not count as members.
          </span>
        ) : (
          <div className="flex flex-col gap-y-1">
            <label htmlFor="memberEmail">Select member email to add</label>
            {isPending ? (
              <span className="text-secondary text-center text-lg sm:text-xl">
                Loading members...
              </span>
            ) : (
              <select
                className="border-secondary min-w-sm cursor-pointer rounded-md border p-2"
                required
                name="memberEmail"
                id=""
              >
                {organizationMembers?.map((member: Member) => (
                  <option
                    value={JSON.stringify({
                      email: member.member_email,
                      id: member.member_id,
                    })}
                    key={member.member_id}
                  >
                    {member.member_email}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}
        {organizationMembers?.length ? (
          <button className="btn self-end" type="submit">
            {addTeamMemberMutation.isPending
              ? "Adding member..."
              : "Add member"}
          </button>
        ) : null}
      </form>
    </Modal>
  );
};

export default AddTeamMemberModal;
