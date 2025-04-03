interface Todo {
  name: string;
  id: string;
  completed: boolean;
}

interface Project {
  projectName: string;
  projectId: string;
  descripton: string;
  dateCreated: string;
}

async function loadProjects() {
  const projects = localStorage.getItem("projects");
  if (!projects) {
    localStorage.setItem("projects", JSON.stringify([]));
    return [];
  }
  return JSON.parse(projects);
}

async function addProject(formData: Project) {
  const projects = await loadProjects();
  projects.push(formData);
  localStorage.setItem("projects", JSON.stringify(projects));
}

async function deleteProject(projectId: string) {
  const projects = await loadProjects();
  const updatedProjects = projects.filter(
    (project: Project) => project.projectId !== projectId,
  );
  localStorage.setItem("projects", JSON.stringify(updatedProjects));
}

async function addTodo(
  projectId: string,
  todoFormData: { title: string; id: string; completed: boolean },
) {
  const projects = await loadProjects();
  const project = projects.find((p: Project) => p.projectId === projectId);

  if (!project) {
    console.error("Project not found");
    return;
  }

  if (!project.todos) {
    project.todos = [];
  }

  project.todos.push(todoFormData);
  localStorage.setItem("projects", JSON.stringify(projects));
}

async function deleteTodo(projectId: string, todoId: string) {
  const projects = await loadProjects();
  const projectIndex = projects.findIndex(
    (p: Project) => p.projectId === projectId,
  );

  if (!projects[projectIndex].todos) {
    console.error("No todos found for this project");
    return;
  }

  projects[projectIndex].todos = projects[projectIndex].todos.filter(
    (todo: Todo) => todo.id !== todoId,
  );

  localStorage.setItem("projects", JSON.stringify(projects));
}

export { loadProjects, addProject, deleteProject, addTodo, deleteTodo };
export type { Project, Todo };
