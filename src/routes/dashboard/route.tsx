import { createFileRoute, Outlet } from "@tanstack/react-router";
import SideBar from "../../components/SideBar";
import Error from "../../components/ui/Error";
import Loading from "../../components/ui/Loading";
import { useNavbarContext } from "../../contexts/NavContext";
import useAuthGuard from "../../hooks/useAuthGuard";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
  pendingComponent: () => Loading({ message: "Loading dashboard data" }),
});

function RouteComponent() {
  const { isNavBarOpen } = useNavbarContext();
  const { error } = useAuthGuard();

  if (error) {
    return <Error errorMessage={error} />;
  }

  return (
    <div
      className={`mx-3 grid min-h-[calc(100dvh-110px)] max-w-dvw gap-5 overflow-x-auto md:mx-6 lg:overflow-hidden ${
        isNavBarOpen
          ? "grid-cols-[200px_1fr] sm:grid-cols-[300px_1fr]"
          : "grid-cols-1 lg:grid-cols-[300px_1fr]"
      }`}
    >
      <aside
        aria-label="sidebar navigation"
        className={`overflow-y-hidden ${isNavBarOpen ? "block h-full" : "hidden h-0 lg:block lg:h-full"}`}
      >
        <SideBar />
      </aside>
      <main className="mx-auto max-w-[2000px] min-w-full overflow-y-scroll rounded-lg px-1">
        <Outlet />
      </main>
    </div>
  );
}
