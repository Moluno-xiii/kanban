import { Dispatch, SetStateAction } from "react";
import useDeleteInvitation from "../hooks/useDeleteInvitation";
import { dateToString, InvitationNotification } from "../utils/helperFunctions";

interface PropTypes {
  invitation: InvitationNotification;
  organization_id: string;
  activeInvitationTab: string;
  setActiveInvitationTab: Dispatch<SetStateAction<string>>;
}

const SentInvitation: React.FC<PropTypes> = ({
  invitation,
  organization_id,
  activeInvitationTab,
  setActiveInvitationTab,
}) => {
  const cancelInviteMutation = useDeleteInvitation(organization_id);

  return (
    <li
      key={invitation.id}
      className="border-secondary flex flex-col gap-y-2 rounded-md border p-2"
    >
      <span className="text-lg md:text-xl">{invitation.message}</span>
      <span>Sent at {dateToString(invitation.created_at)}</span>
      <span>Invitee : {invitation.invitee_email}</span>
      <span>Invitation role : {invitation.role}</span>
      <span>Invitation Status : {invitation.invitation_status}</span>
      <span>Has invitation been read? : {invitation.read ? "Yes" : "No"}</span>
      <button
        onClick={() => {
          setActiveInvitationTab(invitation.id);
          cancelInviteMutation.mutate(invitation.id);
        }}
        className="btn-error self-end"
      >
        {cancelInviteMutation.isPending && activeInvitationTab === invitation.id
          ? "Deleting invite..."
          : " Delete invite"}
      </button>
    </li>
  );
};

export default SentInvitation;
