import useDeleteTeamMember from "../../hooks/useDeleteTeamMember";
import { Member, TeamType } from "../../utils/helperFunctions";
import Modal from "../ui/Modal";

interface PropTypes {
  member: Member;
  closeModal: () => void;
  team: TeamType;
}

const DeleteTeamMemberModal: React.FC<PropTypes> = ({
  member,
  closeModal,
  team,
}) => {
  const deleteMemberMutation = useDeleteTeamMember(team.id, team.name);

  return (
    <Modal
      title={`Are you sure you want to Delete ${member.member_email} from this organization?`}
      handleClose={() => closeModal()}
    >
      <div className="flex flex-row items-center justify-end gap-x-2">
        <button
          aria-label="Yes, i want to delete member button"
          className="btn-error"
          onClick={() =>
            deleteMemberMutation.mutate({
              member_id: member.member_id,
              member_email: member.member_email,
            })
          }
        >
          {deleteMemberMutation.isPending
            ? "Deleting Member from team..."
            : "Yes"}
        </button>
        <button
          aria-label="No, i don't want to delete member button"
          className="btn"
          onClick={() => closeModal()}
        >
          No
        </button>
      </div>
    </Modal>
  );
};

export default DeleteTeamMemberModal;
