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
  invited_by: string | null;
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
  role: "admin" | "member" | "super admin";
  super_admin_id: string;
}

interface TeamMember {
  admin_id: string;
  created_at: string;
  member_email: string;
  member_id: string;
  organization_id: string;
  primary_key: string;
  role: "Member" | "super admin" | "admin";
  super_admin_id: string;
  team_id: string;
  team_name: string;
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

interface TeamType {
  admin_id: string;
  created_at: string;
  description: string;
  id: string;
  name: string;
  organization_id: string;
  super_admin_id: string;
}

interface Task {
  admin_id: string;
  assigned_by: string;
  assigned_to: string;
  created_at: string;
  description: string;
  id: string;
  status: "assigned" | "unfinished" | "finished";
  super_admin_id: string;
  team_id: string;
  title: string;
  date_finished: string;
}

interface TeamTaskSubmission {
  id: string;
  created_at: string;
  team_id: string;
  status: "under review" | "rejected" | "accepted";
  submitted_by: string;
  additional_submission_note: string;
  task_id: string;
  super_admin_id: string;
  admin_id: string;
  additional_review_note: string;
  reviewed_at: string;
}

type TaskTypes = "finished" | "unfinished" | "unassigned";

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
  TeamType,
  Task,
  TeamTaskSubmission,
  TaskTypes,
  TeamMember,
};
