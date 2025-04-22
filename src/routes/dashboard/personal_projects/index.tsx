import { User } from "@supabase/supabase-js";
import { QueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import AddProjectForm from "../../../components/forms/AddProjectForm";
import Project from "../../../components/Project";
import EmptyState from "../../../components/ui/EmptyState";
import Loading from "../../../components/ui/Loading";
import Modal from "../../../components/ui/Modal";
import { useProjectModalContext } from "../../../contexts/ProjectModalContext";
import useAuthGuard from "../../../hooks/useAuthGuard";
import useUserProjects from "../../../hooks/useUserProjects";
import { AppDispatch } from "../../../store";
import { Project as ProjectTypes } from "../../../utils/helperFunctions";
import { getUserProjects } from "../../../utils/project";

export const Route = createFileRoute("/dashboard/personal_projects/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const { queryClient, store } = context as {
      queryClient: QueryClient;
      store: {
        getState: () => { auth: { user: User } };
        dispatch: AppDispatch;
      };
    };
    const user = store.getState().auth.user;
    return await queryClient.ensureQueryData({
      queryKey: ["user-projects", user?.id],
      queryFn: () => getUserProjects(user?.id),
    });
  },
  pendingComponent: () => Loading({ message: "Loading user Projects" }),
});

function RouteComponent() {
  const { isProjectModalOpen, handleProjectModal, handleTodoModal } =
    useProjectModalContext();
  const { user } = useAuthGuard();
  const {
    isPending,
    error,
    data: projects,
  } = useUserProjects(user?.id as string);
  function handleTodoModalState(state: boolean, projectId?: string | null) {
    handleTodoModal(state);
    if (projectId) {
      handleProjectModal(false, projectId);
    }
  }
  if (isPending) return <span>Loading projects...</span>;
  if (error) return <span>An error occured</span>;
  if (!projects || projects?.length < 1)
    return (
      <EmptyState
        handleClick={handleProjectModal}
        button={true}
        buttonText="Add project"
        emptyStateText="  You have no projects yet, projects you create will appear here."
      >
        {isProjectModalOpen && (
          <Modal
            handleClose={() => handleProjectModal(false)}
            title="Add Project Form"
          >
            <AddProjectForm handleModal={handleProjectModal} />
          </Modal>
        )}
      </EmptyState>
    );

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-row items-center justify-between gap-3">
        <p className="text-xl md:text-2xl">My Projects ({projects.length})</p>
        <button
          aria-label="add project button"
          className="btn"
          onClick={() => handleProjectModal(true)}
        >
          Add Projects
        </button>
      </div>
      {isProjectModalOpen && (
        <Modal
          handleClose={() => handleProjectModal(false)}
          title="Add Project Form"
        >
          <AddProjectForm handleModal={handleProjectModal} />
        </Modal>
      )}

      <ul
        className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
        aria-label="projects list"
      >
        {projects.map((project: ProjectTypes) => (
          <Project
            key={project.project_id}
            project={project}
            handleModal={handleTodoModalState}
          />
        ))}
      </ul>
    </div>
  );
}
