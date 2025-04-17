import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserNotifications } from "../utils/notifications";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const useDeleteUserNotifications = ({
  closeModal,
}: {
  closeModal: () => void;
}) => {
  const queryClient = useQueryClient();
  const { user } = useSelector((state: RootState) => state.auth);
  return useMutation({
    mutationFn: async () => await deleteUserNotifications(user?.id as string),
    onSuccess: () => {
      toast.success("Notifications deleted successfully!");
      closeModal();
      queryClient.invalidateQueries({
        queryKey: ["user-notifications", user?.id as string],
      });
      queryClient.refetchQueries({
        queryKey: ["user-notifications", user?.id as string],
      });
    },
    onError: (err: { message: string }) =>
      toast.error(err.message || "An unexpected error occured, try again"),
  });
};

export default useDeleteUserNotifications;
