import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ProjectModalTypes {
  isTodoModalOpen: boolean;
  isProjectModalOpen: boolean;
  activeProjectModalId: string | null;
  activeTodoModalId: string | null;
  handleProjectModal: (state: boolean, projectId?: string) => void;
  handleTodoModal: (state: boolean, todoId?: string) => void;
  isDeleteProjectModalOpen: boolean;
  isDeleteTodoModalOpen: boolean;
  setIsDeleteProjectModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsDeleteTodoModalOpen: Dispatch<SetStateAction<boolean>>;
  setActiveProjectModalId: Dispatch<SetStateAction<string | null>>;
}

const ProjectModalContext = createContext<ProjectModalTypes>({
  isProjectModalOpen: false,
  isTodoModalOpen: false,
  activeProjectModalId: "",
  activeTodoModalId: "",
  handleProjectModal: () => {},
  handleTodoModal: () => {},
  isDeleteProjectModalOpen: false,
  isDeleteTodoModalOpen: false,
  setIsDeleteProjectModalOpen: () => {},
  setIsDeleteTodoModalOpen: () => {},
  setActiveProjectModalId: () => {},
});

const ProjectModalContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [activeProjectModalId, setActiveProjectModalId] = useState<
    string | null
  >("");
  const [activeTodoModalId, setActiveTodoModalId] = useState<string | null>("");
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);
  const [isDeleteProjectModalOpen, setIsDeleteProjectModalOpen] =
    useState(false);
  const [isDeleteTodoModalOpen, setIsDeleteTodoModalOpen] = useState(false);

  const handleProjectModal = (state: boolean, projectId?: string) => {
    setIsProjectModalOpen(state);
    if (projectId) {
      setActiveProjectModalId(projectId);
    }
  };

  const handleTodoModal = (state: boolean, todoId?: string) => {
    setIsTodoModalOpen(state);
    if (todoId) {
      setActiveTodoModalId(todoId);
    }
  };

  return (
    <ProjectModalContext.Provider
      value={{
        activeProjectModalId,
        activeTodoModalId,
        isDeleteProjectModalOpen,
        isDeleteTodoModalOpen,
        isProjectModalOpen,
        isTodoModalOpen,
        handleProjectModal,
        handleTodoModal,
        setActiveProjectModalId,
        setIsDeleteProjectModalOpen,
        setIsDeleteTodoModalOpen,
      }}
    >
      {children}
    </ProjectModalContext.Provider>
  );
};

export { ProjectModalContextProvider, useProjectModalContext };

const useProjectModalContext = () => {
  const context = useContext(ProjectModalContext);
  if (!context)
    throw new Error("ProjectModalContext was used outside of it's scope.");
  return context;
};
