# Backend blueprint for Sistem Informasi Transparansi Kegiatan Mahasiswa

Quick setup

1. Copy `.env.example` to `.env` and update DB/JWT settings.
2. Install deps: `npm install` (already done)
3. Start dev: `npm run dev`

Structure highlights

- `models/` Sequelize models
- `controllers/` business logic
- `middlewares/` auth, rbac, uploads
- `routes/` express routes

Endpoints (examples)

- `POST /api/auth/register` - register
- `POST /api/auth/login` - login -> returns JWT
- `POST /api/proposals` - create proposal (role organisasi or admin)
- `POST /api/reports/upload` - upload LPJ files (auth)
- `GET /api/admin/dashboard` - admin overview (role admin)
