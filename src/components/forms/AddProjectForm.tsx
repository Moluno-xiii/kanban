import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { upsertUserProject } from "../../utils/project";

const AddProjectForm = ({
  handleModal,
}: {
  handleModal: (state: boolean) => void;
}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: upsertUserProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-projects", user?.id] });
      queryClient.refetchQueries({ queryKey: ["user-projects", user?.id] });
      handleModal(false);
      toast.success("Project created successfully!");
    },
    onError: (err: { message: string }) => {
      const message =
        err instanceof Error ? err.message : "An unexpected error occured";
      toast.error(message);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const dataObject = Object.fromEntries(formData) as unknown as {
      projectName: string;
      description: string;
      owner_id: string;
    };
    const finalData = { ...dataObject, owner_id: user?.id as string };
    mutation.mutate(finalData);
  };

  return (
    <form
      aria-label="add project form"
      className="flex flex-col gap-y-4"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-y-2">
        <label aria-label="project input title" htmlFor="projectName">
          Project name
        </label>
        <input
          aria-label="project name input box"
          required
          minLength={3}
          placeholder="e.g Jira tickets..."
          type="text"
          id="projectName"
          name="projectName"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <label
          aria-label="project description input title"
          htmlFor="projectName"
        >
          Description
        </label>
        <textarea
          aria-label="project description input box"
          name="description"
          id="description"
          title="Enter project description"
          required
        ></textarea>
      </div>
      <button aria-label="submit button" type="submit" className="btn">
        {mutation.isPending ? "Creating Project..." : "Submit"}
      </button>
    </form>
  );
};

export default AddProjectForm;
