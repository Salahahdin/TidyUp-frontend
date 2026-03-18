import api from './axiosConfig';
import { mockApi } from './mockData';
import type { Task, TaskInput, TaskUpdateInput } from '../types/task';

const useMock = import.meta.env.VITE_MOCK_API === 'true';

const TASKS_BASE = '/tasks';

type BackendTask = {
  task_id: string | number;
  title: string;
  description?: string;
  isDone: boolean;
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
  priority?: Task['priority'];
  location?: string;
};

const toFrontendTask = (task: BackendTask): Task => ({
  id: task.task_id,
  title: task.title,
  description: task.description,
  done: task.isDone,
  dueDate: task.dueDate,
  createdAt: task.createdAt,
  updatedAt: task.updatedAt,
  priority: task.priority,
  location: task.location,
});

export async function getTasks(userId: string | number): Promise<Task[]> {
  if (useMock) return mockApi.getTasks();
  const { data } = await api.get<BackendTask[]>(`${TASKS_BASE}/user/${userId}`);
  return data.map(toFrontendTask);
}

export async function createTask(userId: string | number, payload: TaskInput): Promise<Task> {
  if (useMock) return mockApi.createTask(payload);

  const requestPayload = {
    title: payload.title,
    description: payload.description,
    dueDate: payload.dueDate,
    priority: payload.priority,
    location: payload.location,
  };

  const { data } = await api.post<BackendTask>(`${TASKS_BASE}/user/${userId}`, requestPayload);
  return toFrontendTask(data);
}

export async function updateTask(id: string | number, payload: TaskUpdateInput): Promise<Task> {
  if (useMock) return mockApi.updateTask(id, payload);
  throw new Error('Task update endpoint is not available in backend yet.');
}

export async function deleteTask(id: string | number): Promise<void> {
  if (useMock) { await mockApi.deleteTask(id); return; }
  await api.delete(`${TASKS_BASE}/${id}`);
}

export async function toggleTaskDone(id: string | number, done: boolean): Promise<Task> {
  if (useMock) return mockApi.toggleTaskDone(id, done);
  throw new Error('Task toggle endpoint is not available in backend yet.');
}
