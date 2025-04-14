import supabase from "../supabase";

async function createOrganizationInvitation(
  organization_id: string,
  invitee_email: string,
  message: string,
  role: string,
  inviter_id: string,
) {
  const { data: organization, error } = await supabase
    .from("organization_invitations")
    .upsert([
      {
        read: false,
        organization_id,
        invitee_email,
        type: "invitation",
        message,
        invitation_status: "pending",
        role,
        inviter_id,
      },
    ])
    .select();

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  console.log(organization);
  return { organization, error };
}

async function getUserInvitations(userEmail: string) {
  const { data: organization_invitations, error } = await supabase
    .from("organization_invitations")
    .select("*")
    .eq("invitee_email", userEmail)
    .eq("type", "invitation");
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return organization_invitations;
}

async function getUserInvitation(id: string) {
  const { data: organization_invitations, error } = await supabase
    .from("organization_invitations")
    .select("*")
    .eq("id", id);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return organization_invitations;
}

export { getUserInvitations, createOrganizationInvitation, getUserInvitation };
