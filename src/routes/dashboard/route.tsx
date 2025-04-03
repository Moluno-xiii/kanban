import { createFileRoute, Outlet } from "@tanstack/react-router";
import SideBar from "../../components/SideBar";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-3 grid min-h-[calc(100dvh-110px)] grid-cols-[300px_1fr] gap-5 md:mx-6">
      <aside>
        <SideBar />
      </aside>
      <main className="mx-auto w-full max-w-7xl rounded-lg">
        <Outlet />
      </main>
    </div>
  );
}
