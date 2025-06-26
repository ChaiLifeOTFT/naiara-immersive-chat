# GPT‑4 Immersive Chat (Quest Ready)

## Setup

1. Clone and unzip this project.
2. Add your OpenAI key to `backend/.env` (copy from `.env.example`).
3. Start servers:

```bash
# Backend
cd backend
cp .env.example .env
npm install
npm start

# Frontend (in another terminal)
cd ../frontend
npm install
npm start
```

## Access on Quest 3

On your Meta Quest browser, visit:

```
http://192.168.50.48:5174
```

Ensure both servers are running and you're on the same Wi-Fi network.

## Dynamic Config

You can update the IP anytime using:
- `REACT_APP_BACKEND_URL` in frontend `.env`
- `FRONTEND_ORIGIN` in backend `.env`

This avoids hardcoded IP if your router changes addresses.
