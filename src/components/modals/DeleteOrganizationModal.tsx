import { Dispatch, SetStateAction } from "react";
import Modal from "../ui/Modal";
import useDeleteUserOrganization from "../../hooks/useDeleteUserOrganization";

interface PropTypes {
  setDeleteOrgModal: Dispatch<SetStateAction<boolean>>;
  organization_id: string;
  organization_name: string;
}

const DeleteOrganizationModal: React.FC<PropTypes> = ({
  setDeleteOrgModal,
  organization_id,
  organization_name,
}) => {
  const deleteOrganizationMutation = useDeleteUserOrganization({
    organization_id,
    organization_name,
    handleCloseModal: () => setDeleteOrgModal(false),
  });
  return (
    <Modal
      title="Are you sure you want to Delete this organization??"
      handleClose={() => setDeleteOrgModal(false)}
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
          onClick={() => setDeleteOrgModal(false)}
        >
          No
        </button>
      </div>
    </Modal>
  );
};

export default DeleteOrganizationModal;
