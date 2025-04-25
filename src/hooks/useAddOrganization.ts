import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  checkIfOrganizationNameExistsForUser,
  upsertAdminUserOrganization,
} from "../utils/organizations";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const useAddOrganization = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["organizations", user?.id as string],
      });
      queryClient.refetchQueries({
        queryKey: ["organizations", user?.id as string],
      });
      toast.success("Organization created successfully!");
      handleCloseModal();
    },
    onError: (err: { message: string }) => {
      toast.error(err.message || "An unexpected error occured, try again.");
    },
    mutationFn: async (formData: {
      super_admin_id: string;
      name: string;
      description: string;
    }) => {
      const organizationNameCheck = await checkIfOrganizationNameExistsForUser(
        formData.name,
        formData.super_admin_id,
      );

      if (organizationNameCheck)
        throw new Error(
          "You already have an organization with this name, change the name and try again.",
        );
      upsertAdminUserOrganization(formData, user?.email as string);
    },
  });
};

export default useAddOrganization;
