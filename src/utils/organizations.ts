import supabase from "../supabase";
import { addMemberToOrganization } from "./members";

const getAdminUserOrganizations = async (user_id: string) => {
  const { data: organizations, error } = await supabase
    .from("organizations")
    .select("*")
    .eq("super_admin_id", user_id);

  return { organizations, error };
};

const getOrganizationDetails = async (organization_id: string) => {
  const { data, error } = await supabase
    .from("organizations")
    .select("*")
    .eq("id", organization_id);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return data;
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

const upsertAdminUserOrganization = async (
  formData: {
    super_admin_id: string;
    name: string;
    description: string;
  },
  super_admin_email: string,
) => {
  const { data: organization, error } = await supabase
    .from("organizations")
    .upsert([
      {
        super_admin_id: formData.super_admin_id,
        name: formData.name,
        description: formData.description,
        super_admin_email,
      },
    ])
    .select();

  if (organization) {
    await addMemberToOrganization(
      organization[0].id,
      formData.super_admin_id,
      "super admin",
      formData.super_admin_id,
      super_admin_email,
      formData.name,
    );
  }
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return organization;
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

  if (error) {
    throw new Error(error.message);
  }

  return { error };
};

const checkIfOrganizationNameExistsForUser = async (
  organization_name: string,
  user_id: string,
) => {
  const { data: organization, error } = await supabase
    .from("organizations")
    .select("*")
    .ilike("name", organization_name)
    .eq("super_admin_id", user_id);

  if (error) {
    throw new Error(error.message);
  }
  return organization.length ? true : false;
};

const updateOrganizationDetails = async (
  organization_id: string,
  super_admin_id: string,
  name: string,
  description: string,
) => {
  const { data: organization, error } = await supabase
    .from("organizations")
    .update({
      name,
      description,
    })
    .eq("id", organization_id)
    .eq("super_admin_id", super_admin_id)
    .select("*");

  if (error) throw new Error(error.message);

  return organization;
};

export {
  getAdminUserOrganizations,
  upsertAdminUserOrganization,
  deleteAdminUserOrganization,
  getAdminUserOrganization,
  getOrganizationDetails,
  checkIfOrganizationNameExistsForUser,
  updateOrganizationDetails,
};
