// User interface representing a registered user
export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
}

// Task interface for individual tasks
export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

// Permission interface for sharing functionality
export interface Permission {
  userId: string;
  type: 'view' | 'edit';
}

// TaskList interface representing a collection of tasks
export interface TaskList {
  id: string;
  title: string;
  tasks: Task[];
  permissions: Permission[];
}
