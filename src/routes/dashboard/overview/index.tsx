import { createFileRoute } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import useUserProfile from "../../../hooks/useUserProfile";
import { AppDispatch, RootState } from "../../../store";
import { getUserProfile } from "../../../utils/profile";
import { QueryClient } from "@tanstack/react-query";
import { User } from "@supabase/supabase-js";
import Loading from "../../../components/ui/Loading";

export const Route = createFileRoute("/dashboard/overview/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const { queryClient, store } = context as {
      queryClient: QueryClient;
      store: {
        getState: () => { auth: { user: User } };
        dispatch: AppDispatch;
      };
    };
    const user = store.getState().auth.user;
    return await queryClient.ensureQueryData({
      queryKey: ["user-profile", user?.id],
      queryFn: () => getUserProfile(user?.id as string),
    });
  },
  pendingComponent: () => <Loading message="Loading user details" />,
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
        Welcome, {profileData?.display_name || "User"}
      </span>
    </div>
  );
}
