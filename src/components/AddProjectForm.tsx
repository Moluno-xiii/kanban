import { addProject, Project } from "../utils/helperFunctions";

const AddProjectForm = ({
  handleModal,
}: {
  handleModal: (state: boolean) => void;
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const dataObject = Object.fromEntries(formData) as unknown as Project;
    addProject(dataObject);
    handleModal(false);
  };
  const date = new Date();
  return (
    <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="projectName">Project name</label>
        <input
          required
          minLength={3}
          placeholder="e.g Jira tickets..."
          type="text"
          id="projectName"
          name="projectName"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="projectName">Description</label>
        <textarea
          name="description"
          id="description"
          title="Enter project description"
          required
        ></textarea>
      </div>
      <input type="hidden" name="projectId" value={crypto.randomUUID()} />
      <input type="hidden" name="dateCreated" value={date.toDateString()} />
      <button type="submit" className="btn">
        Submit
      </button>
    </form>
  );
};

export default AddProjectForm;
