import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import { useState } from "react";
import AddProjectForm from "../../../components/AddProjectForm";
import Project from "../../../components/Project";
import EmptyState from "../../../components/ui/EmptyState";
import Loading from "../../../components/ui/Loading";
import Modal from "../../../components/ui/Modal";
import {
  loadProjects,
  Project as ProjectTypes,
} from "../../../utils/helperFunctions";

export const Route = createFileRoute("/dashboard/personal_projects/")({
  component: RouteComponent,
  loader: async () => await loadProjects(),
  pendingComponent: () => Loading({ message: "Loading Projects" }),
});

function RouteComponent() {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);
  const [modalProjectId, setModalProjectId] = useState<string | null>(null);
  const routeApi = getRouteApi("/dashboard/personal_projects/");
  const projects = routeApi.useLoaderData();

  function handleProjectModalState(state: boolean) {
    setIsProjectModalOpen(state);
  }

  function handleTodoModalState(state: boolean, projectId?: string | null) {
    setIsTodoModalOpen(state);
    if (projectId) {
      setModalProjectId(projectId);
    }
  }

  if (projects.length < 1)
    return (
      <EmptyState
        handleModal={handleProjectModalState}
        isModalOpen={isProjectModalOpen}
      />
    );

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-row items-center justify-between gap-3">
        <p className="text-xl md:text-2xl">My Projects ({projects.length})</p>
        <button
          aria-label="add project button"
          className="btn"
          onClick={() => handleProjectModalState(true)}
        >
          Add Projects
        </button>
      </div>
      {isProjectModalOpen && (
        <Modal
          handleClose={() => handleProjectModalState(false)}
          title="Add Project Form"
        >
          <AddProjectForm handleModal={handleProjectModalState} />
        </Modal>
      )}

      <ul
        className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
        aria-label="projects list"
      >
        {projects.map((project: ProjectTypes) => (
          <Project
            key={project.projectId}
            project={project}
            handleModal={handleTodoModalState}
            isModalOpen={isTodoModalOpen}
            modalProjectId={modalProjectId}
          />
        ))}
      </ul>
    </div>
  );
}
