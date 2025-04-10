interface Todo {
  id: string;
  created_at: string;
  project_id: string;
  title: string;
  is_finished: "yes" | "no";
  owner_id: string;
}

interface Project {
  owner_id: string;
  project_id: string;
  created_at: string;
  project_name: string;
  description: string;
}

export function dateToString(date: string) {
  const dateString = new Date(date).toLocaleString();
  return dateString;
}
export type { Project, Todo };
