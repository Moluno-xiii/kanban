import useDeleteTeam from "../../hooks/useDeleteTeam";
import { TeamType } from "../../utils/helperFunctions";
import Modal from "../ui/Modal";

interface Props {
  team: TeamType;
  handleClose: () => void;
}

const DeleteTeamModal: React.FC<Props> = ({ team, handleClose }) => {
  const deleteTeamMutation = useDeleteTeam(
    team.id,
    team.organization_id,
    team.name,
    handleClose,
  );
  return (
    <Modal
      title={`Are you sure you want to delete this team (${team.name})? Deleting it will delete all tasks (finished, and unfinished).`}
      handleClose={handleClose}
    >
      <div className="flex flex-row items-center justify-between gap-x-5">
        <button
          aria-label="Yes, i want to delete this team"
          className="btn-error"
          onClick={() => deleteTeamMutation.mutate()}
        >
          {deleteTeamMutation.isPending ? "Deleting team..." : "Yes"}
        </button>
        <button
          aria-label="No, i don't want to delete this team"
          className="btn"
        >
          No
        </button>
      </div>
    </Modal>
  );
};

export default DeleteTeamModal;
