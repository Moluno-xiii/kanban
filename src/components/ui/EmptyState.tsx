import AddProjectForm from "../AddProjectForm";
import Modal from "./Modal";

interface EmptyStateProps {
  handleModal: (state: boolean) => void;
  isModalOpen: boolean;
}
const EmptyState: React.FC<EmptyStateProps> = ({
  handleModal,
  isModalOpen,
}) => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-y-4">
      <p className="text-2xl">
        You have no projects yet, projects you create will appear here
      </p>
      <button
        aria-label="add project button"
        onClick={() => handleModal(true)}
        className="btn"
      >
        Add a project
      </button>
      {isModalOpen && (
        <Modal handleClose={() => handleModal(false)} title="Add Project Form">
          <AddProjectForm handleModal={handleModal} />
        </Modal>
      )}
    </div>
  );
};

export default EmptyState;
