import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModalContext } from "../../contexts/ModalContext";
import Modal from "../ui/Modal";
import toast from "react-hot-toast";
import { deleteOrganizationInvitations } from "../../utils/invitations";

interface Props {
  organization_id: string;
  super_admin_id: string;
}

const DeleteAllOrganizationInvitationsModal: React.FC<Props> = ({
  organization_id,
  super_admin_id,
}) => {
  const { handleActiveModal } = useModalContext();
  const queryClient = useQueryClient();
  const deleteAllOrganizationInvitations = useMutation({
    mutationFn: deleteOrganizationInvitations,
    onSuccess: () => {
      toast.success("Deleted all Organization invitations successfully!");
      queryClient.invalidateQueries({
        queryKey: ["sent-invitations", organization_id],
      });
      queryClient.refetchQueries({
        queryKey: ["sent-invitations", organization_id],
      });
      handleActiveModal(null);
    },
    onError: (err: { message: string }) => {
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occured, try again.";
      toast.error(message);
    },
  });
  return (
    <Modal
      title="Are you sure you want to delete all invitations for this Organization?"
      handleClose={() => handleActiveModal(null)}
    >
      <div className="flex flex-row items-center justify-between gap-4">
        <button className="btn-error" onClick={() => handleActiveModal(null)}>
          No
        </button>
        <button
          onClick={() =>
            deleteAllOrganizationInvitations.mutate({
              organization_id,
              super_admin_id,
            })
          }
          className="btn"
        >
          {deleteAllOrganizationInvitations.isPending
            ? "Deleting Organization invitations..."
            : "Yes"}
        </button>
      </div>
    </Modal>
  );
};

export default DeleteAllOrganizationInvitationsModal;
