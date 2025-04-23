import useCreateTeam from "../../hooks/useCreateTeam";
import Modal from "../ui/Modal";

interface PropTypes {
  //   isModalOpen: boolean;
  handleCloseModal: () => void;
  organization_id: string;
  super_admin_id: string;
  creator_id: string;
}

const CreateTeamModal: React.FC<PropTypes> = ({
  handleCloseModal,
  organization_id,
  creator_id,
  super_admin_id,
}) => {
  const createTeamMutation = useCreateTeam(
    creator_id,
    organization_id,
    handleCloseModal,
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formObject = Object.fromEntries(formData) as {
      name: string;
      description: string;
    };
    const finalObject = { ...formObject, admin_id: creator_id, super_admin_id };
    console.log(finalObject);
    createTeamMutation.mutate(finalObject);
  };

  return (
    <Modal title="Create team" handleClose={handleCloseModal}>
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-3 p-2"
      >
        <div className="flex flex-col gap-y-2">
          <label className="text-lg sm:text-xl" htmlFor="name">
            Team name
          </label>
          <input required minLength={3} type="text" id="name" name="name" />
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="text-lg sm:text-xl" htmlFor="description">
            Team description
          </label>
          <input required type="text" id="description" name="description" />
        </div>
        <button className="btn self-end" type="submit">
          {createTeamMutation.isPending ? "Creating Team..." : "Submit"}
        </button>
      </form>
    </Modal>
  );
};

export default CreateTeamModal;
