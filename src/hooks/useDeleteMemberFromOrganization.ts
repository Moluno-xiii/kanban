import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteMemberFromOrganization } from "../utils/members";
import { sendNotification } from "../utils/notifications";
import { Member } from "../utils/helperFunctions";
import useAuthGuard from "./useAuthGuard";
import { useNavigate } from "@tanstack/react-router";

const useDeleteMemberFromOrganization = (
  member: Member,
  closeModal: () => void,
) => {
  const { user } = useAuthGuard();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      await deleteMemberFromOrganization(
        user?.id as string,
        member.role,
        member.member_id,
        member.super_admin_id,
        member.organization_id,
      );
      await sendNotification(
        member.member_id,
        "Termination of Account",
        `You have been deleted from the Organization : ${member.organization_name}`,
        member.member_email,
      );
    },
    onSuccess: () => {
      toast.success("Member deleted successfully!");
      navigate({
        to: `/dashboard/organizations/my_organizations/${member.organization_id}`,
      });
      closeModal();
    },
    onError: (err: { message: string }) => {
      toast.error(err.message || "An unexpected error occured.");
    },
  });
};

export default useDeleteMemberFromOrganization;
