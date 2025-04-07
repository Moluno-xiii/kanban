import { createFileRoute, getRouteApi, Link } from "@tanstack/react-router";
import { IoMdArrowBack } from "react-icons/io";
import { loadProject, Project, Todo } from "../../../utils/helperFunctions";
import Loading from "../../../components/ui/Loading";

export const Route = createFileRoute(
  "/dashboard/personal_projects/$project_id",
)({
  component: RouteComponent,
  loader: async ({ params }) => await loadProject(params.project_id),
  errorComponent: () => <div>Could not Load page content, try again.</div>,
  pendingComponent: () => Loading({ message: "Loading Project Details" }),
});

function RouteComponent() {
  const { project_id } = Route.useParams();
  const routeApi = getRouteApi("/dashboard/personal_projects/$project_id");
  const project: Project = routeApi.useLoaderData();
  return (
    <div className="flex flex-col gap-y-6">
      <Link
        aria-label="go back"
        to="/dashboard/personal_projects"
        className="text-secondary hover:text-primary/70 flex w-fit flex-row items-center gap-x-3 transition-all duration-300"
      >
        <IoMdArrowBack />
        Go Back
      </Link>
      <div className="flex flex-col gap-y-3">
        <span className="text-xl">Project name : {project.projectName}</span>
        <span>Project Id : {project_id}</span>
        <span>Number of Todos : {project.todos?.length || 0}</span>
        <span>Date created : {project.dateCreated}</span>

        <ul className="flex flex-col gap-y-2">
          {project.todos?.map((todo: Todo) => (
            <li
              key={todo.id}
              className="border-secondary flex w-fit flex-col gap-y-2 rounded-md border p-2"
            >
              <span aria-label="todo title">{todo.title}</span>
              <span>Completed : {todo.completed}</span>
              <span>Date created : {todo.dateCreated}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
