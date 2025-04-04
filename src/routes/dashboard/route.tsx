import { createFileRoute, Outlet } from "@tanstack/react-router";
import SideBar from "../../components/SideBar";
import { useNavbarContext } from "../../contexts/NavContext";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isNavBarOpen } = useNavbarContext();
  const isAuthenticated = true;

  return (
    <div
      className={`mx-3 grid min-h-[calc(100dvh-110px)] max-w-dvw gap-5 overflow-hidden md:mx-6 ${
        isNavBarOpen && isAuthenticated
          ? "grid-cols-[300px_1fr]"
          : "grid-cols-1"
      }`}
    >
      {isNavBarOpen && isAuthenticated && (
        <aside className="overflow-hidden">
          <SideBar />
        </aside>
      )}
      <main className="mx-auto w-full max-w-7xl rounded-lg">
        <Outlet />
      </main>
    </div>
  );
}
