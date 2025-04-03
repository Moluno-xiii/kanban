import { createFileRoute, Link } from "@tanstack/react-router";
import { IoMdArrowBack } from "react-icons/io";

export const Route = createFileRoute(
  "/dashboard/personal_projects/$project_id",
)({
  component: RouteComponent,
  loader: () => {},
  errorComponent: () => <div>Could not Load note's content, try again.</div>,
  pendingComponent: () => <div>Loading note data...</div>,
});

function RouteComponent() {
  const { project_id } = Route.useParams();
  return (
    <div className="flex flex-col gap-y-6">
      <Link
        to="/dashboard/personal_projects"
        className="text-primary hover:text-primary/70 flex w-fit flex-row items-center gap-x-3 transition-all duration-300"
      >
        <IoMdArrowBack />
        Go Back
      </Link>
      {project_id}
    </div>
  );
}
