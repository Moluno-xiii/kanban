import { Link } from "@tanstack/react-router";
import { IoMdArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import { useProjectModalContext } from "../contexts/ProjectModalContext";
import { RootState } from "../store";
import {
  dateToString,
  Project as ProjectTypes,
} from "../utils/helperFunctions";
import AddTodoForm from "./forms/AddTodoForm";
import Modal from "./ui/Modal";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteUserProject } from "../utils/project";

interface ProjectProps {
  project: ProjectTypes;
  handleModal: (state: boolean, projectId?: string | null) => void;
}
const Project: React.FC<ProjectProps> = ({ project, handleModal }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    activeProjectModalId,
    isDeleteProjectModalOpen,
    isTodoModalOpen,
    handleProjectModal,
    setActiveProjectModalId,
    setIsDeleteProjectModalOpen,
  } = useProjectModalContext();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteUserProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-projects", user?.id] });
      setIsDeleteProjectModalOpen(false);
      setActiveProjectModalId("");
      toast.success("Project deleted successfully!");
    },
    onError: (err: { message: string }) => {
      const message =
        err instanceof Error ? err.message : "An unexpected error occured";
      toast.error(message);
    },
  });

  const handleDeleteProject = (projectId: string) => {
    setIsDeleteProjectModalOpen(true);
    setActiveProjectModalId(projectId);
    mutation.mutate(projectId);
  };

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
          Project description :{" "}
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

      {isDeleteProjectModalOpen ? (
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
              {mutation.isPending ? "Deleting Project..." : "Yes"}
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
      ) : null}
    </>
  );
};

export default Project;
