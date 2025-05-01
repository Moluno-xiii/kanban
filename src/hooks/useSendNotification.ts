import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sendNotification } from "../utils/notifications";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface NotificationPayload {
  user_id: string;
  title: string;
  message: string;
  email: string;
}

const useSendNotification = () => {
  const queryClient = useQueryClient();
  const { user } = useSelector((state: RootState) => state.auth);
  return useMutation({
    mutationFn: ({ user_id, title, message, email }: NotificationPayload) =>
      sendNotification(user_id, title, message, email),
    onSuccess: () => {
      toast.success("Notification sent successfully!");
      queryClient.invalidateQueries({
        queryKey: ["user-notifications", user?.id as string],
      });
      queryClient.refetchQueries({
        queryKey: ["user-notifications", user?.id as string],
      });
    },
    onError: (error: { message: string }) => {
      toast.error(error.message || "An unexpected error occured");
    },
  });
};

export default useSendNotification;
