import supabase from "../supabase";

const getAdminUserOrganizations = async (user_id: string) => {
  const { data: organizations, error } = await supabase
    .from("organizations")
    .select("*")
    .eq("super_admin_id", user_id);

  return { organizations, error };
};

const getAdminUserOrganization = async (
  user_id: string,
  organization_id: string,
) => {
  const { data: organizations, error } = await supabase
    .from("organizations")
    .select("*")
    .eq("super_admin_id", user_id)
    .eq("id", organization_id);
  if (error) throw new Error(error.message);
  return { organizations };
};

const upsertAdminUserOrganization = async (formData: {
  super_admin_id: string;
  name: string;
  description: string;
}) => {
  const { data: organization, error } = await supabase
    .from("organizations")
    .upsert([
      {
        super_admin_id: formData.super_admin_id,
        name: formData.name,
        description: formData.description,
      },
    ])
    .select();
  return { organization, error };
};

const deleteAdminUserOrganization = async (
  organization_id: string,
  user_id: string,
) => {
  const { error } = await supabase
    .from("organizations")
    .delete()
    .eq("super_admin_id", user_id)
    .eq("id", organization_id);

  return { error };
};

export {
  getAdminUserOrganizations,
  upsertAdminUserOrganization,
  deleteAdminUserOrganization,
  getAdminUserOrganization,
};

// id
// created_at
// super_admin_id
// name

// RLS policies.
// only super admins can crud.
