import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "../ui/Modal";
import { deleteTeamTask } from "../../utils/team_tasks";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getMemberRole } from "../../utils/members";
import { getTeamMemberRole } from "../../utils/team_members";

interface Props {
  task_id: string;
  team_id: string;
  handleClose: () => void;
  organization_id: string;
}

const DeleteTeamTaskModal: React.FC<Props> = ({
  task_id,
  team_id,
  handleClose,
  organization_id,
}) => {
  const queryClient = useQueryClient();
  const { user } = useSelector((state: RootState) => state.auth);
  const deleteTaskMutation = useMutation({
    mutationFn: async () => {
      const deleter_team_role = await getTeamMemberRole(
        user?.id as string,
        team_id,
      );
      const deleter_organization_role = await getMemberRole(
        user?.id as string,
        organization_id,
      );
      console.log(deleter_team_role);
      console.log(deleter_organization_role);

      if (deleter_team_role[0]) {
        if (
          deleter_team_role[0].role !== "admin" &&
          deleter_organization_role[0].role !== "super admin"
        ) {
          throw new Error(
            "You're not authorized to make this action! only team Creators, team Admins, and Organization Super Admins can delete team tasks.",
          );
        }
      } else if (deleter_organization_role[0].role !== "super admin") {
        throw new Error(
          "You're not authorized to make this action! only team Creators, team Admins, and Organization Super Admins can delete team tasks.",
        );
      }
      await deleteTeamTask(task_id, team_id);
    },
    onSuccess: () => {
      toast.success("Task deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["team_tasks", team_id],
      });
      queryClient.refetchQueries({
        queryKey: ["team_tasks", team_id],
      });
      handleClose();
    },
    onError: (err: { message: string }) => {
      const message =
        err instanceof Error ? err.message : "An unexpected error occured.";
      toast.error(message);
    },
  });

  return (
    <Modal
      handleClose={handleClose}
      title="Are you sure you want to delete this task?"
    >
      <div className="flex flex-row items-center gap-5">
        <button
          aria-label="no, i don't want to delete this task button"
          className="btn-error"
          onClick={handleClose}
        >
          No
        </button>
        <button
          aria-label="Yes, i want to delete this task button"
          className="btn"
          onClick={() => deleteTaskMutation.mutate()}
        >
          {deleteTaskMutation.isPending ? "Deleting task..." : "Yes"}
        </button>
      </div>
    </Modal>
  );
};

export default DeleteTeamTaskModal;
