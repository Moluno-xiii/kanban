import { useSelector } from "react-redux";
import { RootState } from "../../store";
import useAddOrganization from "../../hooks/useAddOrganization";

const AddOrganizationForm = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const addOrganizationMutation = useAddOrganization({ handleCloseModal });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const dataObject = Object.fromEntries(formData);
    const finalData = { ...dataObject, super_admin_id: user?.id } as {
      super_admin_id: string;
      name: string;
      description: string;
    };
    addOrganizationMutation.mutate(finalData);
  };
  return (
    <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-y-2">
        <label aria-label="Organization name label title" htmlFor="name">
          Organization name
        </label>
        <input
          aria-label="organization name input box"
          required
          minLength={3}
          placeholder="e.g Facebook Incorporated"
          type="text"
          id="name"
          name="name"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <label
          aria-label="Organization description label title"
          htmlFor="description"
        >
          Organization description
        </label>
        <textarea
          aria-label="organization description input box"
          required
          minLength={3}
          placeholder="e.g organization for facebook employees "
          id="description"
          name="description"
        />
      </div>
      <button aria-label="submit button" type="submit" className="btn">
        {addOrganizationMutation.isPending
          ? "Creating organization..."
          : "Submit"}
      </button>
    </form>
  );
};

export default AddOrganizationForm;
