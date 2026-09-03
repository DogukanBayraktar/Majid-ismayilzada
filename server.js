require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');

const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Hassas dosyaların dışarıya servis edilmesini engelle (güvenlik)
const BLOCKED_EXACT = [
  '/.gitignore',
  '/server.js',
  '/package.json',
  '/package-lock.json',
  '/data/admin-pass.json'
];
const BLOCKED_PREFIX = [
  '/.git',
  '/.env',
  '/node_modules',
  '/routes',
  '/utils',
  '/middleware',
  '/views'
];
app.use((req, res, next) => {
  const normalized = path.posix.normalize(decodeURIComponent(req.path || '/'));
  const blocked = BLOCKED_EXACT.includes(normalized) || BLOCKED_PREFIX.some(seg => normalized.startsWith(seg));
  if (blocked) return res.status(404).send('Sayfa bulunamadı.');
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/admin-assets', express.static(path.join(__dirname, 'admin-assets'), { index: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'degistir-beni-cok-uzun-rastgele-bir-cumle-yazin',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 4 } // 4 saat
  })
);

app.use('/admin', adminRoutes);

// data/*.js ve js/*.js panelden değişebilen içerikler olduğu için cache'lenmemeli.
// Aksi halde panele kaydedilen değişiklik tarayıcıda eski önbellekten okunur ("güncellenmiyor" sorunu).
const noCache = { setHeaders(res) { res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate'); res.setHeader('Pragma', 'no-cache'); res.setHeader('Expires', '0'); } };
app.use('/data', express.static(path.join(__dirname, 'data'), noCache));
app.use('/js', express.static(path.join(__dirname, 'js'), noCache));

// Mevcut site (tasarım aynen) statik olarak servis edilir
app.use(express.static(path.join(__dirname), { index: 'index.html' }));

app.use((req, res) => {
  res.status(404).send('Sayfa bulunamadı.');
});

app.listen(PORT, () => {
  console.log(`Site çalışıyor: http://localhost:${PORT}`);
  console.log(`Admin paneli: http://localhost:${PORT}/admin/login`);
});