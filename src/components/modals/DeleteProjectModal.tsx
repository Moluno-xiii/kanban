import { useModalContext } from "../../contexts/ModalContext";
import useDeleteProject from "../../hooks/useDeleteProject";
import Modal from "../ui/Modal";

interface DeleteProjectModalTypes {
  nested: boolean;
}
const DeleteProjectModal: React.FC<DeleteProjectModalTypes> = ({ nested }) => {
  const deleteProjectMutation = useDeleteProject({ nested });
  const { activeProjectModalId, handleActiveModal } = useModalContext();

  const handleDeleteProject = () => {
    if (activeProjectModalId) {
      deleteProjectMutation.mutate(activeProjectModalId);
    }
  };
  return (
    <Modal
      title="Are you sure you want to Delete this project??"
      handleClose={() => handleActiveModal(null)}
    >
      <div className="flex flex-row items-center justify-end gap-x-2">
        <button
          aria-label="Yes, i want to delete project button"
          className="btn-error"
          onClick={handleDeleteProject}
        >
          {deleteProjectMutation.isPending ? "Deleting Project..." : "Yes"}
        </button>
        <button
          aria-label="No, i don't want to delete project button"
          className="btn"
          onClick={() => handleActiveModal(null)}
        >
          No
        </button>
      </div>
    </Modal>
  );
};

export default DeleteProjectModal;
