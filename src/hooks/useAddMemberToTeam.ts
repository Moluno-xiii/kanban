import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  addMemberToTeam,
  checkIfMemberExistsInTeam,
} from "../utils/team_members";
import { useModalContext } from "../contexts/ModalContext";

const useAddMemberToTeam = (team_id: string, organization_id: string) => {
  const queryClient = useQueryClient();
  const { handleActiveModal } = useModalContext();
  return useMutation({
    mutationFn: async (formData: {
      member_id: string;
      team_id: string;
      organization_id: string;
      super_admin_id: string;
      member_email: string;
      team_name: string;
      role: "member" | "admin";
      admin_id: string;
    }) => {
      const userStatus = await checkIfMemberExistsInTeam(
        formData.member_id,
        formData.team_id,
      );
      if (userStatus) {
        throw new Error("User is already a member of this team!");
      }
      return addMemberToTeam(formData);
    },
    onSuccess: () => {
      toast.success("Member added successfully");
      queryClient.invalidateQueries({
        queryKey: ["member-teams", organization_id],
      });
      queryClient.refetchQueries({
        queryKey: ["member-teams", organization_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["team-members", team_id],
      });
      queryClient.refetchQueries({
        queryKey: ["team-members", team_id],
      });
      handleActiveModal(null);
    },
    onError: (err: { message: string }) => {
      const message =
        err instanceof Error ? err.message : "An unexpected error occured.";
      toast.error(message);
    },
  });
};

export default useAddMemberToTeam;
