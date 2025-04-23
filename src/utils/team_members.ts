import supabase from "../supabase";

async function deleteMemberFromTeam(member_id: string, team_id: string) {
  const { data, error } = await supabase
    .from("team_members")
    .delete()
    .eq("member_id", member_id)
    .eq("team_id", team_id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

async function getTeamMembers(team_id: string) {
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .eq("team_id", team_id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

async function getTeamMemberRole(member_id: string, team_id: string) {
  const { data: role, error } = await supabase
    .from("team_members")
    .select("role")
    .eq("team_id", team_id)
    .eq("member_id", member_id);

  if (error) {
    throw new Error(error.message);
  }

  return role;
}

async function addMemberToTeam(
  member_id: string,
  team_id: string,
  organization_id: string,
  super_admin_id: string,
  member_email: string,
  team_name: string,
  role: string,
  admin_id: string,
) {
  const { data: members, error } = await supabase
    .from("team_members")
    .insert([
      {
        member_id,
        team_id,
        organization_id,
        super_admin_id,
        member_email,
        team_name,
        role,
        admin_id,
      },
    ])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return members;
}

async function getMemberTeams(organization_id: string, member_id: string) {
  const { data: teams, error } = await supabase
    .from("team_members")
    .select("*")
    .eq("member_id", member_id)
    .eq("organization_id", organization_id);

  if (error) {
    throw new Error(error.message);
  }

  return teams;
}
// member_id, team_id, organization_id, super_admin_id, member_email, team_name, role, admin_id
// assignTaskToMember

export {
  deleteMemberFromTeam,
  getTeamMembers,
  getTeamMemberRole,
  addMemberToTeam,
  getMemberTeams,
};

// primary_key, member_id, created_at, team_id, organization_id, role, super_admin_id, member_email, team_name
