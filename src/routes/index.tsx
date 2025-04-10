import { createFileRoute, Link } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import useUserProfile from "../hooks/useUserProfile";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: profileData } = useUserProfile(user?.id as string);
  return (
    <div className="flex min-h-[calc(100dvh-150px)] flex-col items-center justify-center gap-y-6 text-center">
      <p className="text-3xl">
        Welcome to tasksphere,{" "}
        {user?.id ? profileData?.display_name || "User" : ""}
      </p>
      <div className="flex flex-col gap-y-3">
        <span>Organization solution for teams and personal projects</span>
        <button className="btn self-center" aria-label="get started button">
          {profileData?.display_name || user?.id ? (
            <Link aria-label="link to signup page" to={"/dashboard/overview"}>
              Continue
            </Link>
          ) : (
            <Link aria-label="link to signup page" to={"/auth/signup"}>
              Get started
            </Link>
          )}
        </button>
      </div>
    </div>
  );
}
