import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { deleteOrganizationInvitations } from "../utils/invitations";
import { deleteOrganizationMembers, getMemberRole } from "../utils/members";
import { sendNotification } from "../utils/notifications";
import { deleteAdminUserOrganization } from "../utils/organizations";
import { deleteMembers } from "../utils/team_members";
import { deleteTasks } from "../utils/team_tasks";
import { deleteSubmissions } from "../utils/team_tasks_submissions";
import { deleteOrganizationTeams } from "../utils/teams";

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
      queryClient.invalidateQueries({
        queryKey: ["user-notifications", user?.id as string],
      });
      queryClient.refetchQueries({
        queryKey: ["user-notifications", user?.id as string],
      });
      toast.success("Organization deleted successfully!");
      handleCloseModal();
      navigate({
        to: "/dashboard/organizations/my_organizations",
        replace: true,
      });
    },
    onError: (err: { message: string }) => {
      toast.error(err.message || "An unexpected error occured, try again.");
    },
    mutationFn: async () => {
      const userRole = await getMemberRole(user?.id as string, organization_id);
      if (userRole[0].role.toLowerCase() !== "super admin") {
        throw new Error(
          "You're not authorized to perform this action, only SUPER ADMINS can delete organizations!",
        );
      }
      await deleteAdminUserOrganization(organization_id, user?.id as string);
      await deleteOrganizationInvitations({
        organization_id,
        super_admin_id: user?.id as string,
      });
      await deleteOrganizationMembers(
        // user?.id as string,
        // user?.id as string,
        organization_id,
      );
      await deleteOrganizationTeams(organization_id);
      await deleteMembers(organization_id);
      await deleteTasks(organization_id);
      await deleteSubmissions(organization_id);
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
