import supabase from "../supabase";

async function createTeamTask(
  assigned_by: string,
  status: "assigned" | "unassigned" | "finished",
  team_id: string,
  admin_id: string,
  super_admin_id: string,
  title: string,
  description: string,
  assigned_to?: string,
  assignee_id?: string,
) {
  const { data: tasks, error } = await supabase
    .from("team_tasks")
    .insert([
      {
        assigned_by,
        assigned_to,
        status,
        team_id,
        super_admin_id,
        admin_id,
        title,
        description,
        assignee_id,
      },
    ])

    .select("*");

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return tasks;
}

async function getTeamTasks(
  team_id: string,
  status?: "unfinished" | "unassigned" | "finished",
) {
  let query = supabase
    .from("team_tasks")
    .select("*")
    .eq("team_id", team_id)
    .order("created_at", { ascending: false });

  if (status) {
    query = query.ilike("status", status);
  }

  const { data: tasks, error } = await query;

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return tasks;
}

async function getTeamTask(task_id: string, team_id: string) {
  const { data: task, error } = await supabase
    .from("team_tasks")
    .select("*")
    .eq("id", task_id)
    .eq("team_id", team_id);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return task;
}

async function checkIfTaskTitleExistsInTeam(
  task_title: string,
  team_id: string,
) {
  const { data: task, error } = await supabase
    .from("team_tasks")
    .select("*")
    .eq("team_id", team_id)
    .ilike("title", task_title);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return task.length ? true : false;
}

async function deleteTeamTask(task_id: string, team_id: string) {
  const { data: tasks, error } = await supabase
    .from("team_tasks")
    .delete()
    .eq("id", task_id)
    .eq("team_id", team_id)
    .select();

  if (error) throw new Error(error.message);

  return tasks;
}

async function getUserTasks(
  assignee_email: string,
  team_id: string,
  status?: string,
) {
  let query = supabase
    .from("team_tasks")
    .select("*")
    .eq("team_id", team_id)
    .eq("assigned_to", assignee_email);

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  const { data: tasks, error } = await query;

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return tasks;
}

export {
  checkIfTaskTitleExistsInTeam,
  createTeamTask,
  deleteTeamTask,
  getTeamTask,
  getTeamTasks,
  getUserTasks,
};
