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
  | "delete all read notifications"
  | "delete all unread notifications"
  | "delete all read invitations"
  | "delete all unread invitations"
  | "delete organization member"
  | "add team member"
  | "delete all organization invitations"
  | "delete team member"
  | "add team task"
  | "delete team task"
  | "update organization details"
  | "delete all read organization invitations";

interface ModalTypes {
  activeModal: ActiveModal | null;
  activeProjectModalId: string | null;
  activeTeamMember: string | null;
  activeTeamTask: string | null;
  activeTodoModalId: string | null;
  handleActiveModal: (modalName: ActiveModal | null) => void;
  handleActiveTeamMember: (member_id: string | null) => void;
  handleActiveTeamTask: (task_id: string | null) => void;
  handleProjectModal: (projectId: string) => void;
  handleTodoModal: (todoId: string) => void;
}

const ModalContext = createContext<ModalTypes>({
  activeModal: null,
  activeTeamMember: "",
  activeTeamTask: "",
  activeTodoModalId: "",
  activeProjectModalId: "",
  handleActiveModal: () => {},
  handleActiveTeamMember: () => {},
  handleActiveTeamTask: () => {},
  handleProjectModal: () => {},
  handleTodoModal: () => {},
});

const ModalContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<ActiveModal | null>(null);
  const [activeProjectModalId, setActiveProjectModalId] = useState<
    string | null
  >("");
  const [activeTodoModalId, setActiveTodoModalId] = useState<string | null>("");
  const [activeTeamMember, setActiveTeamMember] = useState<string | null>("");
  const [activeTeamTask, setActiveTeamTask] = useState<string | null>("");

  const handleActiveModal = (state: ActiveModal | null) => {
    setActiveModal(state);
  };

  const handleTodoModal = (todoId: string) => {
    setActiveTodoModalId(todoId);
  };

  const handleProjectModal = (projectId: string) => {
    setActiveProjectModalId(projectId);
  };

  const handleActiveTeamMember = (member_id: string | null) => {
    setActiveTeamMember(member_id);
  };

  const handleActiveTeamTask = (task_id: string | null) => {
    setActiveTeamTask(task_id);
  };

  return (
    <ModalContext.Provider
      value={{
        activeModal,
        activeTodoModalId,
        activeTeamMember,
        activeTeamTask,
        activeProjectModalId,
        handleActiveModal,
        handleActiveTeamMember,
        handleActiveTeamTask,
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
