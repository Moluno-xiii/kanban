import { createFileRoute } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export const Route = createFileRoute("/dashboard/profile/")({
  component: RouteComponent,
});
//  fetch all needed data for this component from one bucket only.
// use cloudinary to store user profile pictures. only save to cloudinary when user submits.
// if selected image exists, display preview image.
function RouteComponent() {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-row items-center justify-between gap-3">
        <span>{user?.email}</span>
        <img
          src=""
          className="ring-primary size-20 rounded-full ring-2 ring-offset-2"
          alt="user profile picture"
        />
      </div>
      <form
        className="border-secondary flex flex-col gap-y-3 rounded-md border p-2 md:p-4"
        aria-label="update profile form"
        action=""
      >
        <div className="flex flex-col gap-y-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            defaultValue={user?.email}
            name="email"
            id="email"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="name">Display name</label>
          <input
            type="text"
            // defaultValue={user?.email}
            name="name"
            id="name"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="profile_picture">Profile Picture</label>
          <input type="file" name="profile_picture" id="profile_picture" />
        </div>
        <button type="submit" className="btn w-fit">
          Save changes
        </button>
      </form>
    </div>
  );
}
