import { useSelector } from "react-redux";
import useSendInvitation from "../../hooks/useSendInvitation";
import { RootState } from "../../store";

const AddMemberForm = ({
  handleModal,
  organization_id,
  organization_name,
}: {
  handleModal: (state: boolean) => void;
  organization_id: string;
  organization_name: string;
}) => {
  const sendInvitationMutation = useSendInvitation(
    handleModal,
    organization_id,
  );
  const invitation_message = `You've been invited to join ${organization_name}`;

  const { user } = useSelector((state: RootState) => state.auth);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const dataObject = Object.fromEntries(formData);

    sendInvitationMutation.mutate({
      email: dataObject.email as string,
      id: user?.id as string,
      invitation_message,
      role: dataObject.role as string,
    });
  };
  return (
    <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-y-2">
        <label aria-label="Input email title" htmlFor="email">
          User Email
        </label>
        <input
          aria-label="Member email input box"
          required
          minLength={3}
          placeholder="e.g VladTheImpaler@gmail.com"
          type="email"
          id="email"
          name="email"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <label aria-label="Member role" htmlFor="role">
          Role (Admin / member)
        </label>
        <select
          name="role"
          id="role"
          className="border-secondary bg-background rounded-md border-2 p-2"
        >
          <option id="member" value={"member"}>
            Member
          </option>
          <option id="admin" value={"admin"}>
            Admin
          </option>
        </select>
      </div>
      <button aria-label="submit button" type="submit" className="btn">
        {sendInvitationMutation.isPending
          ? "Sending invitation..."
          : "  Submit"}
      </button>
    </form>
  );
};

export default AddMemberForm;
