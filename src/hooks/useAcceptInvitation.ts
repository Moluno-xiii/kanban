import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { updateInvitationStatus } from "../utils/invitations";
import {
  addMemberToOrganization,
  checkIfMemberExistsInOrganization,
} from "../utils/members";
import { sendNotification } from "../utils/notifications";

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
      const userStatus = await checkIfMemberExistsInOrganization(
        user?.email as string,
        organization_id,
      );

      if (userStatus)
        throw new Error("You already belong to this organization!");
      await updateInvitationStatus("accepted", invitation_id);
      await addMemberToOrganization(
        organization_id,
        user?.id as string,
        role,
        super_admin_id,
        user?.email as string,
        organization_name,
      );
      await sendNotification(
        user?.id as string,
        "New organization",
        `You joined a new Organization : ${organization_name}`,
        user?.email as string,
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
