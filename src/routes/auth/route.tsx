import {
  createFileRoute,
  Link,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Error from "../../components/ui/Error";
import Loading from "../../components/ui/Loading";
import useAuthGuard from "../../hooks/useAuthGuard";

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
});

function RouteComponent() {
  const { loading, error, user } = useAuthGuard();
  const navigate = useNavigate();
  const isAuthenticated = user?.aud === "authenticated";
  const isEmailVerified = user?.user_metadata?.email_verified;

  useEffect(() => {
    if (isAuthenticated || isEmailVerified) {
      toast.success("Redirect successful");
      navigate({ to: "/dashboard/overview", replace: true });
    }
  }, [isAuthenticated, isEmailVerified, navigate, user]);

  if (loading) {
    return <Loading message="Loading authentication data" />;
  }

  if (error) {
    return <Error errorMessage={error} />;
  }
  return (
    <main className="flex min-h-[calc(100dvh-150px)] flex-col items-center justify-center gap-y-6">
      <div className="flex flex-row items-center justify-center">
        <Link
          aria-label="Link to login page"
          className="[&.active]:bg-secondary bg-primary hover:bg-primary/80 flex rounded-md px-4 py-2 capitalize transition-all duration-300 [&.active]:font-bold"
          to="/auth/login"
        >
          Login
        </Link>
        <Link
          aria-label="Link to signup page"
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
