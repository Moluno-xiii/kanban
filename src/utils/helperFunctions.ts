interface Todo {
  title: string;
  id: string;
  completed: "no" | "yes";
  dateCreated: string;
}

interface Project {
  projectName: string;
  projectId: string;
  descripton: string;
  dateCreated: string;
  todos?: Todo[];
}

async function loadProjects() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const projects = localStorage.getItem("projects");
  if (!projects) {
    localStorage.setItem("projects", JSON.stringify([]));
    return [];
  }
  return JSON.parse(projects);
}
async function loadProject(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const projects = localStorage.getItem("projects");
  if (!projects) {
    localStorage.setItem("projects", JSON.stringify([]));
    return [];
  }
  const project = JSON.parse(projects).find((p: Project) => p.projectId === id);
  return project;
}

async function addProject(formData: Project) {
  const projects = await loadProjects();
  projects.push(formData);
  console.log(formData);
  localStorage.setItem("projects", JSON.stringify(projects));
}

async function deleteProject(projectId: string) {
  const projects = await loadProjects();
  const updatedProjects = projects.filter(
    (project: Project) => project.projectId !== projectId,
  );
  localStorage.setItem("projects", JSON.stringify(updatedProjects));
}

async function addTodo(projectId: string, todoFormData: Todo) {
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

export {
  loadProjects,
  loadProject,
  addProject,
  deleteProject,
  addTodo,
  deleteTodo,
};
export type { Project, Todo };
