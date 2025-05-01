import { createFileRoute } from "@tanstack/react-router";
import AddProjectForm from "../../../components/forms/AddProjectForm";
import Project from "../../../components/Project";
import EmptyState from "../../../components/ui/EmptyState";
import Loading from "../../../components/ui/Loading";
import Error from "../../../components/ui/Error";
import Modal from "../../../components/ui/Modal";
import { useModalContext } from "../../../contexts/ModalContext";
import useAuthGuard from "../../../hooks/useAuthGuard";
import useUserProjects from "../../../hooks/useUserProjects";
import { Project as ProjectTypes } from "../../../utils/helperFunctions";

export const Route = createFileRoute("/dashboard/personal_projects/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { activeModal, handleActiveModal } = useModalContext();
  const { user } = useAuthGuard();
  const {
    isPending,
    error,
    data: projects,
  } = useUserProjects(user?.id as string);

  if (isPending) return <Loading message={"Loading projects"} />;
  if (error) return <Error errorMessage={error.message} />;
  if (!projects || projects?.length < 1)
    return (
      <EmptyState
        handleClick={() => handleActiveModal("add project")}
        button={true}
        buttonText="Add project"
        emptyStateText="  You have no projects yet, projects you create will appear here."
      >
        {activeModal === "add project" ? (
          <Modal
            handleClose={() => handleActiveModal(null)}
            title="Add Project Form"
          >
            <AddProjectForm handleModal={handleActiveModal} />
          </Modal>
        ) : null}
      </EmptyState>
    );

  return (
    <div className="flex min-w-[300px] flex-col gap-y-6">
      <div className="flex flex-row items-center justify-between gap-3">
        <p className="text-xl md:text-2xl">My Projects ({projects.length})</p>
        <button
          aria-label="add project button"
          className="btn"
          onClick={() => handleActiveModal("add project")}
        >
          Add Project
        </button>
      </div>
      {activeModal === "add project" ? (
        <Modal
          handleClose={() => handleActiveModal(null)}
          title="Add Project Form"
        >
          <AddProjectForm handleModal={handleActiveModal} />
        </Modal>
      ) : null}

      <ul
        className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
        aria-label="projects list"
      >
        {projects.map((project: ProjectTypes) => (
          <Project key={project.project_id} project={project} />
        ))}
      </ul>
    </div>
  );
}
