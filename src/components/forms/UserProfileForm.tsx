import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";
import useUserProfile from "../../hooks/useUserProfile";
import { RootState } from "../../store";
import { setError } from "../../store/authSlice";
import { useAppDispatch } from "../../store/hooks";
import { upsertUserProfile } from "../../utils/profile";
import ImageUpload from "../ImageUpload";
import Error from "../ui/Error";
import toast from "react-hot-toast";

const UserProfileForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, error } = useSelector((state: RootState) => state.auth);
  const { data: profileData, error: profileDataError } = useUserProfile(
    user?.id as string,
  );
  const [imageUrl, setImageUrl] = useState<string>(
    (profileData?.profile_picture as string) || user?.user_metadata.avatar_url,
  );

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: upsertUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile", user?.id] });
      toast.success("Profile updated successfully!");
    },
    onError: (err: { message: string }) => {
      const message =
        err instanceof Error ? err.message : "An unexpected error occured";
      dispatch(setError({ message: message }));
    },
  });

  if (profileDataError)
    return <Error errorMessage={profileDataError.message} />;

  const submitProfileForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(setError({ message: "" }));
    const formData = new FormData(event.currentTarget);
    const dataObject = Object.fromEntries(formData) as {
      profile_picture: string;
      display_name: string;
      id: string;
    };
    const finalData = { ...dataObject, profile_picture: imageUrl };
    mutation.mutate(finalData);
  };

  return (
    <form
      className="border-secondary flex flex-col gap-y-3 rounded-md border p-2 md:p-4"
      aria-label="update profile form"
      action=""
      onSubmit={submitProfileForm}
    >
      <div className="flex flex-col gap-y-2">
        <label htmlFor="display_name">Display name</label>
        <input
          type="text"
          defaultValue={(profileData?.display_name as string) || "Not set"}
          name="display_name"
          id="display_name"
          required
          minLength={3}
          aria-label="user display name input"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="profile_picture">Profile Picture</label>
        <ImageUpload
          error={error}
          storedImgUrl={imageUrl}
          onImageUpload={setImageUrl}
        />
        <span aria-label="upload instruction" className="text-xs sm:text-sm">
          Click on box above to upload image
        </span>
      </div>
      <input type="hidden" name="id" id="id" defaultValue={user?.id} />
      <button aria-label="submit button" type="submit" className="btn w-fit">
        {mutation.isPending ? "Uploading changes..." : "Save changes"}
      </button>
    </form>
  );
};

export default UserProfileForm;
