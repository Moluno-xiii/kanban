import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMemberFromTeam, getTeamMemberRole } from "../utils/team_members";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { sendNotification } from "../utils/notifications";

const useDeleteTeamMember = (team_id: string, team_name: string) => {
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
      const deleter_role = await getTeamMemberRole(user?.id as string, team_id);

      if (deleter_role[0].role.toLowerCase() === "member") {
        throw new Error("You're not authorized to make this action!");
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
