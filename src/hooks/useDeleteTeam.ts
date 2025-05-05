import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMembers, getTeamMemberRole } from "../utils/team_members";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import toast from "react-hot-toast";
import { getMemberRole } from "../utils/members";
import { deleteTeam } from "../utils/teams";
import { deleteTasks } from "../utils/team_tasks";
import { deleteSubmissions } from "../utils/team_tasks_submissions";
import { sendNotification } from "../utils/notifications";
import { useNavigate } from "@tanstack/react-router";

const useDeleteTeam = (
  team_id: string,
  organization_id: string,
  team_name: string,
  handleClose: () => void,
) => {
  const queryClient = useQueryClient();
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      const deleter_team_role = await getTeamMemberRole(
        user?.id as string,
        team_id,
      );
      const deleter_organization_role = await getMemberRole(
        user?.id as string,
        organization_id,
      );

      if (deleter_team_role[0]) {
        if (
          deleter_team_role[0].role !== "admin" &&
          deleter_organization_role[0].role !== "super admin"
        ) {
          throw new Error(
            "You're not authorized to make this action! only team Creators, team Admins, and Organization Super Admins can delete teams.",
          );
        }
      } else if (deleter_organization_role[0].role !== "super admin") {
        throw new Error(
          "You're not authorized to make this action! only team Creators, team Admins, and Organization Super Admins can delete teams.",
        );
      }
      await deleteTeam(team_id);
      await deleteMembers(undefined, team_id);
      await deleteTasks(undefined, team_id);
      await deleteSubmissions(undefined, team_id);
      await sendNotification(
        user?.id as string,
        "Team deletion",
        `Your team : ${team_name} has been deleted`,
        user?.email as string,
      );
    },
    onSuccess: () => {
      toast.success(`${team_name} team deleted successfully!`);
      queryClient.invalidateQueries({
        queryKey: ["admin-teams", user?.id as string, organization_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["team", team_id],
      });
      queryClient.refetchQueries({
        queryKey: ["admin-teams", user?.id as string, organization_id],
      });
      queryClient.refetchQueries({
        queryKey: ["team", team_id],
      });
      handleClose();
      navigate({
        to: "/dashboard/organizations/my_organizations",
        replace: true,
      });
    },
    onError: (err: { message: string }) => {
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occured, try again";
      toast.error(message);
    },
  });
};

export default useDeleteTeam;
