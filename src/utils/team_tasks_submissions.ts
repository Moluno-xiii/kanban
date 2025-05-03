import supabase from "../supabase";
import { TeamTaskSubmission } from "./helperFunctions";

const submitTask = async (
  team_id: TeamTaskSubmission["team_id"],
  submitted_by: TeamTaskSubmission["submitted_by"],
  task_id: TeamTaskSubmission["task_id"],
  super_admin_id: TeamTaskSubmission["super_admin_id"],
  admin_id: TeamTaskSubmission["admin_id"],
  additional_submission_note?: TeamTaskSubmission["additional_submission_note"],
) => {
  const { data: submission, error } = await supabase
    .from("team_tasks_submissions")
    .insert([
      {
        team_id,
        status: "under review",
        submitted_by,
        task_id,
        super_admin_id,
        admin_id,
        additional_submission_note,
      },
    ]);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return submission;
};

const getTaskSubmissions = async (
  team_id: TeamTaskSubmission["team_id"],
  task_id: TeamTaskSubmission["task_id"],
) => {
  const { data: submissions, error } = await supabase
    .from("team_tasks_submissions")
    .select("*")
    .eq("team_id", team_id)
    .eq("task_id", task_id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return submissions;
};

const getAllUserTeamTaskSubmissions = async (
  submitted_by: TeamTaskSubmission["submitted_by"],
  team_id: TeamTaskSubmission["team_id"],
) => {
  const { data: submissions, error } = await supabase
    .from("team_tasks_submissions")
    .select("*")
    .eq("submitted_by", submitted_by)
    .eq("team_id", team_id);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return submissions;
};

const getAllTeamTaskSubmissions = async (
  team_id: TeamTaskSubmission["team_id"],
  status: TeamTaskSubmission["status"] | "under_review" | "all",
) => {
  let query = supabase
    .from("team_tasks_submissions")
    .select("*")
    .eq("team_id", team_id)
    .order("created_at", { ascending: false });

  if (status !== "all") {
    if (status === "under_review") {
      query = query.eq("status", "under review");
    } else {
      query = query.eq("status", status);
    }
  }

  const { data: submissions, error } = await query;

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return submissions;
};

const getAllUserSubmissions = async (
  user_email: TeamTaskSubmission["submitted_by"],
) => {
  const { data: submissions, error } = await supabase
    .from("team_tasks_submissions")
    .select("*")
    .eq("submtted_by", user_email);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return submissions;
};

const reviewTaskSubmission = async (
  id: TeamTaskSubmission["id"],
  reviewed_at: TeamTaskSubmission["reviewed_at"],
  status: TeamTaskSubmission["status"],
  additional_review_note?: TeamTaskSubmission["additional_review_note"],
  // when calling this task, remember to mark the task as finished in the tasks table.
) => {
  const { data: submission, error } = await supabase
    .from("team_tasks_submissions")
    .update({
      additional_review_note,
      reviewed_at,
      status,
    })
    .eq("id", id);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return submission;
};

const deleteUserSubmission = async (
  user_email: TeamTaskSubmission["submitted_by"],
  team_id: TeamTaskSubmission["team_id"],
  id: TeamTaskSubmission["id"],
) => {
  const { data: submissions, error } = await supabase
    .from("team_tasks_submissions")
    .delete()
    .eq("submitted_by", user_email)
    .eq("team_id", team_id)
    .eq("id", id);
  console.log(user_email, team_id, id);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return submissions;
};

const deleteSubmissions = async (
  organization_id?: string,
  team_id?: string,
) => {
  let query = supabase.from("team_tasks_submissions").delete();

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
};

export {
  deleteUserSubmission,
  getAllTeamTaskSubmissions,
  getAllUserSubmissions,
  getAllUserTeamTaskSubmissions,
  getTaskSubmissions,
  reviewTaskSubmission,
  submitTask,
  deleteSubmissions,
};
