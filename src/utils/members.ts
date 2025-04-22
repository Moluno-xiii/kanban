import supabase from "../supabase";

async function addMemberToOrganization(
  organization_id: string,
  member_id: string,
  role: string,
  super_admin_id: string,
  member_email: string,
  organization_name: string,
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
        organization_name,
      },
    ])
    .select();

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return members;
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

async function getOrganizationMember(
  organization_id: string,
  member_id: string,
) {
  const { data: member, error } = await supabase
    .from("organization_members")
    .select("*")
    .eq("organization_id", organization_id)
    .eq("member_id", member_id);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return member;
}

async function getOrganizations(user_id: string) {
  const { data, error } = await supabase
    .from("organization_members")
    .select("organization_name, primary_key, organization_id")
    .eq("member_id", user_id)
    .neq("super_admin_id", user_id);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return data;
}

async function deleteMemberFromOrganization(
  deleter_id: string,
  member_role: string,
  member_id: string,
  super_admin_id: string,
  organization_id: string,
) {
  if (deleter_id === member_id) {
    throw new Error("You cannot delete yourself from the organization");
  }

  if (member_role.toLowerCase() === "super admin") {
    throw new Error("You cannot remove a super admin from an organization.");
  }

  if (super_admin_id.toLowerCase() !== deleter_id) {
    throw new Error("You're not authorized to make this action.");
  }
  const { error } = await supabase
    .from("organization_members")
    .delete()
    .eq("member_id", member_id)
    .eq("organization_id", organization_id);
  if (error) {
    throw new Error(error.message);
  }
}

async function deleteOrganizationMembers(
  deleter_id: string,
  super_admin_id: string,
  organization_id: string,
) {
  if (super_admin_id.toLowerCase() !== deleter_id) {
    throw new Error("You're not authorized to make this action.");
  }
  const { error } = await supabase
    .from("organization_members")
    .delete()
    .eq("organization_id", organization_id);
  if (error) {
    throw new Error(error.message);
  }
}

async function leaveOrganization(deleter_id: string, organization_id: string) {
  const { error } = await supabase
    .from("organization_members")
    .delete()
    .eq("member_id", deleter_id)
    .eq("organization_id", organization_id);
  if (error) {
    throw new Error(error.message);
  }
}

async function getMemberRole(member_id: string, organization_id: string) {
  const { data: role, error } = await supabase
    .from("organization_members")
    .select("role")
    .eq("member_id", member_id)
    .eq("organization_id", organization_id);
  if (error) {
    throw new Error(error.message);
  }

  console.log(role[0].role);
  return role;
}

export {
  addMemberToOrganization,
  getOrganizationMembers,
  getOrganizations,
  deleteMemberFromOrganization,
  getOrganizationMember,
  deleteOrganizationMembers,
  leaveOrganization,
  getMemberRole,
};
