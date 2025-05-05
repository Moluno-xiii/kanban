import supabase from "../supabase";
import { TaskTypes, Task } from "./helperFunctions";

async function createTeamTask(
  assigned_by: Task["assigned_by"],
  status: Task["status"],
  team_id: Task["team_id"],
  admin_id: Task["admin_id"],
  super_admin_id: Task["super_admin_id"],
  title: Task["title"],
  description: Task["description"],
  organization_id: Task["organization_id"],
  team_name: Task["team_name"],
  assigned_to: Task["assigned_to"],
  assignee_id: Task["assignee_id"],
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
        organization_id,
        team_name,
      },
    ])

    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  return tasks;
}

async function getTeamTasks(team_id: string, status?: TaskTypes) {
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
    .eq("assigned_to", assignee_email)
    .order("created_at", { ascending: false });

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  const { data: tasks, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return tasks;
}

async function editTeamTaskStatus(
  status: string,
  task_id: string,
  date_finished: string,
) {
  const { data: task, error } = await supabase
    .from("team_tasks")
    .update([
      {
        status,
        date_finished,
      },
    ])
    .eq("id", task_id);

  if (error) {
    throw new Error(error.message);
  }
  return task;
}

async function getMemberFinishedTasks(assignee_email: string, team_id: string) {
  const { data: tasks, error } = await supabase
    .from("team_tasks")
    .select("*")
    .eq("team_id", team_id)
    .eq("assigned_to", assignee_email)
    .eq("status", "finished")
    .order("date_finished", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return tasks;
}

const deleteTasks = async (organization_id?: string, team_id?: string) => {
  let query = supabase.from("team_tasks").delete();

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
  checkIfTaskTitleExistsInTeam,
  createTeamTask,
  deleteTeamTask,
  getTeamTask,
  getTeamTasks,
  getUserTasks,
  editTeamTaskStatus,
  getMemberFinishedTasks,
  deleteTasks,
};
