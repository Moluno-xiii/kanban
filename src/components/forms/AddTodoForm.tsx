import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Todo } from "../../utils/helperFunctions";
import { upsertProjectTodo } from "../../utils/todo";

const AddTodoForm = ({
  handleModal,
  projectId,
}: {
  handleModal: (state: boolean) => void;
  projectId: string;
}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo", projectId] });
      queryClient.refetchQueries({ queryKey: ["todo", projectId] });
      handleModal(false);
      toast.success("Todo added successfully!!");
    },
    mutationFn: upsertProjectTodo,
    onError: (err: { message: string }) => {
      toast.error(err.message || "An unexpected error occured, try again.");
    },
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const dataObject = Object.fromEntries(formData) as unknown as Todo;
    const finalData = {
      ...dataObject,
      owner_id: user?.id as string,
      project_id: projectId,
    };
    mutation.mutate(finalData);
  };

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
      <div className="flex flex-col gap-y-2">
        <label aria-label="Todo status" htmlFor="is_finished">
          Todo status (finished / unfinished)
        </label>
        <select
          name="is_finished"
          id="no"
          className="border-secondary bg-background rounded-md border-2 p-2"
        >
          <option id="no" value={"no"}>
            Unfinished
          </option>
          <option id="yes" value={"yes"}>
            Finished
          </option>
        </select>
      </div>

      <button aria-label="submit button" type="submit" className="btn">
        {mutation.isPending ? "Creating Todo..." : " Submit"}
      </button>
    </form>
  );
};

export default AddTodoForm;
