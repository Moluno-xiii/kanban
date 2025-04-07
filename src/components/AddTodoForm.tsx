import { addTodo, Todo } from "../utils/helperFunctions";

const AddTodoForm = ({
  handleModal,
  projectId,
}: {
  handleModal: (state: boolean) => void;
  projectId: string;
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const dataObject = Object.fromEntries(formData) as unknown as Todo;
    addTodo(projectId, dataObject);
    handleModal(false);
  };
  const date = new Date();
  return (
    <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-y-2">
        <label aria-label="Input todo title" htmlFor="title">
          Todo title
        </label>
        <input
          aria-label="Todo title input box"
          required
          minLength={3}
          placeholder="e.g Clean the kitchen..."
          type="text"
          id="title"
          name="title"
        />
      </div>
      <input type="hidden" name="id" value={crypto.randomUUID()} />
      <input type="hidden" name="dateCreated" value={date.toLocaleString()} />
      <input type="hidden" name="completed" value={"no"} />
      <button aria-label="submit button" type="submit" className="btn">
        Submit
      </button>
    </form>
  );
};

export default AddTodoForm;
