import { Link } from "@tanstack/react-router";
import { IoMdArrowForward } from "react-icons/io";
import { Project as ProjectTypes } from "../utils/helperFunctions";
import AddTodoForm from "./AddTodoForm";
import Modal from "./ui/Modal";

interface ProjectProps {
  project: ProjectTypes;
  handleModal: (state: boolean, projectId?: string | null) => void;
  isModalOpen: boolean;
  modalProjectId: string | null;
}
const Project: React.FC<ProjectProps> = ({
  project,
  handleModal,
  isModalOpen,
  modalProjectId,
}) => {
  return (
    <>
      <li
        key={project.projectId}
        className="bg-background border-secondary mx-auto flex w-full max-w-md flex-col gap-y-3 rounded-lg border-2 p-2 drop-shadow-xl"
      >
        <div className="flex flex-row items-center justify-between">
          <span className="text-lg uppercase" aria-label="Project name">
            {project.projectName}
          </span>
          <Link
            to="/dashboard/personal_projects/$project_id"
            params={{ project_id: String(project.projectId) }}
            className="text-text flex flex-row items-center gap-x-1 hover:underline"
            aria-label="View project details"
          >
            View details
            <IoMdArrowForward />
          </Link>
        </div>
        <span aria-label="project ID" className="block text-lg uppercase">
          {project.projectId}
        </span>
        <div aria-label="Number of todos">
          Number of Todos : {project.todos?.length || 0}
        </div>
        <span aria-label="Project's date added">
          Date Added : {project.dateCreated}
        </span>
        <div className="z-20 flex items-center justify-end gap-x-2">
          <button aria-label="delete project button" className="btn-error">
            Delete Project
          </button>
          <button
            aria-label="Add todo button"
            className="btn"
            onClick={() => handleModal(true, project.projectId)}
          >
            Add todo
          </button>
        </div>
      </li>

      {isModalOpen && modalProjectId === project.projectId && (
        <Modal title="Add Todo" handleClose={() => handleModal(false, null)}>
          <AddTodoForm
            handleModal={handleModal}
            projectId={project.projectId}
          />
        </Modal>
      )}
    </>
  );
};

export default Project;
