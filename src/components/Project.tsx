import { Link } from "@tanstack/react-router";
import { IoMdArrowForward } from "react-icons/io";
import { useProjectModalContext } from "../contexts/ProjectModalContext";
import {
  dateToString,
  Project as ProjectTypes,
} from "../utils/helperFunctions";
import DeleteProjectModal from "./DeleteProjectModal";
import AddTodoForm from "./forms/AddTodoForm";
import Modal from "./ui/Modal";

interface ProjectProps {
  project: ProjectTypes;
  handleModal: (state: boolean, projectId?: string | null) => void;
}
const Project: React.FC<ProjectProps> = ({ project, handleModal }) => {
  const {
    activeProjectModalId,
    isDeleteProjectModalOpen,
    isTodoModalOpen,
    handleProjectModal,
    setIsDeleteProjectModalOpen,
  } = useProjectModalContext();

  return (
    <>
      <li
        key={project.project_id}
        className="bg-background border-secondary mx-auto flex w-full max-w-md flex-col gap-y-3 rounded-lg border-2 p-2 drop-shadow-xl"
      >
        <div className="flex flex-row items-center justify-between">
          <span className="text-lg uppercase" aria-label="Project name">
            {project.project_name}
          </span>
          <Link
            to="/dashboard/personal_projects/$project_id"
            params={{ project_id: String(project.project_id) }}
            className="text-text flex flex-row items-center gap-x-1 hover:underline"
            aria-label="View project details"
          >
            View details
            <IoMdArrowForward />
          </Link>
        </div>
        <span aria-label="project ID" className="block">
          Description :{" "}
          {project.description.split(" ").slice(0, 5).join(" ") + "..."}
        </span>
        <span aria-label="Project's date added">
          Date Added : {dateToString(project.created_at)}
        </span>
        <div className="z-20 flex items-center justify-end gap-x-2">
          <button
            aria-label="delete project button"
            className="btn-error"
            onClick={() => {
              handleProjectModal(false, project.project_id);
              setIsDeleteProjectModalOpen(true);
            }}
          >
            Delete Project
          </button>
          <button
            aria-label="Add todo button"
            className="btn"
            onClick={() => handleModal(true, project.project_id)}
          >
            Add todo
          </button>
        </div>
      </li>

      {isTodoModalOpen && activeProjectModalId === project.project_id ? (
        <Modal title="Add Todo" handleClose={() => handleModal(false, null)}>
          <AddTodoForm
            handleModal={handleModal}
            projectId={project.project_id}
          />
        </Modal>
      ) : null}

      {isDeleteProjectModalOpen ? <DeleteProjectModal nested={false} /> : null}
    </>
  );
};

export default Project;
