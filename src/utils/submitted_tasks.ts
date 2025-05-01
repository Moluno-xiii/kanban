import supabase from "../supabase";

async function submitTask(
  team_id: string,
  status: "under review" | "accepted" | "rejected",
  submitted_by: string,
  additional_note: string,
  task_id: string,
  super_admin_id: string,
  admin_id: string,
) {
  const { data: task, error } = await supabase
    .from("team_task_submissions")
    .insert([
      {
        team_id,
        status,
        submitted_by,
        additional_note,
        task_id,
        super_admin_id,
        admin_id,
      },
    ])
    .select("*");

  if (error) {
    throw new Error(error.message);
  }
  // ONLY WHEN SUBMISSION IS ACCEPTED  BY ADMIN, WILL TASK BE MARKED AS FINISHED
  return task;
}

export { submitTask };
