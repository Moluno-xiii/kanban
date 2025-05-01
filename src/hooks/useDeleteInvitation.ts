import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { cancelInvitation } from "../utils/invitations";

const useDeleteInvitation = (organization_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sent-invitations", organization_id],
      });
      queryClient.refetchQueries({
        queryKey: ["sent-invitations", organization_id],
      });
      toast.success("Invitation deleted successfully");
    },
    mutationFn: (id: string) => cancelInvitation(id),
    onError: (error: { message: string }) => {
      toast.error(error.message || "An unexpected error occured, try again.");
    },
  });
};

export default useDeleteInvitation;
