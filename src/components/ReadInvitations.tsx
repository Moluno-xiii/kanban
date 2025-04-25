import { useModalContext } from "../contexts/ModalContext";
import useGetUserInvitations from "../hooks/useGetUserInvitations";
import { InvitationNotification } from "../utils/helperFunctions";
import Invitation from "./Invitation";
import DeleteUserInvitationsModal from "./modals/DeleteUserInvitationsModal";
import EmptyState from "./ui/EmptyState";
import Loading from "./ui/Loading";

const ReadInvitations: React.FC = () => {
  const { data: notifications, isPending } = useGetUserInvitations(true);
  const { activeModal, handleActiveModal } = useModalContext();

  if (isPending) return <Loading message={"Loading read invitations"} />;

  if (!notifications || notifications.length < 1)
    return (
      <EmptyState
        emptyStateText="You don't have any read invitations."
        button={false}
      />
    );

  return (
    <ul className="flex flex-col gap-y-2">
      <button
        onClick={() => handleActiveModal("delete all read invitations")}
        className="btn-error self-end"
      >
        Delete read invitations
      </button>
      {notifications.map((notification: InvitationNotification) => (
        <Invitation
          key={notification.id}
          notification={notification}
          type="read"
        />
      ))}
      {activeModal === "delete all read invitations" ? (
        <DeleteUserInvitationsModal
          closeModal={() => handleActiveModal(null)}
          title="Are you sure you want to delete all your READ invitations?"
          status={true}
        />
      ) : null}
    </ul>
  );
};

export default ReadInvitations;
