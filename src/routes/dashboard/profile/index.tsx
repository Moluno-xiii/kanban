import { createFileRoute } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import UserProfileForm from "../../../components/forms/UserProfileForm";

export const Route = createFileRoute("/dashboard/profile/")({
  component: RouteComponent,
});
//  fetch all needed data for this component from one bucket only.
// use cloudinary to store user profile pictures. only save to cloudinary when user submits.
// if selected image exists, display preview image.
function RouteComponent() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { profileData } = useSelector((state: RootState) => state.userData);
  const profile_picture =
    user?.user_metadata.avatar_url.length ||
    String(profileData?.profile_picture).length > 1;
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-row items-center justify-between gap-3">
        <span aria-label="user's email">{user?.email}</span>
        {profile_picture ? (
          <div className="ring-primary m-2 size-20 rounded-full ring-2 ring-offset-2">
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
