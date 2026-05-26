---
sidebar_position: 1
---

# Guía de despliegue

TeamUp se despliega en dos plataformas:

| Capa | Plataforma | URL |
|-------|------------|-----|
| Frontend | Vercel | `https://team-up.crudzaso.com` |
| Backend | Railway | `https://back-end-production-7f2c.up.railway.app` |

## Backend — Railway

### Variables de entorno

Configura estas variables en el dashboard de Railway:

```bash
# Base de datos
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

### Despliegue

Railway hace deploy automático al hacer push a `main`. Para desplegar manualmente:

```bash
railway up
```

### Comando de inicio

```bash
node src/index.js
```

## Frontend — Vercel

### Variables de entorno

Configura estas variables en el dashboard de Vercel:

```bash
VITE_API_URL=https://back-end-production-7f2c.up.railway.app/api
```

### Despliegue

Vercel hace deploy automático al hacer push a `main`. Para desplegar manualmente:

```bash
vercel --prod
```

### Comando de build

```bash
npm run build
```

### Directorio de salida

```
dist
```

## Desarrollo local

### Backend

```bash
git clone https://github.com/integrador-riwi/backend
cd backend
npm install
cp .env.example .env   # completa los valores
npm run dev
```

### Frontend

```bash
git clone https://github.com/integrador-riwi/frontend
cd frontend
npm install
cp .env.example .env   # completa los valores
npm run dev
```

El frontend corre en `http://localhost:5173` y el backend en `http://localhost:3000`.
