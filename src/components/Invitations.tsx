import { useModalContext } from "../contexts/ModalContext";
import useGetUserInvitations from "../hooks/useGetUserInvitations";
import { InvitationNotification } from "../utils/helperFunctions";
import Invitation from "./Invitation";
import DeleteUserInvitationsModal from "./modals/DeleteUserInvitationsModal";
import EmptyState from "./ui/EmptyState";

interface PropTypes {
  type: string;
  invitationStatus: boolean;
}

const Invitations: React.FC<PropTypes> = ({ type, invitationStatus }) => {
  const { data: notifications, isPending } =
    useGetUserInvitations(invitationStatus);
  const { activeModal, handleActiveModal } = useModalContext();

  if (isPending) return <span>Loading {type} invitations...</span>;

  if (!notifications || notifications.length < 1)
    return (
      <EmptyState
        emptyStateText={`You don't have any ${type} invitations.`}
        button={false}
      />
    );

  return (
    <ul className="flex flex-col gap-y-2">
      <button
        onClick={() =>
          handleActiveModal(
            `delete all ${type as "read" | "unread"} invitations`,
          )
        }
        className="btn-error self-end"
      >
        Delete {type} invitations
      </button>
      {notifications.map((notification: InvitationNotification) => (
        <Invitation
          key={notification.id}
          notification={notification}
          type={type as "read" | "unread"}
        />
      ))}
      {activeModal === "delete all read invitations" ? (
        <DeleteUserInvitationsModal
          closeModal={() => handleActiveModal(null)}
          title="Are you sure you want to delete all your READ invitations?"
          status={true}
        />
      ) : activeModal === "delete all unread notifications" ? (
        <DeleteUserInvitationsModal
          closeModal={() => handleActiveModal(null)}
          title="Are you sure you want to delete all your UNREAD invitations?"
          status={false}
        />
      ) : null}
    </ul>
  );
};

export default Invitations;
