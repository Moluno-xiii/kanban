import {
  createFileRoute,
  Link,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Loading from "../../components/ui/Loading";
import { RootState } from "../../store";
import { getUser } from "../../utils/auth";

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
  loader: async () => await getUser(),
  pendingComponent: () => Loading({ message: "Loading..." }),
});

function RouteComponent() {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const isAuthenticated = user?.aud === "authenticated";
  const isEmailVerified = user?.user_metadata?.email_verified;

  useEffect(() => {
    if (isAuthenticated || isEmailVerified) {
      toast.success("Redirect successful");
      navigate({ to: "/dashboard/overview", replace: true });
    }
  }, [isAuthenticated, isEmailVerified, navigate]);

  return (
    <main className="flex min-h-[calc(100dvh-150px)] flex-col items-center justify-center gap-y-6">
      <div className="flex flex-row items-center justify-center">
        <Link
          className="[&.active]:bg-secondary bg-primary hover:bg-primary/80 flex rounded-md px-4 py-2 capitalize transition-all duration-300 [&.active]:font-bold"
          to="/auth/login"
        >
          Login
        </Link>
        <Link
          className="[&.active]:bg-secondary bg-primary hover:bg-primary/80 flex rounded-md px-4 py-2 capitalize transition-all duration-300 [&.active]:font-bold"
          to="/auth/signup"
        >
          Signup
        </Link>
      </div>
      <Outlet />
    </main>
  );
}
