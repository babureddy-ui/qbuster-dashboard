# QueueBuster Dashboard

A Next.js web dashboard for QueueBuster with session-based authentication, a centralized routing system for pages and API endpoints, and a Tailwind CSS design system aligned with QueueBuster branding.

**Repository:** [github.com/babureddy-ui/qbuster-dashboard](https://github.com/babureddy-ui/qbuster-dashboard)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Routing](#routing)
  - [Pages](#pages)
  - [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Styling & Theming](#styling--theming)
- [Scripts](#scripts)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Overview

QueueBuster Dashboard is a lightweight admin-style web application built on the Next.js App Router. It provides:

- A branded login screen at the root URL (`/`)
- Protected dashboard pages that require an active session
- A registry-based routing pattern so new pages and API handlers can be added without creating new Next.js route folders for every endpoint

The app uses React Server Components where appropriate (e.g. session checks on protected pages) and Client Components for interactive forms and buttons.

---

## Tech Stack


| Layer     | Technology                                                |
| --------- | --------------------------------------------------------- |
| Framework | [Next.js 16](https://nextjs.org) (App Router)             |
| UI        | [React 19](https://react.dev)                             |
| Styling   | [Tailwind CSS 4](https://tailwindcss.com)                 |
| Fonts     | [Geist](https://vercel.com/font) (via `next/font/google`) |
| Linting   | ESLint with `eslint-config-next`                          |
| Language  | JavaScript (JSX) with path aliases via `jsconfig.json`    |


---

## Features

- **Login flow** — Username/password form with validation, loading states, show/hide password toggle, and error messaging
- **Session cookies** — HTTP-only `session` cookie set on successful login (24-hour expiry)
- **Protected routes** — Server-side session check on the welcome page; unauthenticated users are redirected to `/`
- **Centralized page registry** — Add a page file and register it in one place; it becomes available at `/{key}`
- **Centralized API registry** — Add API handler modules and register them; they are served at `/api/{key}`
- **Dark mode** — CSS variables and Tailwind `dark:` variants; development mode syncs with the Next.js devtools theme toggle
- **QueueBuster branding** — Custom blue palette (`qb-blue`, `qb-blue-hover`) and logo asset

---

## Project Structure

```
qbuster-dashboard/
├── app/
│   ├── [...page]/              # Catch-all dynamic page router
│   │   └── page.jsx
│   ├── api/
│   │   ├── [...path]/          # Catch-all API dispatcher
│   │   │   └── route.js
│   │   ├── actions/
│   │   │   └── auth.js         # login handler + useLogin
│   │   ├── endpoints/
│   │   │   └── index.js        # API path constants
│   │   └── routes.js           # API route registry
│   ├── components/
│   │   ├── layout/
│   │   │   ├── DashboardShell.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── DevToolsThemeSync.jsx
│   │   └── buttions/
│   │       └── LoginForm.jsx
│   ├── pages/                  # Page modules (registered in routes.js)
│   │   ├── login.jsx           # Root login page (re-exported from app/page.js)
│   │   ├── dashboard.jsx       # Protected dashboard (sidebar + header)
│   │   └── routes.js           # Page route registry
│   ├── styles/
│   │   └── globals.css         # Tailwind imports & design tokens
│   ├── layout.js               # Root layout, fonts, metadata
│   └── page.js                 # Entry point → login page
├── public/
│   └── assets/
│       └── logonew.svg         # QueueBuster logo
├── eslint.config.mjs
├── jsconfig.json               # `@/*` → `./app/*` path alias
├── next.config.mjs
├── package.json
└── postcss.config.mjs
```

### Path Aliases

Imports use the `@/` prefix, mapped to the `app/` directory:

```js
import LoginForm from "@/components/buttions/LoginForm";
import { SESSION_COOKIE } from "@/api/utils/session";
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 18.18 or later (Node 20+ recommended for Next.js 16)
- npm, yarn, pnpm, or bun

### Installation

```bash
git clone https://github.com/babureddy-ui/qbuster-dashboard.git
cd qbuster-dashboard
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The login page loads at the root URL.

### Production Build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

---

## Routing

This project uses a **registry pattern** instead of one Next.js file per URL. Two catch-all routes dispatch to registered handlers.

### Pages


| URL | Page  | Auth   |
| --- | ----- | ------ |
| `/` | Login | Public |


**How it works**

1. `app/[...page]/page.jsx` reads the URL segments (e.g. `dashboard`).
2. It looks up the segment in `app/pages/routes.js`.
3. If found, it renders the registered component; otherwise it returns a 404.

**Add a new page**

1. Create a file under `app/pages/`, e.g. `dashboard.jsx`:

```jsx
export const metadata = {
  title: "Dashboard",
  description: "Main dashboard",
};

export default function Dashboard() {
  return <div>Dashboard content</div>;
}
```

1. Register it in `app/pages/routes.js`:

```js
import DashboardPage from "./dashboard";

export const pageRoutes = {
  dashboard: DashboardPage,  // → /dashboard
};
```

For protected pages, read the session cookie server-side (see `app/pages/dashboard.jsx` for the pattern).

### API Endpoints


| Method | Endpoint     | Description                         |
| ------ | ------------ | ----------------------------------- |
| `POST` | `/api/login` | Authenticate and set session cookie |


**How it works**

1. `app/api/[...path]/route.js` handles `GET`, `POST`, `PUT`, `PATCH`, and `DELETE`.
2. It resolves the path (e.g. `login`) against `app/api/routes.js`.
3. It calls the exported handler for the requested HTTP method.

**Add a new API**

1. Create a handler module, e.g. `app/api/users.js`:

```js
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ users: [] });
}
```

1. Register it in `app/api/routes.js`:

```js
import { login } from "./actions/auth";
import { someHandler } from "./someHandler";

export const apiRoutes = {
  login,
  users: someHandler,  // → /api/users
};
```

---

## Authentication

Authentication is **cookie-based**. Credentials are validated by the Cloudflare content server.

### Flow

1. User submits username and password via `LoginForm`.
2. `POST /api/login` proxies to `NEXT_PUBLIC_API_BASE_URL/api/login`.
3. On success, an HTTP-only `session` cookie is set (value = username, `maxAge` = 24 hours).
4. Client redirects to `/dashboard`.
5. `dashboard.jsx` reads the cookie on the server; missing session → redirect to `/`.

### Session Cookie Options


| Option     | Value                     |
| ---------- | ------------------------- |
| Name       | `session`                 |
| `httpOnly` | `true`                    |
| `secure`   | `true` in production only |
| `sameSite` | `lax`                     |
| `path`     | `/`                       |
| `maxAge`   | 86,400 seconds (24 hours) |


---

## Scripts


| Command         | Description                                |
| --------------- | ------------------------------------------ |
| `npm run dev`   | Start development server (with hot reload) |
| `npm run build` | Create an optimized production build       |
| `npm start`     | Serve the production build                 |
| `npm run lint`  | Run ESLint                                 |


---

## Configuration

### Environment

```env
NEXT_PUBLIC_API_BASE_URL=https://content-server-cloudflare.qbuster.workers.dev
```

### `next.config.mjs`

Minimal Next.js configuration. Extend here for redirects, rewrites, image domains, etc.

### `jsconfig.json`

Maps `@/`* to `./app/`* for cleaner imports across the codebase.
