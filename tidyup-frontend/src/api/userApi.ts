import api from './axiosConfig';
import { mockApi } from './mockData';
import type { AuthResponse, LoginPayload, UpdateMePayload, UpdateUserPayload, User } from '../types/user';

const useMock = import.meta.env.VITE_MOCK_API === 'true';

const AUTH_BASE = '/auth';
const USERS_BASE = '/users';

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const username = payload.username || payload.email;
  if (!username) {
    throw new Error('Username is required');
  }

  if (useMock) return mockApi.login(username, payload.password);

  const { data } = await api.post<AuthResponse>(`${AUTH_BASE}/login`, {
    username,
    password: payload.password,
  });
  return data;
}

export async function logout(): Promise<void> {
  if (useMock) {
    if (mockApi.logout) await mockApi.logout();
    return;
  }
  await api.post(`${AUTH_BASE}/logout`);
}

export async function getMe(): Promise<User> {
  if (useMock) return mockApi.getMe();
  const { data } = await api.get<User>(`${AUTH_BASE}/me`);
  return data;
}

export async function updateMe(payload: UpdateMePayload): Promise<User> {
  if (useMock) return mockApi.updateMe(payload);
  const { data } = await api.put<User>(`${USERS_BASE}/me`, payload);
  return data;
}

export async function listUsers(): Promise<User[]> {
  if (useMock) return mockApi.listUsers();
  const { data } = await api.get<User[]>(USERS_BASE);
  return data;
}

export async function updateUser(id: string | number, payload: UpdateUserPayload): Promise<User> {
  if (useMock) return mockApi.updateUser(id, payload) as Promise<User>;
  const { data } = await api.patch<User>(`${USERS_BASE}/${id}`, payload);
  return data;
}
