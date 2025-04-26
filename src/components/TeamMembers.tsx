import { useModalContext } from "../contexts/ModalContext";
import useGetTeamMembers from "../hooks/useGetTeamMembers";
import useGetUserOrganizationRole from "../hooks/useGetUserOrganizationRole";
import { Member, TeamType } from "../utils/helperFunctions";
import AddTeamMemberModal from "./modals/AddTeamMemberModal";
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
  const { data: userRole } = useGetUserOrganizationRole(team.organization_id);
  const user_role = userRole ? userRole[0].role.toLowerCase() : null;
  const { activeModal, handleActiveModal } = useModalContext();
  console.log(members);
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
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-row items-center justify-between">
        <span className="text-secondary text-lg sm:text-xl">
          Team members ({members.length})
        </span>
        <button
          onClick={() => handleActiveModal("add team member")}
          className="btn"
        >
          Add member
        </button>
      </div>
      <ul className="border-secondary flex flex-col gap-y-2 rounded-md border p-2">
        {members.map((member: Member) => (
          <li
            key={member.member_id}
            className="flex flex-row items-center justify-between"
          >
            <span>{member.member_email}</span>
            <span>{member.role}</span>
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
