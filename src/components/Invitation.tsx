import { Link } from "@tanstack/react-router";
import { dateToString, InvitationNotification } from "../utils/helperFunctions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FaArrowRightLong } from "react-icons/fa6";
import { markInvitationAsRead } from "../utils/invitations";
import useAuthGuard from "../hooks/useAuthGuard";

interface PropTypes {
  notification: InvitationNotification;
  type: "read" | "unread";
}

const Invitation: React.FC<PropTypes> = ({ notification, type }) => {
  const queryClient = useQueryClient();
  const { user } = useAuthGuard();
  const markAsRead = useMutation({
    mutationFn: ({ notification_id }: { notification_id: string }) =>
      markInvitationAsRead(notification_id),
    onSuccess: () => {
      toast.success("Invitation marked as read");
      queryClient.invalidateQueries({
        queryKey: ["user-invitations", user?.email],
      });
      queryClient.refetchQueries({
        queryKey: ["user-invitations", user?.email],
      });
    },
    onError: (error: { message: string }) => {
      toast.error(error.message || "An unexpected error occured, try again.");
      console.error(error.message);
    },
  });
  return (
    <li
      key={notification.id}
      className="border-secondary flex flex-col gap-2 rounded-md border p-2"
    >
      <div className="flex flex-row items-center justify-between">
        <span className="text-secondary text-lg first-letter:uppercase md:text-xl">
          {notification.message}
        </span>
        {type === "unread" ? (
          <button
            className="text-secondary w-fit cursor-pointer text-sm transition-all duration-200 first-letter:capitalize hover:underline"
            onClick={() => {
              markAsRead.mutate({ notification_id: notification.id });
            }}
          >
            mark as read
          </button>
        ) : null}
      </div>
      <span>Invited by : {notification.invited_by}</span>
      <span>Invitation role : {notification.role}</span>
      <span>Dated : {dateToString(notification.created_at)}</span>
      <Link
        to="/dashboard/organizations/invitations/$invitation_id"
        params={{ invitation_id: notification.id }}
        className="text-secondary hover:text-secondary/80 flex flex-row items-center justify-end gap-x-2 transition-all duration-200 hover:underline"
        onClick={() => {
          if (!notification.read) {
            markAsRead.mutate({ notification_id: notification.id });
          }
        }}
      >
        View invitation
        <FaArrowRightLong size={15} />
      </Link>
    </li>
  );
};

export default Invitation;
