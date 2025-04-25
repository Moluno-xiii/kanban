import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { deleteUserInvitations } from "../utils/invitations";

const useDeleteUserInvitations = ({
  closeModal,
  status,
}: {
  closeModal: () => void;
  status?: boolean;
}) => {
  const queryClient = useQueryClient();
  const { user } = useSelector((state: RootState) => state.auth);
  return useMutation({
    mutationFn: async () =>
      await deleteUserInvitations(user?.email as string, status),
    onSuccess: () => {
      toast.success("Invitations deleted successfully!");
      closeModal();
      queryClient.invalidateQueries({
        queryKey: ["user-invitations", user?.email],
      });
      queryClient.refetchQueries({
        queryKey: ["user-invitations", user?.email],
      });
    },
    onError: (err: { message: string }) =>
      toast.error(err.message || "An unexpected error occured, try again"),
  });
};

export default useDeleteUserInvitations;
