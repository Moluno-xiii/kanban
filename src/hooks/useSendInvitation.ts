import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  checkIfInvitationExists,
  createOrganizationInvitation,
} from "../utils/invitations";
import toast from "react-hot-toast";
import { checkIfMemberExistsInOrganization } from "../utils/members";

interface InvitationPayload {
  email: string;
  invitation_message: string;
  role: string;
  id: string;
  organization_name: string;
  inviter_email: string;
}

const useSendInvitation = (
  handleModal: (state: boolean) => void,
  organization_id: string,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      email,
      invitation_message,
      role,
      id,
      organization_name,
      inviter_email,
    }: InvitationPayload) => {
      const invitationStatus = await checkIfInvitationExists(
        email,
        organization_id,
      );
      if (invitationStatus) {
        throw new Error(
          "Invitation has already been sent to this user from this Organization!",
        );
      }
      const userStatus = await checkIfMemberExistsInOrganization(
        email,
        organization_id,
      );
      if (userStatus) {
        throw new Error("User is already a member in this organization!");
      }
      createOrganizationInvitation(
        organization_id,
        email,
        invitation_message,
        role,
        id,
        organization_name,
        inviter_email,
      );
    },
    onSuccess: () => {
      handleModal(false);
      toast.success("Invitation sent successfully!");
      queryClient.invalidateQueries({
        queryKey: ["sent-invitations", organization_id],
      });
      queryClient.refetchQueries({
        queryKey: ["sent-invitations", organization_id],
      });
    },
    onError: (error: { message: string }) => {
      toast.error(error.message || "An unexpected error occured");
    },
  });
};

export default useSendInvitation;
