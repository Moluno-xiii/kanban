import { createContext, PropsWithChildren, useContext, useState } from "react";

type ActiveModal =
  | "add project"
  | "add todo"
  | "delete project"
  | "delete todo"
  | "add organization"
  | "add organization member"
  | "create team"
  | "add team"
  | "leave organization"
  | "delete organization"
  | "logout"
  | "delete notification"
  | "delete all notifications"
  | "delete organization member";

interface ModalTypes {
  activeModal: ActiveModal | null;
  activeTodoModalId: string | null;
  activeProjectModalId: string | null;
  handleActiveModal: (modalName: ActiveModal | null) => void;
  handleProjectModal: (projectId: string) => void;
  handleTodoModal: (todoId: string) => void;
}

const ModalContext = createContext<ModalTypes>({
  activeModal: null,
  activeTodoModalId: "",
  activeProjectModalId: "",
  handleActiveModal: () => {},
  handleProjectModal: () => {},
  handleTodoModal: () => {},
});

const ModalContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<ActiveModal | null>(null);
  const [activeProjectModalId, setActiveProjectModalId] = useState<
    string | null
  >("");
  const [activeTodoModalId, setActiveTodoModalId] = useState<string | null>("");

  const handleActiveModal = (state: ActiveModal | null) => {
    setActiveModal(state);
  };

  const handleTodoModal = (todoId: string) => {
    setActiveTodoModalId(todoId);
  };

  const handleProjectModal = (projectId: string) => {
    setActiveProjectModalId(projectId);
  };

  return (
    <ModalContext.Provider
      value={{
        activeModal,
        activeTodoModalId,
        activeProjectModalId,
        handleActiveModal,
        handleProjectModal,
        handleTodoModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContextProvider, useModalContext };

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("ModalContext was used outside of it's scope.");
  return context;
};
