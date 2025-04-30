import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { markNotificationAsRead } from "../utils/notifications";

const useMarkNotificationAsRead = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      notification_id,
      user_id,
    }: {
      notification_id: string;
      user_id: string;
    }) => markNotificationAsRead(user_id, notification_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-notifications", user?.id as string, false],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-notifications", user?.id as string, true],
      });
      queryClient.refetchQueries({
        queryKey: ["user-notifications", user?.id as string, false],
      });
      queryClient.refetchQueries({
        queryKey: ["user-notifications", user?.id as string, true],
      });
      toast.success("Notification marked as read!");
    },
    onError: (err: { message: string }) =>
      toast.error(err.message || "An unexpected error occured"),
  });
};

export default useMarkNotificationAsRead;
