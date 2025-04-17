import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { deleteAdminUserOrganization } from "../utils/organizations";
import { sendNotification } from "../utils/notifications";
import { deleteOrganizationInvitations } from "../utils/invitations";
import { deleteOrganizationMembers } from "../utils/members";
import { useNavigate } from "@tanstack/react-router";

const useDeleteUserOrganization = ({
  handleCloseModal,
  organization_id,
  organization_name,
}: {
  handleCloseModal: () => void;
  organization_id: string;
  organization_name: string;
}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["organizations", user?.id as string],
      });
      queryClient.refetchQueries({
        queryKey: ["organizations", user?.id as string],
      });
      toast.success("Organization deleted successfully!");
      handleCloseModal();
      navigate({ to: "/dashboard/organizations/my_organizations" });
    },
    onError: (err: { message: string }) => {
      toast.error(err.message || "An unexpected error occured, try again.");
    },
    mutationFn: async () => {
      await deleteAdminUserOrganization(organization_id, user?.id as string);
      await deleteOrganizationInvitations(organization_id);
      await deleteOrganizationMembers(
        user?.id as string,
        user?.id as string,
        organization_id,
      );
      await sendNotification(
        user?.id as string,
        "Deleted organization",
        `Your organization : ${organization_name} has been deleted`,
        user?.email as string,
      );
    },
  });
};

export default useDeleteUserOrganization;
