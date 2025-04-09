import { createFileRoute } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import useUserProfile from "../../../hooks/useUserProfile";

export const Route = createFileRoute("/dashboard/overview/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: profileData } = useUserProfile(user?.id as string);

  return (
    <div className="flex flex-col gap-y-4">
      <span
        aria-label="welcome message with"
        className="text-secondary text-xl capitalize md:text-2xl"
      >
        Welcome, {profileData.display_name || "User"}
      </span>
    </div>
  );
}
