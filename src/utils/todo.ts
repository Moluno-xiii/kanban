import supabase from "../supabase";

async function getProjectTodos(project_id: string) {
  const { data: todos, error } = await supabase
    .from("Todos")
    .select("*")
    .eq("project_id", project_id);
  return { todos, error };
}

async function upsertProjectTodo(formData: {
  owner_id: string;
  name: string;
  is_finished: boolean;
  project_id: string;
}) {
  const { data: todos, error } = await supabase
    .from("Todos")
    .upsert([
      {
        owner_id: formData.owner_id,
        name: formData.name,
        is_finished: formData.is_finished,
        project_id: formData.project_id,
      },
    ])
    .select();

  return { todos, error };
}

async function deleteProjectTodo(id: string) {
  const { error } = await supabase.from("Todos").delete().eq("id", id);

  return { error };
}

async function updateProjectTodo(
  id: string,
  formData: {
    owner_id: string;
    name: string;
    is_finished: boolean;
    project_id: string;
  },
) {
  const { data: projects, error } = await supabase
    .from("Todos")
    .update({
      owner_id: formData.owner_id,
      name: formData.name,
      is_finished: formData.is_finished,
      project_id: formData.project_id,
    })
    .eq("id", id)
    .select();

  return { projects, error };
}
async function markProjectAsFinished(
  id: string,
  formData: {
    is_finished: boolean;
  },
) {
  const { data: projects, error } = await supabase
    .from("Todos")
    .update({
      is_finished: formData.is_finished,
    })
    .eq("id", id)
    .select();

  return { projects, error };
}

export {
  getProjectTodos,
  upsertProjectTodo,
  deleteProjectTodo,
  updateProjectTodo,
  markProjectAsFinished,
};
