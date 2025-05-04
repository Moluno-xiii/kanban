import supabase from "../supabase";

async function createTeam(
  admin_id: string,
  super_admin_id: string,
  name: string,
  description: string,
  organization_id: string,
) {
  const { data: teams, error } = await supabase
    .from("teams")
    .insert([{ super_admin_id, admin_id, name, description, organization_id }])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return teams;
}

async function deleteTeam(
  // deleter_id: string,
  team_id: string,
  // team_admin_id: string,
  // super_admin_id: string,
) {
  // if (deleter_id !== team_admin_id && deleter_id !== super_admin_id) {
  //   throw new Error("You're not athorized to make this action.");
  // }
  // delete all team tasks and members along with this.
  const { data: teams, error } = await supabase
    .from("teams")
    .delete()
    .eq("id", team_id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return teams;
}

async function getTeams(super_admin_id: string, organization_id: string) {
  const { data: teams, error } = await supabase
    .from("teams")
    .select("*")
    .eq("organization_id", organization_id)
    .eq("super_admin_id", super_admin_id);

  if (error) {
    throw new Error(error.message);
  }

  return teams;
}

async function getTeam(team_id: string) {
  const { data: teams, error } = await supabase
    .from("teams")
    .select("*")
    .eq("id", team_id);

  if (error) {
    throw new Error(error.message);
  }

  return teams;
}

async function getAdminTeams(admin_id: string, organization_id: string) {
  const { data: teams, error } = await supabase
    .from("teams")
    .select("*")
    .eq("admin_id", admin_id)
    .eq("organization_id", organization_id);

  if (error) {
    throw new Error(error.message);
  }
  return teams;
}

async function deleteOrganizationTeams(organization_id: string) {
  const { data, error } = await supabase
    .from("teams")
    .delete()
    .eq("organization_id", organization_id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export {
  createTeam,
  deleteTeam,
  getTeam,
  getTeams,
  getAdminTeams,
  deleteOrganizationTeams,
};
