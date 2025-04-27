import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  checkIfTaskTitleExistsInTeam,
  createTeamTask,
} from "../utils/team_tasks";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../store";

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
      assigned_to?: string;
    }) => {
      await checkIfTaskTitleExistsInTeam(formData.title);
      await createTeamTask(
        user?.email as string,
        formData.status,
        formData.team_id,
        formData.admin_id,
        formData.super_admin_id,
        formData.title,
        formData.description,
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
      closeModal();
    },
    onError: (err: { message: string }) => {
      const message =
        err instanceof Error ? err.message : "An unexpected error occured.";
      console.error(message);
      toast.error(message);
    },
  });
};

export default useCreateTeamTask;
