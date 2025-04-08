import supabase from "../supabase";

async function getUserProfile(userId: string) {
  const { data: user_details, error } = await supabase
    .from("user_details")
    .select("*")
    .eq("id", userId);
  return { user_details, error };
}

async function upsertUserProfile(formData: {
  id: string;
  display_name: string;
  profile_picture: string;
}) {
  const { data, error } = await supabase
    .from("user_details")
    .upsert([
      {
        id: formData.id,
        display_name: formData.display_name,
        profile_picture: formData.profile_picture,
      },
    ])
    .select();

  return { data, error };
}

export { getUserProfile, upsertUserProfile };
