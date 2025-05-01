import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  checkIfTaskTitleExistsInTeam,
  createTeamTask,
} from "../utils/team_tasks";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { sendNotification } from "../utils/notifications";

const useCreateTeamTask = (team_id: string, closeModal: () => void) => {
  const queryClient = useQueryClient();
  const { user } = useSelector((state: RootState) => state.auth);
  return useMutation({
    mutationFn: async (formData: {
      team_id: string;
      admin_id: string;
      super_admin_id: string;
      title: string;
      description: string;
      status: "assigned" | "unassigned" | "finished";
      assignee_id: string;
      assigned_to: string;
      team_name: string;
    }) => {
      const taskStatus = await checkIfTaskTitleExistsInTeam(
        formData.title,
        formData.team_id,
      );
      if (taskStatus)
        throw new Error(
          "A task with the same title already exists in this team!",
        );
      await createTeamTask(
        user?.email as string,
        formData.status,
        formData.team_id,
        formData.admin_id,
        formData.super_admin_id,
        formData.title,
        formData.description,
        formData.assigned_to,
        formData.assignee_id,
      );
      await sendNotification(
        formData.assignee_id,
        "Task assignment",
        `You were assigned a task at ${formData.team_name.toUpperCase()}`,
        formData.assigned_to,
      );
    },
    onSuccess: () => {
      toast.success("Task created successfully!");
      queryClient.invalidateQueries({
        queryKey: ["team_tasks", team_id],
      });
      queryClient.refetchQueries({
        queryKey: ["team_tasks", team_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["user_tasks", undefined, team_id],
      });
      queryClient.refetchQueries({
        queryKey: ["user_tasks", undefined, team_id],
      });
      closeModal();
    },
    onError: (err: { message: string }) => {
      const message =
        err instanceof Error ? err.message : "An unexpected error occured.";
      toast.error(message);
    },
  });
};

export default useCreateTeamTask;
