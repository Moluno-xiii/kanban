import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import SideBar from "../../components/SideBar";
import Loading from "../../components/ui/Loading";
import { useNavbarContext } from "../../contexts/NavContext";
import { RootState } from "../../store";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
  pendingComponent: () => Loading({ message: "Loading..." }),
});

function RouteComponent() {
  const { isNavBarOpen } = useNavbarContext();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const isAuthenticated = user?.aud === "authenticated";
  const isEmailVerified = user?.user_metadata?.email_verified;

  useEffect(() => {
    if (!isAuthenticated || !isEmailVerified) {
      toast.error("You have to be logged in to access this route");
      navigate({ to: "/auth/login", replace: true });
    }
  }, [isAuthenticated, isEmailVerified, navigate]);

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
