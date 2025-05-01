import supabase from "../supabase";
import { deleteAllProjectTodos } from "./todo";

async function getUserProjects(userId: string) {
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .eq("owner_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  // return { projects, error };
  return projects;
}

async function getUserProject(projectId: string) {
  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("project_id", projectId);

  if (error) {
    throw new Error(error.message);
  }

  // return { project, error };
  return project;
}

async function upsertUserProject(formData: {
  owner_id: string;
  projectName: string;
  description: string;
}) {
  const checkDuplicate = await checkIfProjectNameExistsForUser(
    formData.projectName,
    formData.owner_id,
  );

  if (checkDuplicate)
    throw new Error(
      "You already have a project with this name, change the name and try again.",
    );
  const { data: projects, error } = await supabase
    .from("projects")
    .upsert([
      {
        owner_id: formData.owner_id,
        project_name: formData.projectName,
        description: formData.description,
      },
    ])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  // return { projects, error };
  return projects;
}

async function deleteUserProject(projectId: string) {
  await deleteAllProjectTodos(projectId);

  const { data, error } = await supabase
    .from("projects")
    .delete()
    .eq("project_id", projectId);

  if (error) throw new Error(error.message);

  return data;
  // return { data, error };
}

async function updateUserProject(
  projectId: string,
  formData: {
    owner_id: string;
    project_name: string;
  },
) {
  const { data: projects, error } = await supabase
    .from("projects")
    .update({
      owner_id: formData.owner_id,
      project_name: formData.project_name,
    })
    .eq("project_id", projectId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  // return { projects, error };
  return projects;
}

const checkIfProjectNameExistsForUser = async (
  project_name: string,
  user_id: string,
) => {
  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .ilike("project_name", project_name)
    .eq("owner_id", user_id);

  if (error) {
    throw new Error(error.message);
  }
  return project.length ? true : false;
};

export {
  getUserProjects,
  upsertUserProject,
  deleteUserProject,
  updateUserProject,
  getUserProject,
  checkIfProjectNameExistsForUser,
};
