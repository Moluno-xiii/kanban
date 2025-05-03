import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { TeamMember } from "../../utils/helperFunctions";
import { getMemberRole } from "../../utils/members";
import {
  changeTeamMemberRole,
  getTeamMemberRole,
} from "../../utils/team_members";
import Modal from "../ui/Modal";

interface PropTypes {
  member: TeamMember;
  closeModal: () => void;
}

const EditTeamMemberRoleModal: React.FC<PropTypes> = ({
  member,
  closeModal,
}) => {
  const queryClient = useQueryClient();
  const { user } = useSelector((state: RootState) => state.auth);
  const changeMemberRoleMutation = useMutation({
    mutationFn: async (role: "admin" | "member") => {
      const memberRole = await getTeamMemberRole(
        user?.id as string,
        member.team_id,
      );
      const userRole = await getMemberRole(
        user?.id as string,
        member.organization_id,
      );
      if (
        memberRole[0].role.toLowerCase() !== "admin" &&
        userRole[0].role.toLowerCase() !== "super admin"
      ) {
        throw new Error("You're not authorized to make this action!");
      }
      await changeTeamMemberRole(role, member.member_id, member.team_id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["team_member", member.team_id, member.member_id],
      });
      queryClient.refetchQueries({
        queryKey: ["team_member", member.team_id, member.member_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["team-members", member.team_id],
      });
      queryClient.refetchQueries({
        queryKey: ["team-members", member.team_id],
      });
      toast.success("Member role changed successfully!!");
      closeModal();
    },
    onError: (err: { message: string }) => {
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occured, try again.";
      toast.error(message);
    },
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const dataObject = Object.fromEntries(formData);
    if (member.role === dataObject.role) return;
    changeMemberRoleMutation.mutate(dataObject.role as "admin" | "member");
  }
  return (
    <Modal handleClose={closeModal} title="Change team member role">
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex min-w-full flex-col gap-y-4"
      >
        <span>Current member role : {member.role}</span>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="role">Select new user role</label>
          <select
            name="role"
            id="role"
            className="border-secondary rounded-md border p-2"
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="flex flex-row items-center justify-between gap-5">
          <button onClick={closeModal} className="btn-error">
            Cancel
          </button>
          <button type="submit" className="btn">
            {changeMemberRoleMutation.isPending
              ? "Changing  role..."
              : "Submit"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTeamMemberRoleModal;
