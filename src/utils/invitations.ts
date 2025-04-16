import supabase from "../supabase";

async function createOrganizationInvitation(
  organization_id: string,
  invitee_email: string,
  message: string,
  role: string,
  inviter_id: string,
  organization_name: string,
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
        organization_name,
      },
    ])
    .select();

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return { organization, error };
}

async function getUserInvitations(userEmail: string) {
  const { data: organization_invitations, error } = await supabase
    .from("organization_invitations")
    .select("*")
    .eq("invitee_email", userEmail)
    .eq("type", "invitation")
    .eq("invitation_status", "pending")
    .eq("read", false);
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

async function updateInvitationStatus(value: string, id: string) {
  const { data: organization_invitations, error } = await supabase
    .from("organization_invitations")
    .update({ invitation_status: value })
    .eq("id", id);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return organization_invitations;
}

async function markInvitationAsRead(id: string) {
  const { data: organization_invitations, error } = await supabase
    .from("organization_invitations")
    .update({ read: true })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return organization_invitations;
}

async function getOrganizationInvitations(
  organization_id: string,
  admin_id: string,
) {
  const { data: organization_invitations, error } = await supabase
    .from("organization_invitations")
    .select("*")
    .eq("organization_id", organization_id)
    .eq("inviter_id", admin_id);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return organization_invitations;
}

async function cancelInvitation(id: string) {
  const { error } = await supabase
    .from("organization_invitations")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return;
}

export {
  createOrganizationInvitation,
  getUserInvitation,
  getUserInvitations,
  getOrganizationInvitations,
  cancelInvitation,
  markInvitationAsRead,
  updateInvitationStatus,
};
