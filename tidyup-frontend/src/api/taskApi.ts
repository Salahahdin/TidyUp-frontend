import api from './axiosConfig';
import { mockApi } from './mockData';
import type { Task, TaskInput, TaskUpdateInput } from '../types/task';

const useMock = import.meta.env.VITE_MOCK_API === 'true';

const TASKS_BASE = '/tasks';

export async function getTasks(): Promise<Task[]> {
  if (useMock) return mockApi.getTasks();
  const { data } = await api.get<Task[]>(TASKS_BASE);
  return data;
}

export async function createTask(payload: TaskInput): Promise<Task> {
  if (useMock) return mockApi.createTask(payload);
  const { data } = await api.post<Task>(TASKS_BASE, payload);
  return data;
}

export async function updateTask(id: string | number, payload: TaskUpdateInput): Promise<Task> {
  if (useMock) return mockApi.updateTask(id, payload);
  const { data } = await api.put<Task>(`${TASKS_BASE}/${id}`, payload);
  return data;
}

export async function deleteTask(id: string | number): Promise<void> {
  if (useMock) { await mockApi.deleteTask(id); return; }
  await api.delete(`${TASKS_BASE}/${id}`);
}

export async function toggleTaskDone(id: string | number, done: boolean): Promise<Task> {
  if (useMock) return mockApi.toggleTaskDone(id, done);
  const { data } = await api.patch<Task>(`${TASKS_BASE}/${id}/done`, { done });
  return data;
}
