import useDeleteMemberFromOrganization from "../../hooks/useDeleteMemberFromOrganization";
import { Member } from "../../utils/helperFunctions";
import Modal from "../ui/Modal";

interface PropTypes {
  member: Member;
  closeModal: () => void;
}

const DeleteMemberModal: React.FC<PropTypes> = ({ member, closeModal }) => {
  const deleteMemberMutation = useDeleteMemberFromOrganization(member);
  return (
    <Modal
      title="Are you sure you want to Delete this member??"
      handleClose={() => closeModal()}
    >
      <div className="flex flex-row items-center justify-end gap-x-2">
        <button
          aria-label="Yes, i want to delete member button"
          className="btn-error"
          onClick={() => deleteMemberMutation.mutate()}
        >
          {deleteMemberMutation.isPending ? "Deleting Organization..." : "Yes"}
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

export default DeleteMemberModal;
