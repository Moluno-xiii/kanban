import { createFileRoute } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import UserProfileForm from "../../../components/forms/UserProfileForm";
import useUserProfile from "../../../hooks/useUserProfile";
import Loading from "../../../components/ui/Loading";
import Error from "../../../components/ui/Error";
import { User } from "@supabase/supabase-js";
import { QueryClient } from "@tanstack/react-query";
import { getUserProfile } from "../../../utils/profile";

export const Route = createFileRoute("/dashboard/profile/")({
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
  pendingComponent: () => <Loading message="Loading user profile" />,
});

function RouteComponent() {
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    data: profileData,
    isLoading,
    error,
  } = useUserProfile(user?.id as string);
  const profile_picture =
    user?.user_metadata.avatar_url.length ||
    String(profileData?.profile_picture).length > 1;

  if (isLoading) return <Loading message="Loading user details" />;
  if (error) return <Error errorMessage={error.message} />;
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-row items-center justify-between gap-3">
        <span aria-label="user's email">{user?.email}</span>
        {profile_picture ? (
          <div className="ring-secondary m-2 size-20 rounded-full ring-2 ring-offset-2">
            <img
              src={
                profileData?.profile_picture || user?.user_metadata.avatar_url
              }
              className="w-full rounded-full bg-cover"
              alt="user profile picture"
            />
          </div>
        ) : (
          <span>No profile picture</span>
        )}
      </div>
      <UserProfileForm />
    </div>
  );
}
