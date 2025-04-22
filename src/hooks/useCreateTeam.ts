import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getMemberRole } from "../utils/members";
import { createTeam } from "../utils/teams";

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
      await createTeam(
        admin_id,
        super_admin_id,
        name,
        description,
        organization_id,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["organization-teams", organization_id],
      });
      queryClient.refetchQueries({
        queryKey: ["organization-teams", organization_id],
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
