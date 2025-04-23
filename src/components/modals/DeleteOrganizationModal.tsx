import useDeleteUserOrganization from "../../hooks/useDeleteUserOrganization";
import Modal from "../ui/Modal";

interface PropTypes {
  closeModal: () => void;
  organization_id: string;
  organization_name: string;
}

const DeleteOrganizationModal: React.FC<PropTypes> = ({
  closeModal,
  organization_id,
  organization_name,
}) => {
  const deleteOrganizationMutation = useDeleteUserOrganization({
    organization_id,
    organization_name,
    handleCloseModal: () => closeModal(),
  });
  return (
    <Modal
      title="Are you sure you want to Delete this organization??"
      handleClose={() => closeModal()}
    >
      <div className="flex flex-row items-center justify-end gap-x-2">
        <button
          aria-label="Yes, i want to delete organization button"
          className="btn-error"
          onClick={() => deleteOrganizationMutation.mutate()}
        >
          {deleteOrganizationMutation.isPending
            ? "Deleting Organization..."
            : "Yes"}
        </button>
        <button
          aria-label="No, i don't want to delete organization button"
          className="btn"
          onClick={() => closeModal()}
        >
          No
        </button>
      </div>
    </Modal>
  );
};

export default DeleteOrganizationModal;
