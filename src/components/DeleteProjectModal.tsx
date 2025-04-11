import { useProjectModalContext } from "../contexts/ProjectModalContext";
import useDeleteProject from "../hooks/useDeleteProject";
import Modal from "./ui/Modal";

interface DeleteProjectModalTypes {
  nested: boolean;
}
const DeleteProjectModal: React.FC<DeleteProjectModalTypes> = ({ nested }) => {
  const deleteProjectMutation = useDeleteProject({ nested });
  const {
    activeProjectModalId,
    setActiveProjectModalId,
    setIsDeleteProjectModalOpen,
  } = useProjectModalContext();

  const handleDeleteProject = (projectId: string) => {
    setIsDeleteProjectModalOpen(true);
    setActiveProjectModalId(projectId);
    deleteProjectMutation.mutate(projectId);
  };

  return (
    <Modal
      title="Are you sure you want to Delete this project??"
      handleClose={() => setIsDeleteProjectModalOpen(false)}
    >
      <div className="flex flex-row items-center justify-end gap-x-2">
        <button
          aria-label="Yes, i want to delete project button"
          className="btn-error"
          onClick={() => {
            if (activeProjectModalId) {
              handleDeleteProject(activeProjectModalId);
            }
          }}
        >
          {deleteProjectMutation.isPending ? "Deleting Project..." : "Yes"}
        </button>
        <button
          aria-label="No, i don't want to delete project button"
          className="btn"
          onClick={() => setIsDeleteProjectModalOpen(false)}
        >
          No
        </button>
      </div>
    </Modal>
  );
};

export default DeleteProjectModal;
