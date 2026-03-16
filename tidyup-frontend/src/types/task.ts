export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | '';

export interface Task {
  task_id: string | number;
  title: string;
  description?: string;
  isDone: boolean;
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
  priority?: TaskPriority;
  location?: string;
}

export interface TaskInput {
  title: string;
  description?: string;
  dueDate?: string;
  priority?: TaskPriority;
  location?: string;
}

export interface TaskUpdateInput extends TaskInput {
  isDone?: boolean;
}
