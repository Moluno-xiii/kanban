import { createFileRoute } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import UserProfileForm from "../../../components/forms/UserProfileForm";
import Error from "../../../components/ui/Error";
import Loading from "../../../components/ui/Loading";
import useUserProfile from "../../../hooks/useUserProfile";
import { RootState } from "../../../store";

export const Route = createFileRoute("/dashboard/profile/")({
  component: RouteComponent,
  pendingComponent: () => <Loading message="Loading user profile" />,
});

function RouteComponent() {
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    data: profileData,
    isLoading,
    error,
  } = useUserProfile(user?.id as string);
  const profile_picture = String(profileData?.profile_picture).length > 1;

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
              className="h-full w-full rounded-full bg-cover"
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
