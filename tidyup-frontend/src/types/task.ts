export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | '';

export interface Task {
  id: string | number;
  title: string;
  description?: string;
  done: boolean;
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
  done?: boolean;
}
