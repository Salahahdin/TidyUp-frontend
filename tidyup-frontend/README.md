# TidyUp Frontend

A modern task management application for household cleaning tasks. Built with React, TypeScript, Vite, and Material-UI.

## Features

- **Task Management** – Create, edit, delete, and mark tasks as complete
- **Priority Levels** – Organize tasks by LOW, MEDIUM, or HIGH priority
- **Progress Tracking** – Visual progress bar showing completed vs pending tasks
- **User Authentication** – JWT-based login with role-based access control
- **Admin Panel** – Manage users (admin role only)
- **Responsive Design** – Works on desktop and mobile devices

## Tech Stack

- **React 18** – UI library
- **TypeScript** – Type-safe JavaScript
- **Vite** – Fast build tool and dev server
- **Material-UI (MUI)** – Component library
- **React Router** – Client-side routing
- **Axios** – HTTP client

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Installation

```bash
cd tidyup-frontend
npm install
```

## Running Locally

### Option 1: Mock Mode (No Backend Required)

Create a `.env` file in the `tidyup-frontend` folder:

```env
VITE_MOCK_API=true
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:5173

**Demo credentials (mock mode):**
- Email: `admin@tidyup.pl` (admin role) or `user@tidyup.pl` (user role)
- Password: any value

### Option 2: With Spring Boot Backend

Create a `.env` file:

```env
VITE_API_URL=http://localhost:8080
VITE_MOCK_API=false
```

Make sure the backend is running on port 8080, then:

```bash
npm run dev
```

## Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

## Project Structure

```
src/
├── api/          # API calls (axios config, task/user endpoints)
├── components/   # Reusable UI components
│   ├── common/   # Button, Input, Navbar
│   ├── layout/   # MainLayout, Footer
│   └── tasks/    # TaskCard, TaskForm, TaskList
├── context/      # React Context (AuthContext)
├── pages/        # Page components (Dashboard, Login, Profile, Admin)
├── routes/       # Route guards (RequireAuth, RequireRole)
└── types/        # TypeScript type definitions
```

## License

MIT

