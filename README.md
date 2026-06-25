# Backend — Teman Berbagi (API)

Server API (Express + MongoDB/Mongoose + JWT). Folder ini di-deploy ke **Render** (gratis).

## Jalankan lokal
```bash
npm install
npm run seed     # isi data awal ke database (lihat MONGO_URI di .env)
npm start        # API di http://localhost:5000/api
```
Uji: buka `http://localhost:5000/api/health` → muncul `{"success":true,...}`.

## Variabel lingkungan (.env)
| Key | Keterangan |
|-----|------------|
| `MONGO_URI` | Alamat MongoDB Atlas (sertakan nama database, mis. `/teman_berbagi`) |
| `JWT_SECRET` | Kunci rahasia untuk token login |
| `NODE_ENV` | `development` / `production` |
| `PORT` | Lokal saja. Di Render JANGAN diisi (otomatis). |

## Deploy ke Render
1. Push proyek ke GitHub.
2. Render → New + → **Web Service** → connect repo.
3. **Root Directory**: `backend` (jika repo berisi tiga folder). Jika folder ini jadi repo sendiri, kosongkan.
4. **Build Command**: `npm install`  •  **Start Command**: `npm start`  •  **Instance**: Free.
5. **Environment Variables**: isi `MONGO_URI`, `JWT_SECRET`, `NODE_ENV=production`.
6. Deploy → dapat alamat `https://....onrender.com`. Uji `/api/health`.

> Paket gratis Render "tidur" setelah ±15 menit; permintaan pertama setelah itu lambat ±30–60 detik (wajar).
