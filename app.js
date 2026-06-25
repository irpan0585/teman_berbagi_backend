/**
 * app.js
 * ─────────────────────────────────────────────────────────────
 * Konfigurasi Express Application (KHUSUS API).
 * Frontend di-deploy terpisah (mis. Vercel), jadi backend ini
 * hanya menyediakan RESTful API — tidak lagi menyajikan halaman.
 * ─────────────────────────────────────────────────────────────
 */

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const { errorHandler, notFound } = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/auth');
const donasiRoutes = require('./routes/donasi');
const transaksiRoutes = require('./routes/transaksi');
const kontakRoutes = require('./routes/kontak');
const pilarRoutes = require('./routes/pilar');
const userRoutes = require('./routes/user');

const app = express();

/* ─── Middleware Global ───────────────────────────────────── */

// CORS — izinkan semua origin (frontend bisa berada di domain lain, mis. Vercel).
// Token dikirim lewat header Authorization (bukan cookie), sehingga aman.
app.use(cors());

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logger
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Folder upload (jika dipakai)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/* ─── API Routes ─────────────────────────────────────────── */
app.use('/api/auth', authRoutes);
app.use('/api/donasi', donasiRoutes);
app.use('/api/transaksi', transaksiRoutes);
app.use('/api/kontak', kontakRoutes);
app.use('/api/pilar', pilarRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Teman Berbagi API berjalan dengan baik!',
    timestamp: new Date().toISOString(),
  });
});

// Halaman akar — info singkat (bukan frontend)
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Teman Berbagi API. Gunakan endpoint /api/...',
    health: '/api/health',
  });
});

/* ─── Error Handling ─────────────────────────────────────── */
app.use(notFound);
app.use(errorHandler);

module.exports = app;
