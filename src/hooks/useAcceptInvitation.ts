import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateInvitationStatus } from "../utils/invitations";
import { useNavigate } from "@tanstack/react-router";
import { addMemberToOrganization } from "../utils/members";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface Props {
  organization_id: string;
  role: string;
  invitation_id: string;
  super_admin_id: string;
  organization_name: string;
}
const useAcceptInvitation = ({
  invitation_id,
  organization_id,
  role,
  super_admin_id,
  organization_name,
}: Props) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await updateInvitationStatus("accepted", invitation_id);
      await addMemberToOrganization(
        organization_id,
        user?.id as string,
        role,
        super_admin_id,
        user?.email as string,
        organization_name,
      );
    },
    onSuccess: () => {
      toast.success("Invitation accepted!");
      queryClient.invalidateQueries({
        queryKey: ["organization-members", organization_id],
      });
      queryClient.refetchQueries({
        queryKey: ["organization-members", organization_id],
      });
      navigate({ to: "/dashboard/organizations/invitations", replace: true });
    },
    onError: (error: { message: string }) => {
      toast.error(error.message || "An unexpected error occured");
      console.error(error.message);
    },
  });
};

export default useAcceptInvitation;
