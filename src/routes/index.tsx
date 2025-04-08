import { createFileRoute, Link } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { profileData } = useSelector((state: RootState) => state.userData);
  return (
    <div className="flex min-h-[calc(100dvh-150px)] flex-col items-center justify-center gap-y-6 text-center">
      <p className="text-3xl">
        Welcome to tasksphere, {profileData?.display_name || ""}
      </p>
      <div className="flex flex-col gap-y-3">
        <span>Organization solution for teams and personal projects</span>
        <button className="btn self-center" aria-label="get started button">
          {profileData?.display_name ? (
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
