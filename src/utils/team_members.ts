import supabase from "../supabase";

async function deleteMemberFromTeam(member_id: string, team_id: string) {
  const { data, error } = await supabase
    .from("team_members")
    .delete()
    .eq("team_id", team_id)
    .eq("member_id", member_id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

async function getTeamMembers(team_id: string, organization_id: string) {
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .eq("team_id", team_id)
    .eq("organization_id", organization_id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

async function getTeamMember(member_id: string, team_id: string) {
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .eq("team_id", team_id)
    .eq("member_id", member_id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

async function getTeamMemberRole(member_id: string, team_id: string) {
  const { data: role, error } = await supabase
    .from("team_members")
    .select("role,organization_id,team_name")
    .eq("team_id", team_id)
    .eq("member_id", member_id);

  if (error) {
    throw new Error(error.message);
  }

  return role;
}

async function addMemberToTeam({
  member_id,
  member_email,
  team_id,
  super_admin_id,
  organization_id,
  team_name,
  role,
  admin_id,
}: {
  member_id: string;
  team_id: string;
  organization_id: string;
  super_admin_id: string;
  member_email: string;
  team_name: string;
  role: string;
  admin_id: string;
}) {
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
    .eq("organization_id", organization_id)
    .eq("role", "Member");

  if (error) {
    throw new Error(error.message);
  }

  return teams;
}

async function checkIfMemberExistsInTeam(member_id: string, team_id: string) {
  const { data: user, error } = await supabase
    .from("team_members")
    .select("member_id")
    .eq("member_id", member_id)
    .eq("team_id", team_id);
  if (error) {
    throw new Error(error.message);
  }

  return user.length ? true : false;
}

async function changeTeamMemberRole(
  role: "admin" | "member",
  member_id: string,
  team_id: string,
) {
  const { data: member, error } = await supabase
    .from("team_members")
    .update([
      {
        role,
      },
    ])
    .eq("team_id", team_id)
    .eq("member_id", member_id)
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  return member;
}

async function deleteMembers(organization_id?: string, team_id?: string) {
  let query = supabase.from("team_members").delete();

  if (organization_id) {
    query = query.eq("organization_id", organization_id);
  }
  if (team_id) {
    query = query.eq("team_id", team_id);
  }
  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export {
  deleteMemberFromTeam,
  getTeamMembers,
  getTeamMemberRole,
  addMemberToTeam,
  getMemberTeams,
  checkIfMemberExistsInTeam,
  getTeamMember,
  changeTeamMemberRole,
  deleteMembers,
};
