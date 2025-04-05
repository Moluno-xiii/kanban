import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import SideBar from "../../components/SideBar";
import Loading from "../../components/ui/Loading";
import { useNavbarContext } from "../../contexts/NavContext";
import useAuthGuard from "../../hooks/useAuthGuard";
import { RootState } from "../../store";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
  pendingComponent: () => Loading({ message: "Loading dashboard data" }),
});

function RouteComponent() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { isNavBarOpen } = useNavbarContext();
  const { loading, error } = useAuthGuard();
  const navigate = useNavigate();

  if (loading) {
    return <Loading message="Loading dashboard data" />;
  }

  if (error) {
    return (
      <div className="flex min-h-dvh min-w-dvw flex-col items-center justify-center gap-y-4 text-red-600">
        <p>Something went wrong: {error}</p>
        <span
          className="btn"
          onClick={() => navigate({ to: "/auth/login", replace: true })}
        >
          Reload the page and try again.
        </span>
      </div>
    );
  }

  return (
    <div
      className={`mx-3 grid min-h-[calc(100dvh-110px)] max-w-dvw gap-5 overflow-hidden md:mx-6 ${
        isNavBarOpen ? "grid-cols-[300px_1fr]" : "grid-cols-1"
      }`}
    >
      {isNavBarOpen && (
        <aside className="overflow-hidden">
          <SideBar />
        </aside>
      )}
      <main className="mx-auto w-full max-w-7xl rounded-lg">
        {user?.email}
        <Outlet />
      </main>
    </div>
  );
}
