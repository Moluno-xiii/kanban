import supabase from "../supabase";

async function addMemberToOrganization(
  organization_id: string,
  member_id: string,
  role: string,
  super_admin_id: string,
  member_email: string,
) {
  const { data: members, error } = await supabase
    .from("organization_members")
    .insert([
      {
        member_id,
        role,
        organization_id,
        super_admin_id,
        member_email,
      },
    ])
    .select();

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return { members, error };
}

async function getOrganizationMembers(organization_id: string) {
  const { data: members, error } = await supabase
    .from("organization_members")
    .select("*")
    .eq("organization_id", organization_id);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return members;
}

export { addMemberToOrganization, getOrganizationMembers };
