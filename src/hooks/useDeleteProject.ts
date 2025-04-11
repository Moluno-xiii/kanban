import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useProjectModalContext } from "../contexts/ProjectModalContext";
import { RootState } from "../store";
import { deleteUserProject } from "../utils/project";

const useDeleteProject = ({ nested = false }: { nested: boolean }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { setIsDeleteProjectModalOpen, setActiveProjectModalId } =
    useProjectModalContext();
  return useMutation({
    mutationFn: deleteUserProject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-projects", user?.id as string],
      });
      setIsDeleteProjectModalOpen(false);
      setActiveProjectModalId("");
      toast.success("Project deleted successfully!");

      if (nested) {
        navigate({ to: "/dashboard/personal_projects", replace: true });
      }
    },
    onError: (err: { message: string }) => {
      const message =
        err instanceof Error ? err.message : "An unexpected error occured";
      toast.error(message);
    },
  });
};

export default useDeleteProject;
