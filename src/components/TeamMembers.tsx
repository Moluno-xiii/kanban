import { useModalContext } from "../contexts/ModalContext";
import useGetTeamMemberRole from "../hooks/useGetTeamMemberRole";
import useGetTeamMembers from "../hooks/useGetTeamMembers";
import { Member, TeamType } from "../utils/helperFunctions";
import AddTeamMemberModal from "./modals/AddTeamMemberModal";
import DeleteTeamMemberModal from "./modals/DeleteTeamMemberModal";
import EmptyState from "./ui/EmptyState";
import Error from "./ui/Error";
import Loading from "./ui/Loading";

interface PropTypes {
  team: TeamType;
}

const TeamMembers: React.FC<PropTypes> = ({ team }) => {
  const {
    data: members,
    error,
    isPending,
  } = useGetTeamMembers(team.id, team.organization_id);
  const {
    activeModal,
    activeTeamMember,
    handleActiveModal,
    handleActiveTeamMember,
  } = useModalContext();
  // const { data: userRole } = useGetUserOrganizationRole(team.organization_id);
  const { data: userRole } = useGetTeamMemberRole(team.id);
  const user_role = userRole ? userRole.role.toLowerCase() : null;

  if (isPending) return <Loading message="Loading organization members" />;

  if (error) {
    return (
      <Error errorMessage={error.message || "An unexpected error occured."} />
    );
  }

  if (!members || members.length < 1)
    return (
      <>
        {user_role === "member" ? (
          <span className="text-secondary text-center text-xl sm:text-2xl">
            No team members yet. Team members will appear here.
          </span>
        ) : (
          <EmptyState
            button={true}
            handleClick={() => {
              console.log("i was clicked");
              handleActiveModal("add team member");
            }}
            emptyStateText=" No team members yet. Team members will appear here."
            buttonText="Add team member"
          >
            {activeModal === "add team member" ? (
              <AddTeamMemberModal team={team} />
            ) : null}
          </EmptyState>
        )}
      </>
    );
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex flex-row items-center justify-between">
        <span className="text-secondary text-lg sm:text-xl">
          Team members ({members.length})
        </span>
        {user_role !== "member" ? (
          <button
            onClick={() => handleActiveModal("add team member")}
            className="btn"
          >
            Add member
          </button>
        ) : null}
      </div>
      <ul className="border-secondary flex flex-col gap-y-2 rounded-md border p-2">
        {members.map((member: Member) => (
          <li
            key={member.member_id}
            className="border-b-secondary flex flex-col justify-between gap-2 border-b py-2 sm:flex-row sm:items-center"
          >
            <div className="flex flex-1 flex-row justify-between">
              <span>{member.member_email}</span>
              <span className="capitalize">{member.role}</span>
            </div>
            {member.role.toLowerCase() === "member" &&
            user_role !== "member" ? (
              <button
                onClick={() => {
                  handleActiveTeamMember(member.member_id);
                  handleActiveModal("delete team member");
                }}
                className="btn-error self-end"
              >
                Delete member
              </button>
            ) : null}
            {activeModal === "delete team member" &&
            activeTeamMember === member.member_id ? (
              <DeleteTeamMemberModal
                member={member}
                team={team}
                closeModal={() => handleActiveModal(null)}
              />
            ) : null}
          </li>
        ))}
      </ul>
      {activeModal === "add team member" ? (
        <AddTeamMemberModal team={team} />
      ) : null}
    </div>
  );
};

export default TeamMembers;
