import useCreateTeamTask from "../../hooks/useCreateTeamTask";
import useGetTeamMembers from "../../hooks/useGetTeamMembers";
import { Member, TaskTypes } from "../../utils/helperFunctions";
import Error from "../ui/Error";
import Loading from "../ui/Loading";
import Modal from "../ui/Modal";

interface Props {
  admin_id: string;
  team_id: string;
  organization_id: string;
  super_admin_id: string;
  team_name: string;
  handleActiveModal: (state: null) => void;
}

const AddTeamTaskModal: React.FC<Props> = ({
  admin_id,
  team_id,
  organization_id,
  super_admin_id,
  team_name,
  handleActiveModal,
}) => {
  const {
    data: teamMembers,
    isPending,
    error,
  } = useGetTeamMembers(team_id, organization_id);
  const createTaskMutation = useCreateTeamTask(
    team_id,
    () => handleActiveModal(null),
    organization_id,
  );

  if (isPending) return <Loading message="Loading organization members" />;
  if (error) return <Error errorMessage={error.message} />;
  console.log(teamMembers);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const dataObject = Object.fromEntries(formData);
    const selectedMember = JSON.parse(dataObject.assigned_to as string);
    const finalObject = {
      ...dataObject,
      assigned_to: selectedMember.email,
      assignee_id: selectedMember.id,
      team_name,
      status: dataObject.assigned_to ? "unfinished" : "unassigned",
    };

    createTaskMutation.mutate(
      finalObject as {
        admin_id: string;
        description: string;
        status: TaskTypes;
        super_admin_id: string;
        team_id: string;
        title: string;
        assigned_to: string;
        assignee_id: string;
        team_name: string;
      },
    );
  };

  return (
    <Modal title="Add Team Task" handleClose={() => handleActiveModal(null)}>
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-y-3">
        <div className="flex flex-col gap-y-2">
          <label htmlFor="title">Task title</label>
          <input
            aria-label="task title input"
            type="text"
            name="title"
            id="title"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="description">Task description</label>
          <input
            aria-label="task description input"
            type="text"
            name="description"
            id="description"
          />
        </div>
        {!teamMembers || teamMembers.length < 1 ? (
          <span aria-label="organization members empty state text">
            You don't have any members in your organization!
          </span>
        ) : (
          <div className="flex flex-col gap-y-2">
            <label htmlFor="assigned_to">Assignee email</label>
            <select
              className="border-secondary min-w-sm cursor-pointer rounded-md border p-2"
              required
              name="assigned_to"
              id="assigned_to"
              defaultValue={""}
              aria-label="task assignee  email selection"
            >
              {teamMembers?.map((member: Member) => (
                <option
                  aria-label={`email for ${member.member_email}`}
                  value={JSON.stringify({
                    email: member.member_email,
                    id: member.member_id,
                  })}
                  key={member.member_id}
                >
                  {member.member_email}
                </option>
              ))}
            </select>
          </div>
        )}

        <input type="hidden" value={team_id} name="team_id" id="team_id" />
        <input type="hidden" value={admin_id} name="admin_id" id="admin_id" />
        <input
          type="hidden"
          value={super_admin_id}
          name="super_admin_id"
          id="super_admin_id"
        />
        <button aria-label="submit button" className="btn" type="submit">
          {createTaskMutation.isPending ? "Creating team task..." : "Submit"}
        </button>
      </form>
    </Modal>
  );
};

export default AddTeamTaskModal;
