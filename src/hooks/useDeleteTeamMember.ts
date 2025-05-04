import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMemberFromTeam, getTeamMemberRole } from "../utils/team_members";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { sendNotification } from "../utils/notifications";
import { getMemberRole } from "../utils/members";

const useDeleteTeamMember = (
  team_id: string,
  team_name: string,
  organization_id: string,
  closeModal: () => void,
) => {
  const queryClient = useQueryClient();
  const { user } = useSelector((state: RootState) => state.auth);
  return useMutation({
    mutationFn: async ({
      member_id,
      member_email,
    }: {
      member_id: string;
      member_email: string;
    }) => {
      const deleter_team_role = await getTeamMemberRole(
        user?.id as string,
        team_id,
      );
      const deleter_organization_role = await getMemberRole(
        user?.id as string,
        organization_id,
      );
      console.log(deleter_team_role);
      console.log(deleter_organization_role);

      if (deleter_team_role[0]) {
        if (
          deleter_team_role[0].role !== "admin" &&
          deleter_organization_role[0].role !== "super admin"
        ) {
          throw new Error(
            "You're not authorized to make this action! only team Creators, team Admins, and Organization Super Admins can delete team members.",
          );
        }
      } else if (deleter_organization_role[0].role !== "super admin") {
        throw new Error(
          "You're not authorized to make this action! only team Creators, team Admins, and Organization Super Admins can delete team members.",
        );
      }

      await deleteMemberFromTeam(member_id, team_id);
      await sendNotification(
        member_id,
        "Removal from team",
        `You've been removed from ${team_name.toUpperCase()}.`,
        member_email,
      );
    },
    onSuccess: () => {
      toast.success("Member deleted from team successfully!");
      queryClient.invalidateQueries({
        queryKey: ["team-members", team_id],
      });
      queryClient.refetchQueries({
        queryKey: ["team-members", team_id],
      });
      closeModal();
    },
    onError: (err: { message: string }) => {
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occured, try again.";
      toast.error(message);
    },
  });
};

export default useDeleteTeamMember;
