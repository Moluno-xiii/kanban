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

// ADD DELETE SUBMISSION FOR USER
// FETCHING SUBMISSIONS SHOULD HAVE A STATUS PROPERTY, SO THE USER CAN FETCH BASED ON THE STATUS WHERE NEEDED.
// USE SUBROUTES FOR TEAM TASK SUBMISSIONS 'under review', 'rejected', 'accepted'
// ALSO, USE DELETE SUBMISSIONS SHOULD ONLY WORK FOR ACCEPTED SUBMISSIONS, AND REJECTED SUBMISSIONS.

// user submits a task, it goes to the db as a submission.
// admin reviews the task marks the task as accepted or rejected, with additional review note.
// user can see the review when it's marked as accepted or rejected with the additional review note.
// if task is rejected, task is still unfinished, else marked as finished.
// task submissions will get all submissions with the task id and team id, so one task can have several submissions and several reviews.

export {
  deleteUserSubmission,
  getAllTeamTaskSubmissions,
  getAllUserSubmissions,
  getAllUserTeamTaskSubmissions,
  getTaskSubmissions,
  reviewTaskSubmission,
  submitTask,
};
