import { useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { FaArrowRightLong } from "react-icons/fa6";
import { dateToString, InvitationNotification } from "../utils/helperFunctions";
import { markInvitationAsRead } from "../utils/invitations";

interface PropTypes {
  notification: InvitationNotification;
}

const UnreadInvitations: React.FC<PropTypes> = ({ notification }) => {
  const markAsRead = useMutation({
    mutationFn: ({ notification_id }: { notification_id: string }) =>
      markInvitationAsRead(notification_id),
    onSuccess: () => {
      toast.success("Invitation marked as read");
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
        <span className="text-lg first-letter:uppercase md:text-xl">
          {notification.message}
        </span>
        <button
          className="text-secondary w-fit cursor-pointer text-sm transition-all duration-200 first-letter:capitalize hover:underline"
          onClick={() => {
            markAsRead.mutate({ notification_id: notification.id });
          }}
        >
          mark as read
        </button>
      </div>
      <span>Invitation role : {notification.role}</span>
      <span>{dateToString(notification.created_at)}</span>
      <span>Invite status : {notification.invitation_status}</span>
      <Link
        to="/dashboard/organizations/invitations/$invitation_id"
        params={{ invitation_id: notification.id }}
        className="text-secondary hover:text-secondary/80 flex flex-row items-center justify-end gap-x-2 transition-all duration-200 hover:underline"
        onClick={() => {
          markAsRead.mutate({ notification_id: notification.id });
        }}
      >
        View invitation
        <FaArrowRightLong size={15} />
      </Link>
    </li>
  );
};

export default UnreadInvitations;
