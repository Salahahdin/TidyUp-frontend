export type UserRole = 'ADMIN' | 'USER';

export interface User {
  id: string | number;
  email: string;
  name?: string;
  role: UserRole;
  active?: boolean;
  createdAt?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user?: User;
}

export interface UpdateMePayload {
  name?: string;
  email?: string;
}

export interface UpdateUserPayload {
  role?: UserRole;
  active?: boolean;
}
