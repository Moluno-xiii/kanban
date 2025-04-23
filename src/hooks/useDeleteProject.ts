import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useModalContext } from "../contexts/ModalContext";
import { RootState } from "../store";
import { deleteUserProject } from "../utils/project";

const useDeleteProject = ({ nested = false }: { nested: boolean }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { handleActiveModal, handleProjectModal } = useModalContext();

  return useMutation({
    mutationFn: deleteUserProject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-projects", user?.id as string],
      });
      queryClient.refetchQueries({
        queryKey: ["user-projects", user?.id],
      });
      handleActiveModal(null);
      handleProjectModal("");

      toast.success("Project deleted successfully!");

      if (nested) {
        navigate({ to: "/dashboard/personal_projects", replace: true });
      }
    },
    onError: (err: { message: string }) => {
      const message =
        err instanceof Error ? err.message : "An unexpected error occured";
      console.error(message);
      toast.error(message);
    },
  });
};

export default useDeleteProject;
