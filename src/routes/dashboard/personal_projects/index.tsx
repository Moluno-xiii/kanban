import { createFileRoute, getRouteApi, Link } from "@tanstack/react-router";
import { useState } from "react";
import Modal from "../../../components/ui/Modal";
import AddProjectForm from "../../../components/AddProjectForm";
import { loadProjects, Project } from "../../../utils/helperFunctions";
import { IoMdArrowForward } from "react-icons/io";

export const Route = createFileRoute("/dashboard/personal_projects/")({
  component: RouteComponent,
  loader: async () => await loadProjects(),
  pendingComponent: () => <span>Loading data...</span>,
});
function RouteComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const routeApi = getRouteApi("/dashboard/personal_projects/");
  const projects = routeApi.useLoaderData();
  function handleModalState(state: boolean) {
    setIsModalOpen(state);
    console.log(state);
  }
  if (projects.length < 1)
    return (
      <EmptyState handleModal={handleModalState} isModalOpen={isModalOpen} />
    );
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-row items-center justify-between gap-3">
        <p className="text-xl md:text-2xl">My Projects ({projects.length})</p>
        <button className="btn" onClick={() => handleModalState(true)}>
          Add Projects
        </button>
      </div>
      {isModalOpen && (
        <Modal
          handleClose={() => handleModalState(false)}
          title="Add Project Form"
        >
          <AddProjectForm handleModal={handleModalState} />
        </Modal>
      )}
      <ul className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {projects.map((project: Project) => (
          <li
            key={project.projectId}
            className="bg-background border-secondary mx-auto flex w-full max-w-md flex-col gap-y-3 rounded-lg border-2 p-2 drop-shadow-xl"
          >
            <div className="flex flex-row items-center justify-between">
              <span className="text-lg uppercase">{project.projectName}</span>
              <Link
                to="/dashboard/personal_projects/$project_id"
                params={{ project_id: String(project.projectId) }}
                className="text-text flex flex-row items-center gap-x-1 hover:underline"
              >
                View details
                <IoMdArrowForward />
              </Link>
            </div>
            <div>Todos</div>
            <div className="flex items-center justify-end gap-x-2">
              <button className="btn-error">Delete Project</button>
              <button className="btn">Add todo</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

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
      <button onClick={() => handleModal(true)} className="btn">
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
