import supabase from "../supabase";

async function createOrganizationInvitation(
  organization_id: string,
  invitee_email: string,
  message: string,
  role: string,
  inviter_id: string,
  organization_name: string,
  invited_by: string,
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
        invited_by,
      },
    ])
    .select();

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return { organization, error };
}

async function getUserInvitations(userEmail: string, status?: boolean) {
  let query = supabase
    .from("organization_invitations")
    .select("*")
    .eq("invitee_email", userEmail)
    .eq("type", "invitation")
    .eq("invitation_status", "pending");

  if (status === true || status === false) {
    query = query.eq("read", status);
  }

  const { data: organization_invitations, error } = await query;

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
    .eq("inviter_id", admin_id)
    .order("created_at", { ascending: false });

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

async function deleteOrganizationInvitations({
  organization_id,
  super_admin_id,
}: {
  organization_id: string;
  super_admin_id: string;
}) {
  const { error } = await supabase
    .from("organization_invitations")
    .delete()
    .eq("organization_id", organization_id)
    .eq("inviter_id", super_admin_id);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return;
}

async function checkIfInvitationExists(
  invitee_email: string,
  organization_id: string,
) {
  const { data: invitation, error } = await supabase
    .from("organization_invitations")
    .select("*")
    .eq("organization_id", organization_id)
    .eq("invitee_email", invitee_email)
    .eq("invitation_status", "pending");

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return invitation?.length ? true : false;
}

async function deleteUserInvitations(invitee_email: string, status?: boolean) {
  let query = supabase
    .from("organization_invitations")
    .delete()
    .eq("invitee_email", invitee_email);

  if (status === true || status === false) {
    query = query.eq("read", status);
  }

  const { data: invitations, error } = await query;
  console.log("Deleting invitations for:", invitee_email, status);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return invitations;
}

export {
  createOrganizationInvitation,
  getUserInvitation,
  getUserInvitations,
  getOrganizationInvitations,
  cancelInvitation,
  markInvitationAsRead,
  updateInvitationStatus,
  deleteOrganizationInvitations,
  checkIfInvitationExists,
  deleteUserInvitations,
};
