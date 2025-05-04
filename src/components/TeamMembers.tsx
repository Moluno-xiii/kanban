import { Link } from "@tanstack/react-router";
import { FaArrowRight } from "react-icons/fa6";
import { useModalContext } from "../contexts/ModalContext";
import useGetTeamMemberRole from "../hooks/useGetTeamMemberRole";
import useGetTeamMembers from "../hooks/useGetTeamMembers";
import { TeamMember, TeamType } from "../utils/helperFunctions";
import AddTeamMemberModal from "./modals/AddTeamMemberModal";
import DeleteTeamMemberModal from "./modals/DeleteTeamMemberModal";
import EmptyState from "./ui/EmptyState";
import Error from "./ui/Error";
import Loading from "./ui/Loading";
import { useSelector } from "react-redux";
import { RootState } from "../store";

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
  const { data: userRole, isPending: isLoadingUserRole } = useGetTeamMemberRole(
    team.id,
  );
  const { user } = useSelector((state: RootState) => state.auth);
  if (isPending || isLoadingUserRole)
    return <Loading message="Loading organization members" />;

  if (error) {
    return (
      <Error errorMessage={error.message || "An unexpected error occured."} />
    );
  }
  if (!members || members.length < 1)
    return (
      <>
        {userRole?.role.toLowerCase() === "member" ? (
          <span className="text-secondary text-center text-xl sm:text-2xl">
            No team members yet. Team members will appear here.
          </span>
        ) : (
          <EmptyState
            button={true}
            handleClick={() => {
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
        {userRole?.role.toLowerCase() !== "member" ? (
          <button
            aria-label="add member button"
            onClick={() => handleActiveModal("add team member")}
            className="btn"
          >
            Add member
          </button>
        ) : null}
      </div>
      <ul className="border-secondary flex flex-col gap-y-2 rounded-md border p-2">
        {members.map((member: TeamMember) => (
          <li
            key={member.member_id}
            className="border-b-secondary flex flex-col justify-between gap-2 border-b py-2 sm:flex-row sm:items-center"
          >
            <div className="flex flex-1 flex-col gap-y-1">
              <span aria-label="member email">{member.member_email}</span>
              <span aria-label="member role" className="capitalize">
                {member.member_id === member.admin_id
                  ? "Team creator"
                  : member.role}
              </span>
            </div>
            <div className="mt-2 flex flex-row items-center justify-between gap-4">
              {member.member_id !== member.super_admin_id &&
              member.member_id !== member.admin_id &&
              (user?.id === member.admin_id ||
                user?.id === member.super_admin_id ||
                userRole?.role === "admin") ? (
                <button
                  aria-label="delete team member"
                  onClick={() => {
                    handleActiveTeamMember(member.member_id);
                    handleActiveModal("delete team member");
                  }}
                  className="btn-error self-end"
                >
                  Delete member
                </button>
              ) : null}
              {/* {member.role.toLowerCase() === "member" &&
              userRole?.role.toLowerCase() !== "member" ? (
                <button
                  aria-label="delete team member"
                  onClick={() => {
                    handleActiveTeamMember(member.member_id);
                    handleActiveModal("delete team member");
                  }}
                  className="btn-error self-end"
                >
                  Delete member
                </button>
              ) : null} */}
              <Link
                to="/dashboard/organizations/teams/$team_id/$member_id"
                className="text-secondary flex flex-row items-center gap-x-2 self-start hover:underline"
                params={{ team_id: team.id, member_id: member.member_id }}
                aria-label="view team member button"
              >
                View member
                <FaArrowRight size={15} />
              </Link>
            </div>
            {activeModal === "delete team member" &&
            activeTeamMember === member.member_id ? (
              <DeleteTeamMemberModal
                member={member}
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
