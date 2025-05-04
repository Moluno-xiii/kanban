import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getMemberRole } from "../utils/members";
import { createTeam } from "../utils/teams";
import { addMemberToTeam } from "../utils/team_members";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface FormData {
  admin_id: string;
  super_admin_id: string;
  name: string;
  description: string;
}

const useCreateTeam = (
  creator_id: string,
  organization_id: string,
  handleCloseModal: () => void,
) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      admin_id,
      super_admin_id,
      name,
      description,
    }: FormData) => {
      const role = await getMemberRole(creator_id, organization_id);
      if (
        role[0].role.toLowerCase() !== "super admin" &&
        role[0].role.toLowerCase() !== "admin"
      ) {
        throw new Error("You're not authorized to make this action!");
      }
      const createdTeam = await createTeam(
        admin_id,
        super_admin_id,
        name,
        description,
        organization_id,
      );
      await addMemberToTeam({
        member_id: user?.id as string,
        team_id: createdTeam[0].id as string,
        organization_id: createdTeam[0].organization_id as string,
        super_admin_id: createdTeam[0].super_admin_id as string,
        member_email: user?.email as string,
        team_name: createdTeam[0].name as string,
        role: "admin",
        admin_id: user?.id as string,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["organization-teams"],
      });
      queryClient.refetchQueries({
        queryKey: ["organization-teams"],
      });
      queryClient.invalidateQueries({
        queryKey: ["member-teams", organization_id],
      });
      queryClient.refetchQueries({
        queryKey: ["member-teams", organization_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["admin-teams"],
      });
      queryClient.refetchQueries({
        queryKey: ["admin-teams"],
      });

      toast.success("Team created successfully!");
      handleCloseModal();
    },
    onError: (error: { message: string }) => {
      toast.error(error.message || "An unexpected error occured, try again.");
    },
  });
};

export default useCreateTeam;
