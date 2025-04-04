import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const isAuthenticated = true;
  const route = isAuthenticated ? "/dashboard/overview" : "/auth/login";
  return (
    <div className="flex min-h-[calc(100dvh-150px)] flex-col items-center justify-center gap-y-6 text-center">
      <p className="text-3xl">Welcome to tasksphere</p>
      <div className="flex flex-col gap-y-3">
        <span>Organization solution for teams and personal projects</span>
        <button className="btn self-center">
          <Link to={route}>Get started</Link>
        </button>
      </div>
    </div>
  );
}
