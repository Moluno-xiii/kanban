import useGetTaskSubmissions from "../hooks/useGetTaskSubmissions";
import { TeamTaskSubmission } from "../utils/helperFunctions";
import Submission from "./Submission";
import EmptyState from "./ui/EmptyState";
import Error from "./ui/Error";
import Loading from "./ui/Loading";

interface Props {
  task_id: string;
  team_id: string;
}

const TaskSubmissions: React.FC<Props> = ({ team_id, task_id }) => {
  const {
    data: submissions,
    error,
    isPending,
  } = useGetTaskSubmissions(task_id, team_id);

  if (isPending) return <Loading message={"Loading task description"} />;
  if (error) return <Error errorMessage={"Task doesn't exist."} />;
  if (submissions && !submissions.length && !error)
    return (
      <EmptyState
        button={false}
        emptyStateText="No submissions for this task yet, all submissions for this task will appear here."
      />
    );
  console.log(submissions);

  return (
    <div>
      <ul className="flex flex-col gap-y-4">
        {submissions?.map((submission: TeamTaskSubmission) => (
          <Submission key={submission.id} submission={submission} />
        ))}
      </ul>
    </div>
  );
};

export default TaskSubmissions;
