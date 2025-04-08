import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { setError } from "../../store/authSlice";
import { useAppDispatch } from "../../store/hooks";
import { upsertUserProfile } from "../../utils/profile";
import ImageUpload from "../ImageUpload";
import { setUserData } from "../../store/userDataSlice";

const UserProfileForm: React.FC = () => {
  const { user, error } = useSelector((state: RootState) => state.auth);
  const { profileData } = useSelector((state: RootState) => state.userData);
  const [imageUrl, setImageUrl] = useState<string>(
    (profileData?.profile_picture as string) || user?.user_metadata.avatar_url,
  );
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const submitProfileForm = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsLoading(true);
      dispatch(setError({ message: "" }));
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const dataObject = Object.fromEntries(formData) as {
        profile_picture: string;
        display_name: string;
        id: string;
      };
      const finalData = { ...dataObject, profile_picture: imageUrl };
      const { data, error: supabaseError } = await upsertUserProfile(finalData);
      if (data) {
        dispatch(setUserData({ data: data[0] }));
      }
      if (supabaseError) throw new Error(supabaseError.message);
      toast.success("profile updated successfully!!");
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "An unexpected error occured, try again";
      dispatch(setError({ message }));
    } finally {
      setIsLoading(false);
    }
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
      </div>
      <input type="hidden" name="id" id="id" defaultValue={user?.id} />
      <button aria-label="submit button" type="submit" className="btn w-fit">
        {isLoading ? "Uploading changes..." : "Save changes"}
      </button>
    </form>
  );
};

export default UserProfileForm;
