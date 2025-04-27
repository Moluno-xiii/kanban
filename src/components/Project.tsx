import { Link } from "@tanstack/react-router";
import { IoMdArrowForward } from "react-icons/io";
import { useModalContext } from "../contexts/ModalContext";
import {
  dateToString,
  Project as ProjectTypes,
} from "../utils/helperFunctions";
import DeleteProjectModal from "./modals/DeleteProjectModal";
import AddTodoForm from "./forms/AddTodoForm";
import Modal from "./ui/Modal";

interface ProjectProps {
  project: ProjectTypes;
}
const Project: React.FC<ProjectProps> = ({ project }) => {
  const {
    activeModal,
    activeProjectModalId,
    handleActiveModal,
    handleProjectModal,
  } = useModalContext();

  return (
    <>
      <li
        key={project.project_id}
        className="bg-background border-secondary mx-auto flex w-full max-w-md flex-col gap-y-3 rounded-lg border-2 p-2 drop-shadow-xl"
      >
        <div className="flex flex-row items-center justify-between gap-2">
          <span
            className="max-w-[64%] text-lg uppercase"
            aria-label="Project name"
          >
            {project.project_name}
          </span>
          <Link
            to="/dashboard/personal_projects/$project_id"
            params={{ project_id: String(project.project_id) }}
            search={{ type: "unfinished" }}
            className="text-secondary flex flex-row items-center gap-x-1 hover:underline"
            aria-label="View project details"
            preload="render"
          >
            View details
            <IoMdArrowForward />
          </Link>
        </div>
        <span aria-label="project ID" className="block">
          Description :{" "}
          {project.description.split(" ").slice(0, 6).join(" ") + "..."}
        </span>
        <span aria-label="Project's date added">
          Date Added : {dateToString(project.created_at)}
        </span>
        <div className="z-20 flex items-center justify-end gap-x-2">
          <button
            aria-label="delete project button"
            className="btn-error"
            onClick={() => {
              handleActiveModal("delete project");
              handleProjectModal(project.project_id);
            }}
          >
            Delete Project
          </button>
          <button
            aria-label="Add todo button"
            className="btn"
            onClick={() => handleActiveModal("add todo")}
          >
            Add todo
          </button>
        </div>
      </li>

      {activeModal === "add todo" ? (
        <Modal title="Add Todo" handleClose={() => handleActiveModal(null)}>
          <AddTodoForm
            handleModal={handleActiveModal}
            projectId={project.project_id}
          />
        </Modal>
      ) : null}

      {activeModal === "delete project" &&
      activeProjectModalId === project.project_id ? (
        <DeleteProjectModal nested={false} />
      ) : null}
    </>
  );
};

export default Project;
