import type { Task } from '../types/task';
import type { User } from '../types/user';

// ─────────────────────────────────────────────────────────────────────────────
// Mock data - używane gdy VITE_MOCK_API=true
// ─────────────────────────────────────────────────────────────────────────────

export const mockUsers: User[] = [
  { id: 1, email: 'admin@tidyup.pl', name: 'Admin', role: 'ADMIN', active: true, createdAt: '2025-01-01' },
  { id: 2, email: 'jan@tidyup.pl', name: 'Jan Kowalski', role: 'USER', active: true, createdAt: '2025-01-10' },
  { id: 3, email: 'anna@tidyup.pl', name: 'Anna Nowak', role: 'USER', active: false, createdAt: '2025-01-15' },
];

export const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Posprzątać kuchnię',
    description: 'Umyć naczynia, wyczyścić blaty, zamieść podłogę',
    done: false,
    dueDate: '2026-02-05',
    createdAt: '2026-01-20',
    priority: 'HIGH',
    location: 'Kuchnia',
  },
  {
    id: 2,
    title: 'Odkurzyć salon',
    description: 'Odkurzyć dywan i kanapę',
    done: true,
    dueDate: '2026-01-28',
    createdAt: '2026-01-15',
    priority: 'MEDIUM',
    location: 'Salon',
  },
  {
    id: 3,
    title: 'Wynieść śmieci',
    description: '',
    done: false,
    dueDate: '2026-02-01',
    createdAt: '2026-01-30',
    priority: 'LOW',
    location: 'Korytarz',
  },
  {
    id: 4,
    title: 'Umyć okna',
    description: 'Wszystkie okna w mieszkaniu',
    done: false,
    dueDate: '2026-02-10',
    createdAt: '2026-01-25',
    priority: 'MEDIUM',
    location: 'Cały dom',
  },
];

export const mockCurrentUser: User = mockUsers[0];

// Symulacja sesji po stronie serwera (ciasteczko)
let sessionUser: User | null = null;

let taskIdCounter = mockTasks.length + 1;

// ─────────────────────────────────────────────────────────────────────────────
// Mock API helpers
// ─────────────────────────────────────────────────────────────────────────────

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

export const mockApi = {
  // Auth
  async login(email: string, _password: string) {
    await delay();
    const user = mockUsers.find((u) => u.email === email);
    if (!user) throw new Error('Invalid credentials');

    // Ustawiamy sesję
    sessionUser = user;

    return { token: 'mock-jwt-token', user };
  },

  async logout() {
    await delay();
    sessionUser = null;
  },

  // Users
  async getMe() {
    await delay();
    if (!sessionUser) {
      // Symulacja błędu 401 Unauthorized
      throw new Error('Unauthorized - simulate 401');
    }
    return { ...sessionUser };
  },

  async updateMe(payload: { name?: string; email?: string }) {
    await delay();
    if (!sessionUser) throw new Error('Unauthorized');

    // Aktualizujemy mockCurrentUser ORAZ sessionUser (bo to ten sam obiekt w pamięci mocka)
    // W prawdziwym mocku warto byłoby dbać o referencje, ale tutaj upraszczamy
    if (payload.name) sessionUser.name = payload.name;
    if (payload.email) sessionUser.email = payload.email;

    return { ...sessionUser };
  },

  async listUsers() {
    await delay();
    return [...mockUsers];
  },

  async updateUser(id: string | number, payload: { role?: string; active?: boolean }) {
    await delay();
    const user = mockUsers.find((u) => String(u.id) === String(id));
    if (!user) throw new Error('User not found');
    if (payload.role) user.role = payload.role as 'ADMIN' | 'USER';
    if (typeof payload.active === 'boolean') user.active = payload.active;
    return { ...user };
  },

  // Tasks
  async getTasks() {
    await delay();
    return [...mockTasks];
  },

  async createTask(payload: Omit<Task, 'id' | 'done' | 'createdAt'>) {
    await delay();
    const task: Task = {
      ...payload,
      id: taskIdCounter++,
      done: false,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    mockTasks.unshift(task);
    return { ...task };
  },

  async updateTask(id: string | number, payload: Partial<Task>) {
    await delay();
    const task = mockTasks.find((t) => String(t.id) === String(id));
    if (!task) throw new Error('Task not found');
    Object.assign(task, payload);
    return { ...task };
  },

  async deleteTask(id: string | number) {
    await delay();
    const idx = mockTasks.findIndex((t) => String(t.id) === String(id));
    if (idx !== -1) mockTasks.splice(idx, 1);
  },

  async toggleTaskDone(id: string | number, done: boolean) {
    await delay();
    const task = mockTasks.find((t) => String(t.id) === String(id));
    if (!task) throw new Error('Task not found');
    task.done = done;
    return { ...task };
  },
};
