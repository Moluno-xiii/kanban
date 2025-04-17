interface Todo {
  id: string;
  created_at: string;
  project_id: string;
  title: string;
  is_finished: "yes" | "no";
  owner_id: string;
}

interface Project {
  owner_id: string;
  project_id: string;
  created_at: string;
  project_name: string;
  description: string;
}

interface OrganizationType {
  id: string;
  created_at: string;
  super_admin_id: string;
  name: string;
  description: string;
}

interface InvitationNotification {
  created_at: string;
  id: string;
  invited_by: string;
  invitation_status: "pending" | "accepted" | "rejected";
  invitee_email: string;
  inviter_id: string;
  message: string;
  organization_id: string;
  read: boolean;
  role: "admin" | "member";
  type: string;
}

interface Member {
  created_at: string;
  member_email: string;
  member_id: string;
  organization_id: string;
  organization_name: string;
  primary_key: string;
  role: string;
  super_admin_id: string;
}

interface NotificationType {
  created_at: string;
  email: string;
  has_read: boolean;
  id: string;
  message: string;
  title: string;
  user_id: string;
}

export function dateToString(date: string) {
  const dateString = new Date(date).toLocaleString();
  return dateString;
}
export type {
  Project,
  Todo,
  OrganizationType,
  InvitationNotification,
  Member,
  NotificationType,
};
