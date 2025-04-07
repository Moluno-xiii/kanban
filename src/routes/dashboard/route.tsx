import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import SideBar from "../../components/SideBar";
import Error from "../../components/ui/Error";
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

  if (loading) {
    return <Loading message="Loading dashboard data" />;
  }

  if (error) {
    return <Error errorMessage={error} />;
  }

  return (
    <div
      className={`mx-3 grid min-h-[calc(100dvh-110px)] max-w-dvw gap-5 overflow-hidden md:mx-6 ${
        isNavBarOpen ? "grid-cols-[300px_1fr]" : "grid-cols-1"
      }`}
    >
      {isNavBarOpen && (
        <aside aria-label="sidebar navigation" className="overflow-hidden">
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
