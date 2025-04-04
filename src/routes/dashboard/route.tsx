import {
  createFileRoute,
  getRouteApi,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";
import SideBar from "../../components/SideBar";
import { useNavbarContext } from "../../contexts/NavContext";
import { getUser } from "../../utils/auth";
import Loading from "../../components/ui/Loading";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
  loader: async () => await getUser(),
  pendingComponent: () => Loading({ message: "Loading..." }),
});

function RouteComponent() {
  const routeApi = getRouteApi("/dashboard");
  const userData = routeApi.useLoaderData();
  const { isNavBarOpen } = useNavbarContext();
  const navigate = useNavigate();

  if (
    userData?.aud !== "authenticated" ||
    !userData.user_metadata.email_verified
  ) {
    alert("You have to be logged in to access this route");
    navigate({ to: "/auth/login", replace: true });
  }
  const isAuthenticated = userData?.aud === "authenticated";

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
        <div className="flex flex-col gap-y-3">
          <span>{userData?.email}</span>
          <span>{userData?.user_metadata.full_name}</span>
          <img
            className="size-20 rounded-full ring-1 ring-red-600 ring-offset-2"
            src={userData?.user_metadata.avatar_url}
            alt="user image"
          />
        </div>
        <Outlet />
      </main>
    </div>
  );
}
