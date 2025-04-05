import {
  createFileRoute,
  Link,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";
import Loading from "../../components/ui/Loading";
import { useEffect } from "react";
import toast from "react-hot-toast";
import useAuthGuard from "../../hooks/useAuthGuard";
// import { getSession, getUser } from "../../utils/auth";

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
  pendingComponent: () => Loading({ message: "Loading..." }),
});

function RouteComponent() {
  const { loading, error, user } = useAuthGuard();
  const navigate = useNavigate();
  const isAuthenticated = user?.aud === "authenticated";
  const isEmailVerified = user?.user_metadata?.email_verified;
  // const [isLoading, setIsLoading] = useState(false);

  // async function test() {
  //   try {
  //     setIsLoading(true);
  //     console.log("fetch started");
  //     const { user: data, error } = await getUser();
  //     console.log(data);

  //     if (error) throw new Error(error.message);
  //   } catch (error: unknown) {
  //     const message =
  //       error instanceof Error ? error.message : "unexpected error";
  //     console.error(message);
  //     throw new Error(message);
  //   } finally {
  //     setIsLoading(false);
  //     console.log("finished");
  //   }
  // }

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
    return (
      <div className="flex min-h-dvh min-w-dvw flex-col items-center justify-center gap-y-4 text-red-600">
        <p>Something went wrong: {error}</p>
        <span onClick={() => navigate({ to: "/auth/login", replace: true })}>
          Reload the page and try again.
        </span>
      </div>
    );
  }
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
        {/* <button className="btn" onClick={test}>
          {!isLoading ? "test" : "loading..."}
        </button> */}
      </div>
      <Outlet />
    </main>
  );
}
