import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { deleteAdminUserOrganization } from "../utils/organizations";

const useDeleteUserOrganization = ({
  handleCloseModal,
  organization_id,
}: {
  handleCloseModal: () => void;
  organization_id: string;
}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["organizations", user?.id as string],
      });
      toast.success("Organization deleted successfully!");
      handleCloseModal();
    },
    onError: (err: { message: string }) => {
      toast.error(err.message || "An unexpected error occured, try again.");
    },
    mutationFn: () =>
      deleteAdminUserOrganization(organization_id, user?.id as string),
  });
};

export default useDeleteUserOrganization;
