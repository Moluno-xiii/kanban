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
) {
  const { data: tasks, error } = await supabase
    .from("team_tasks")
    .insert([
      {
        assigned_by: assigned_by,
        assigned_to: assigned_to,
        status: status,
        team_id: team_id,
        super_admin_id: super_admin_id,
        admin_id: admin_id,
        title: title,
        description: description,
      },
    ])

    .select("*");

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return tasks;
}

async function getTeamTasks(team_id: string) {
  const { data: tasks, error } = await supabase
    .from("team_tasks")
    .select("*")
    .eq("team_id", team_id);

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

async function checkIfTaskTitleExistsInTeam(task_title: string) {
  const { data: task, error } = await supabase
    .from("team_tasks")
    .select()
    .eq("title", task_title);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return task.length ? true : false;
}

// const getUserFinishedTasks()

export {
  createTeamTask,
  getTeamTasks,
  getTeamTask,
  checkIfTaskTitleExistsInTeam,
};
