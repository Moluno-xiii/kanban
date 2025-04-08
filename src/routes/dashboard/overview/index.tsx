import { createFileRoute } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export const Route = createFileRoute("/dashboard/overview/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { profileData } = useSelector((state: RootState) => state.userData);

  return (
    <div className="flex flex-col gap-y-4">
      <span
        aria-label="welcome message with"
        className="text-secondary text-xl capitalize md:text-2xl"
      >
        Welcome, {profileData?.display_name || "User"}
      </span>
    </div>
  );
}
