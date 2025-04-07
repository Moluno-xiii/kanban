import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import GoBack from "../../../components/ui/GoBack";
import Loading from "../../../components/ui/Loading";
import { loadProject, Project, Todo } from "../../../utils/helperFunctions";

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
      <GoBack route={"/dashboard/personal_projects"} />
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
