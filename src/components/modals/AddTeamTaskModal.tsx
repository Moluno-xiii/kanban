import useCreateTeamTask from "../../hooks/useCreateTeamTask";
import Modal from "../ui/Modal";

interface Props {
  admin_id: string;
  team_id: string;
  super_admin_id: string;
  handleActiveModal: (state: null) => void;
}

const AddTeamTaskModal: React.FC<Props> = ({
  admin_id,
  team_id,
  super_admin_id,
  handleActiveModal,
}) => {
  const createTaskMutation = useCreateTeamTask(team_id, () =>
    handleActiveModal(null),
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const dataObject = Object.fromEntries(formData);
    console.log(dataObject);
    createTaskMutation.mutate(
      dataObject as {
        admin_id: string;
        description: string;
        status: "assigned" | "unassigned" | "finished";
        super_admin_id: string;
        team_id: string;
        title: string;
        assigned_to: string;
      },
    );
  };
  return (
    <Modal title="Add Team Task" handleClose={() => handleActiveModal(null)}>
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-y-3">
        <div className="flex flex-col gap-y-2">
          <label htmlFor="title">Task title</label>
          <input type="text" name="title" id="title" />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="description">Task description</label>
          <input type="text" name="description" id="description" />
        </div>

        <input type="hidden" value={team_id} name="team_id" id="team_id" />
        <input type="hidden" value={"unassigned"} name="status" id="status" />
        <input type="hidden" value={admin_id} name="admin_id" id="admin_id" />
        <input type="hidden" value={""} name="assigned_to" id="assigned_to" />
        <input
          type="hidden"
          value={super_admin_id}
          name="super_admin_id"
          id="super_admin_id"
        />
        <button className="btn" type="submit">
          {createTaskMutation.isPending ? "Creating team task..." : "Submit"}
        </button>
      </form>
    </Modal>
  );
};

export default AddTeamTaskModal;
