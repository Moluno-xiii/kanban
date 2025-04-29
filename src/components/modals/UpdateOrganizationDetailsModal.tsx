import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "../ui/Modal";
import toast from "react-hot-toast";
import { OrganizationType } from "../../utils/helperFunctions";
import {
  checkIfOrganizationNameExistsForUser,
  updateOrganizationDetails,
} from "../../utils/organizations";

interface Props {
  organization: OrganizationType;
  handleClose: () => void;
}

const UpdateOrganizationDetailsModal: React.FC<Props> = ({
  organization,
  handleClose,
}) => {
  const queryClient = useQueryClient();

  const updateOrganizationDetailsMutation = useMutation({
    mutationFn: async ({
      name,
      description,
    }: {
      name: string;
      description: string;
    }) => {
      const status = await checkIfOrganizationNameExistsForUser(
        name,
        organization.super_admin_id,
      );
      if (status) {
        throw new Error("An organization with this name already exists!");
      }
      await updateOrganizationDetails(
        organization.id,
        organization.super_admin_id,
        name,
        description,
      );
    },
    onSuccess: () => {
      toast.success("Organization details updated successfullly");
      queryClient.invalidateQueries({
        queryKey: ["organization", organization.id],
      });
      queryClient.refetchQueries({
        queryKey: ["organization", organization.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["organizations", organization.super_admin_id],
      });
      queryClient.refetchQueries({
        queryKey: ["organizations", organization.super_admin_id],
      });
      handleClose();
    },
    onError: (err: { message: string }) => {
      const message =
        err instanceof Error ? err.message : "An unexpected error occured.";
      toast.error(message);
    },
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const dataObject = Object.fromEntries(formData) as {
      name: string;
      description: string;
    };
    updateOrganizationDetailsMutation.mutate({
      name: dataObject.name.trim(),
      description: dataObject.description,
    });
  }

  return (
    <Modal handleClose={handleClose} title="Update Organization details">
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
          <label htmlFor="name">Organization Name</label>
          <input
            defaultValue={organization.name}
            type="text"
            name="name"
            id="name"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="description">Organization description</label>
          <input
            defaultValue={organization.description}
            type="text"
            name="description"
            id="description"
          />
        </div>
        <button className="btn" type="submit">
          {updateOrganizationDetailsMutation.isPending
            ? "Updating Organization details..."
            : "Submit"}
        </button>
      </form>
    </Modal>
  );
};

export default UpdateOrganizationDetailsModal;
