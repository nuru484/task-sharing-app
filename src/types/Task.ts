// src/types/Task.ts
// src/types/Task.ts
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface TaskList {
  id: string;
  title: string;
  tasks: Task[];
}
