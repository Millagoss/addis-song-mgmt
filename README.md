# Addis Song Management (MERN)

A lightweight MERN application to manage songs. This is a pnpm workspace monorepo with separate `backend/` (Express + MongoDB + TypeScript) and `frontend/` (React + Vite + TypeScript) packages.

## Tech Stack

- **Backend**: Node.js, Express, TypeScript, Mongoose
- **Frontend**: React, Vite, Redux Toolkit, Redux-Saga
- **Database**: MongoDB
- **Dev tooling**: pnpm workspaces, Docker, Docker Compose

## Repository Structure

```
.
├─ backend/            # Express API (TypeScript)
├─ frontend/           # React app (Vite + TS)
├─ docker-compose.yml  # MongoDB + API for local dev
└─ pnpm-workspace.yaml # Workspace configuration
```

## Prerequisites

- Node.js 20+
- pnpm (Corepack recommended): `corepack enable && corepack prepare pnpm@latest --activate`
- Docker & Docker Compose (optional but recommended for running MongoDB + API quickly)

## Environment Variables

Create `.env` files from the provided examples and adjust as needed:

- `backend/.env` (from `backend/.env.example`):

  - `PORT` (default `5000`)
  - `MONGO_URI` (e.g. `mongodb://localhost:27017/songs_db` or Compose value)
  - `CORS_ORIGIN` (e.g. `http://localhost:5173`)

- `frontend/.env` (from `frontend/.env.example`):
  - `VITE_API_BASE_URL` (e.g. `http://localhost:5000`)

## Quick Start (Recommended)

This flow runs MongoDB and the API via Docker Compose, and the frontend locally via Vite.

1. Copy env files

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

2. Start MongoDB + API (backend) with Docker Compose

```bash
docker compose up -d
```

This:

- Starts `mongo` on `27017`
- Builds and runs the API on `http://localhost:5000`
  - `MONGO_URI=mongodb://mongo:27017/songs_db`
  - `CORS_ORIGIN=http://localhost:5173`

3. Install workspace dependencies

```bash
pnpm install
```

4. Start the frontend

```bash
pnpm --filter frontend dev
# or from ./frontend
# pnpm dev
```

Open http://localhost:5173. The app will call the API at `VITE_API_BASE_URL`.

## Alternative: Run everything locally (no Docker)

1. Start MongoDB locally (ensure it listens on `mongodb://localhost:27017`)

2. Backend

```bash
cp backend/.env.example backend/.env
pnpm --filter backend install
pnpm --filter backend dev
# or from ./backend
# pnpm install && pnpm dev
```

API will be at `http://localhost:5000` by default.

3. Frontend

```bash
cp frontend/.env.example frontend/.env
pnpm --filter frontend install
pnpm --filter frontend dev
# or from ./frontend
# pnpm install && pnpm dev
```

## Seeding Data (optional)

If a seeding script is implemented, you can run:

```bash
pnpm --filter backend seed
# or from ./backend
# pnpm seed
```

## Build & Production

### Backend

```bash
pnpm --filter backend build   # emits dist/
pnpm --filter backend start   # runs node dist/server.js (requires .env)
```

Environment variables required in production: `PORT`, `MONGO_URI`, `CORS_ORIGIN`.

You can also build a container using `backend/Dockerfile` or adapt `docker-compose.yml` for production.

### Frontend

```bash
pnpm --filter frontend build  # outputs dist/
pnpm --filter frontend preview -- --port 5173  # local preview
```

Serve `frontend/dist/` with any static web server. Ensure `VITE_API_BASE_URL` points to your API URL before building.

## Useful Scripts

- **Backend** (`backend/package.json`): `dev`, `build`, `start`, `seed`
- **Frontend** (`frontend/package.json`): `dev`, `build`, `preview`

## Troubleshooting

- **CORS issues**: Ensure `backend/.env` has `CORS_ORIGIN=http://localhost:5173` (or your frontend origin).
- **API not reachable**: Verify `VITE_API_BASE_URL` in `frontend/.env` and that the backend is listening on that URL.
- **Mongo connection errors**: Check `MONGO_URI`. With Compose it should be `mongodb://mongo:27017/songs_db`; locally `mongodb://localhost:27017/songs_db`.
- **Port conflicts**: Change `PORT` in backend or Vite dev port via `vite` options if 5000/5173 are in use.
