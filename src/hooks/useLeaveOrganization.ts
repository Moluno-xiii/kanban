import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { leaveOrganization } from "../utils/members";
import { useNavigate } from "@tanstack/react-router";
interface PropTypes {
  closeModal: () => void;
  organization_id: string;
  user_id: string;
}

const useLeaveOrganization = ({
  closeModal,
  organization_id,
  user_id,
}: PropTypes) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => await leaveOrganization(user_id, organization_id),
    onSuccess: () => {
      toast.success("Organization exited successfully!");
      closeModal();
      queryClient.invalidateQueries({
        queryKey: ["other-organizations", user_id],
      });
      queryClient.refetchQueries({
        queryKey: ["other-organizations", user_id],
      });
      navigate({ to: "/dashboard/organizations/other_organizations" });
    },
    onError: (err: { message: string }) =>
      toast.error(err.message || "An unexpected error occured, try again"),
  });
};

export default useLeaveOrganization;
