import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrganizationInvitation } from "../utils/invitations";
import toast from "react-hot-toast";

interface InvitationPayload {
  email: string;
  invitation_message: string;
  role: string;
  id: string;
  organization_name: string;
}

const useSendInvitation = (
  handleModal: (state: boolean) => void,
  organization_id: string,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      email,
      invitation_message,
      role,
      id,
      organization_name,
    }: InvitationPayload) =>
      createOrganizationInvitation(
        organization_id,
        email,
        invitation_message,
        role,
        id,
        organization_name,
      ),
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
      console.error(error.message);
    },
  });
};

export default useSendInvitation;
