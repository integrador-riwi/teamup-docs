---
sidebar_position: 1
---

# Deployment Guide

TeamUp is deployed across two platforms:

| Layer | Platform | URL |
|-------|----------|-----|
| Frontend | Vercel | `https://team-up.crudzaso.com` |
| Backend | Railway | `https://back-end-production-7f2c.up.railway.app` |

---

## Backend — Railway

### Environment Variables

Set these in your Railway project dashboard:
```bash
# Database
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DBNAME

# Auth
JWT_SECRET=your_super_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret_here

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=https://back-end-production-7f2c.up.railway.app/api/auth/github/callback

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend
FRONTEND_URL=https://team-up.crudzaso.com
```

### Deploy

Railway auto-deploys on push to `main`. To deploy manually:
```bash
railway up
```

### Start Command
```bash
node src/index.js
```

---

## Frontend — Vercel

### Environment Variables

Set these in your Vercel project dashboard:
```bash
VITE_API_URL=https://back-end-production-7f2c.up.railway.app/api
```

### Deploy

Vercel auto-deploys on push to `main`. To deploy manually:
```bash
vercel --prod
```

### Build Command
```bash
npm run build
```

### Output Directory
```
dist
```

---

## Local Development

### Backend
```bash
git clone https://github.com/integrador-riwi/backend
cd backend
npm install
cp .env.example .env   # fill in your values
npm run dev
```

### Frontend
```bash
git clone https://github.com/integrador-riwi/frontend
cd frontend
npm install
cp .env.example .env   # fill in your values
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:3000`.