import supabase from "../supabase";

async function getUserProjects(userId: string) {
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .eq("owner_id", userId);
  return { projects, error };
}

async function getUserProject(projectId: string) {
  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("project_id", projectId);
  return { project, error };
}

async function upsertUserProject(formData: {
  owner_id: string;
  projectName: string;
  description: string;
}) {
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
  return { projects, error };
}

async function deleteUserProject(projectId: string) {
  const { data, error } = await supabase
    .from("projects")
    .delete()
    .eq("project_id", projectId);

  return { data, error };
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

  return { projects, error };
}

export {
  getUserProjects,
  upsertUserProject,
  deleteUserProject,
  updateUserProject,
  getUserProject,
};
