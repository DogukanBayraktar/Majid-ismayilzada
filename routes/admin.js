'use strict';

const express = require('express');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const router = express.Router();

const requireAuth = require('../middleware/requireAuth');
const passStore = require('../utils/passStore');
const uploader = require('../utils/upload');
const githubSync = require('../utils/githubSync');
const parser = require('../utils/dataParser');

// ------------------------------------------------------------------
// Yardımcılar
// ------------------------------------------------------------------
function arrOf(req, key) {
  let v = req.body[key];
  if (v === undefined) {
    const stripped = key.replace(/\[\]$/, '');
    v = req.body[stripped];
  }
  if (v === undefined || v === null) return [];
  return Array.isArray(v) ? v : [v];
}

function buildRows(groups) {
  const len = Math.max(...groups.map(g => g.length), 0);
  const rows = [];
  for (let i = 0; i < len; i++) {
    const row = groups.map(g => (g[i] || '').trim());
    if (row.some(v => v !== '')) rows.push(row);
  }
  return rows;
}

const TURKISH_MAP = {
  ç: 'c', Ç: 'c', ğ: 'g', Ğ: 'g', ı: 'i', İ: 'i', I: 'i',
  ö: 'o', Ö: 'o', ş: 's', Ş: 's', ü: 'u', Ü: 'u'
};

function slugify(s) {
  const base = String(s || '')
    .replace(/[çÇğĞıİöÖşŞüÜI]/g, c => TURKISH_MAP[c] || c)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return base || 'kayit';
}

function parseContentBlocks(cTypes, cTexts) {
  return buildRows([cTypes, cTexts]).map(r => ({ type: r[0] || 'p', text: r[1] }));
}

// Dosyayı yere yazar ve GitHub'a yedekler. { backup: 'ok' | 'skip' | 'fail' }
function persist(pathname, contentText, message) {
  parser.writeText(pathname, contentText);
  parser.assertValidJs(contentText);

  let backup = 'skip';
  if (!githubSync.isConfigured()) return { backup };

  const relPath = pathname.split(/[\\/]/).slice(-2).join('/');
  try {
    githubSync.syncTextFile(relPath, contentText, message);
    backup = 'ok';
  } catch (e) {
    backup = 'fail';
  }
  return { backup };
}

function loadServices() {
  try {
    return parser.parseServicesFile();
  } catch (e) {
    return null;
  }
}

function loadBlog() {
  try {
    return parser.parseBlogFile();
  } catch (e) {
    return null;
  }
}

function loadSite() {
  try {
    return parser.parseSiteFile();
  } catch (e) {
    return null;
  }
}

// EJS'e güvenli JSON iletmek için: < işaretleri \u003c'e çevrilir (</script> atlamasını engeller).
function blob(obj) {
  return JSON.stringify(obj || {}).replace(/</g, '\\u003c');
}

// ------------------------------------------------------------------
// Giriş / Çıkış
// ------------------------------------------------------------------
router.get('/login', (req, res) => {
  if (req.session && req.session.isAdmin) return res.redirect('/admin');
  res.render('admin/login', { error: null });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const creds = passStore.current();

  const validUser = username === creds.username;
  const validPass = validUser && bcrypt.compareSync(password || '', creds.passwordHash);

  if (validUser && validPass) {
    req.session.isAdmin = true;
    return res.redirect('/admin/services');
  }
  res.render('admin/login', { error: 'Kullanıcı adı veya şifre hatalı.' });
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/admin/login'));
});

router.get('/', requireAuth, (req, res) => res.redirect('/admin/services'));

// ------------------------------------------------------------------
// Uzmanlıklar
// ------------------------------------------------------------------
router.get('/services', requireAuth, (req, res) => {
  const services = loadServices();
  res.render('admin/services/list', {
    active: 'services',
    services,
    loadError: services === null,
    saved: req.query.saved === '1',
    backup: req.query.backup || '',
    backupActive: githubSync.isConfigured()
  });
});

router.get('/services/new', requireAuth, (req, res) => {
  res.render('admin/services/form', {
    active: 'services',
    isNew: true,
    service: {},
    error: null,
    backupActive: githubSync.isConfigured(),
    jsonBlob: blob({})
  });
});

router.get('/services/edit/:id', requireAuth, (req, res) => {
  const services = loadServices();
  const service = Array.isArray(services) ? services.find(s => s.id === req.params.id) : null;
  if (!service) return res.redirect('/admin/services');
  res.render('admin/services/form', {
    active: 'services',
    isNew: false,
    service,
    error: null,
    backupActive: githubSync.isConfigured(),
    jsonBlob: blob(service)
  });
});

router.post('/services/save', requireAuth, (req, res) => {
  let service;

  if (req.body.useJson === '1') {
    try {
      const parsed = JSON.parse(req.body.jsonSource || '');
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        throw new Error('Geçerli bir hizmet nesnesi gerekli.');
      }
      service = { ...parsed, id: (parsed.id || slugify(parsed.title)).toString() };
    } catch (e) {
      return res.render('admin/services/form', {
        active: 'services',
        isNew: !req.body.id,
        service: { ...req.body, id: req.body.id },
        error: 'JSON ayrıştırılamadı: ' + e.message,
        backupActive: githubSync.isConfigured(),
        jsonBlob: blob({ ...req.body, id: req.body.id })
      });
    }
  } else {
    const title = (req.body.title || '').trim();
    const videos = buildRows([
      arrOf(req, 'v_videoId[]'),
      arrOf(req, 'v_image[]'),
      arrOf(req, 'v_name[]'),
      arrOf(req, 'v_duration[]')
    ]).map(r => ({ videoId: r[0], image: r[1], name: r[2], duration: r[3] }));

    const results = buildRows([arrOf(req, 'r_image[]')]).map(r => ({ image: r[0] }));

    const steps = buildRows([
      arrOf(req, 's_number[]'),
      arrOf(req, 's_title[]'),
      arrOf(req, 's_description[]')
    ]).map(r => ({ number: r[0], title: r[1], description: r[2] }));

    service = {
      id: (req.body.id || slugify(title)).toString(),
      title,
      excerpt: (req.body.excerpt || '').trim(),
      category: (req.body.category || '').trim(),
      image: (req.body.image || '').trim(),
      cardImage: (req.body.cardImage || '').trim(),
      duration: (req.body.duration || '').trim(),
      recovery: (req.body.recovery || '').trim(),
      videos,
      results,
      content: parseContentBlocks(arrOf(req, 'c_type[]'), arrOf(req, 'c_text[]')),
      steps
    };
    if (!service.title) {
      return res.render('admin/services/form', {
        active: 'services',
        isNew: !req.body.id,
        service,
        error: 'Başlık boş olamaz.',
        backupActive: githubSync.isConfigured(),
        jsonBlob: blob(service)
      });
    }
  }

  const services = loadServices();
  const idx = Array.isArray(services) ? services.findIndex(s => s.id === service.id) : -1;
  if (idx >= 0) services[idx] = service;
  else services.push(service);

  const serialized = parser.serializeServices(services);
  let backup = 'skip';
  try {
    const result = persist(parser.SERVICES_FILE, serialized, 'Yönetim panelinden uzmanlık güncellendi: ' + service.title);
    backup = result.backup;
  } catch (e) {
    backup = 'fail';
  }

  res.redirect('/admin/services?saved=1&backup=' + backup);
});

router.post('/services/delete/:id', requireAuth, (req, res) => {
  const services = loadServices();
  if (Array.isArray(services)) {
    const next = services.filter(s => String(s.id) !== String(req.params.id));
    if (next.length !== services.length) {
      const serialized = parser.serializeServices(next);
      let backup = 'skip';
      try {
        backup = persist(parser.SERVICES_FILE, serialized, 'Yönetim panelinden uzmanlık silindi: ' + req.params.id).backup;
      } catch (e) {
        backup = 'fail';
      }
      return res.redirect('/admin/services?backup=' + backup);
    }
  }
  res.redirect('/admin/services');
});

// ------------------------------------------------------------------
// Blog
// ------------------------------------------------------------------
router.get('/blog', requireAuth, (req, res) => {
  const posts = loadBlog();
  res.render('admin/blog/list', {
    active: 'blog',
    posts,
    loadError: posts === null,
    saved: req.query.saved === '1',
    backup: req.query.backup || '',
    backupActive: githubSync.isConfigured()
  });
});

router.get('/blog/new', requireAuth, (req, res) => {
  res.render('admin/blog/form', {
    active: 'blog',
    isNew: true,
    post: {},
    error: null,
    backupActive: githubSync.isConfigured(),
    jsonBlob: blob({})
  });
});

router.get('/blog/edit/:id', requireAuth, (req, res) => {
  const posts = loadBlog();
  const post = Array.isArray(posts) ? posts.find(p => p.id === req.params.id) : null;
  if (!post) return res.redirect('/admin/blog');
  res.render('admin/blog/form', {
    active: 'blog',
    isNew: false,
    post,
    error: null,
    backupActive: githubSync.isConfigured(),
    jsonBlob: blob(post)
  });
});

router.post('/blog/save', requireAuth, (req, res) => {
  let post;

  if (req.body.useJson === '1') {
    try {
      const parsed = JSON.parse(req.body.jsonSource || '');
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        throw new Error('Geçerli bir yazı nesnesi gerekli.');
      }
      post = { ...parsed, id: (parsed.id || slugify(parsed.title)).toString() };
    } catch (e) {
      return res.render('admin/blog/form', {
        active: 'blog',
        isNew: !req.body.id,
        post: { ...req.body, id: req.body.id },
        error: 'JSON ayrıştırılamadı: ' + e.message,
        backupActive: githubSync.isConfigured(),
        jsonBlob: blob({ ...req.body, id: req.body.id })
      });
    }
  } else {
    const title = (req.body.title || '').trim();
    post = {
      id: (req.body.id || slugify(title)).toString(),
      category: (req.body.category || '').trim(),
      title,
      excerpt: (req.body.excerpt || '').trim(),
      date: (req.body.date || '').trim(),
      readTime: (req.body.readTime || '').trim(),
      author: (req.body.author || '').trim(),
      link: (req.body.link || '').trim(),
      image: (req.body.image || '').trim(),
      content: parseContentBlocks(arrOf(req, 'c_type[]'), arrOf(req, 'c_text[]'))
    };
    if (!post.title) {
      return res.render('admin/blog/form', {
        active: 'blog',
        isNew: !req.body.id,
        post,
        error: 'Başlık boş olamaz.',
        backupActive: githubSync.isConfigured(),
        jsonBlob: blob(post)
      });
    }
  }

  const posts = loadBlog();
  const idx = Array.isArray(posts) ? posts.findIndex(p => p.id === post.id) : -1;
  if (idx >= 0) posts[idx] = post;
  else posts.push(post);

  const serialized = parser.serializeBlog(posts, parser.readText(parser.BLOG_FILE));
  let backup = 'skip';
  try {
    backup = persist(parser.BLOG_FILE, serialized, 'Yönetim panelinden blog güncellendi: ' + post.title).backup;
  } catch (e) {
    backup = 'fail';
  }

  res.redirect('/admin/blog?saved=1&backup=' + backup);
});

router.post('/blog/delete/:id', requireAuth, (req, res) => {
  const posts = loadBlog();
  if (Array.isArray(posts)) {
    const next = posts.filter(p => String(p.id) !== String(req.params.id));
    if (next.length !== posts.length) {
      const serialized = parser.serializeBlog(next, parser.readText(parser.BLOG_FILE));
      let backup = 'skip';
      try {
        backup = persist(parser.BLOG_FILE, serialized, 'Yönetim panelinden blog silindi: ' + req.params.id).backup;
      } catch (e) {
        backup = 'fail';
      }
      return res.redirect('/admin/blog?backup=' + backup);
    }
  }
  res.redirect('/admin/blog');
});

// ------------------------------------------------------------------
// Site Ayarları (iletişim, CTA, footer)
// ------------------------------------------------------------------
router.get('/settings', requireAuth, (req, res) => {
  const settings = loadSite();
  res.render('admin/settings', {
    active: 'settings',
    settings,
    loadError: settings === null,
    saved: req.query.saved === '1',
    backup: req.query.backup || '',
    backupActive: githubSync.isConfigured()
  });
});

router.post('/settings/save', requireAuth, (req, res) => {
  const current = loadSite() || {};

  const trims = [
    'phone', 'phoneDisplay', 'whatsapp', 'whatsappLink', 'email',
    'address', 'mapsLink', 'instagram',
    'ctaAppointmentText', 'ctaWhatsAppText', 'ctaCallText',
    'footerBrandText', 'footerCopyright'
  ];
  trims.forEach(k => { current[k] = (req.body[k] || '').toString().trim(); });

  // footerMenu düzenlenebilir menü linkleri: m_title[], m_label[], m_href[], m_dynamic[]
  if (Array.isArray(req.body.m_title)) {
    const titles = req.body.m_title;
    const groups = ['m_label', 'm_href', 'm_dynamic'];
    const arrs = {};
    groups.forEach(g => {
      arrs[g] = Array.isArray(req.body[g]) ? req.body[g] : [];
    });
    current.footerMenu = titles.map((title, ci) => {
      const links = [];
      const colPrefix = 'm_' + ci + '_';
      const labels = Array.isArray(req.body[colPrefix + 'label']) ? req.body[colPrefix + 'label'] : [];
      const hrefs = Array.isArray(req.body[colPrefix + 'href']) ? req.body[colPrefix + 'href'] : [];
      const dyns = Array.isArray(req.body[colPrefix + 'dynamic']) ? req.body[colPrefix + 'dynamic'] : [];
      const len = Math.max(labels.length, hrefs.length, dyns.length);
      for (let i = 0; i < len; i++) {
        const label = (labels[i] || '').trim();
        if (!label) continue;
        links.push({
          label,
          href: (hrefs[i] || '').trim() || '#',
          ...(dyns[i] ? { dynamic: dyns[i] } : {})
        });
      }
      return { title: (title || '').trim(), links };
    }).filter(c => c.title);
  }

  const serialized = parser.serializeSite(current);
  let backup = 'skip';
  try {
    backup = persist(parser.SITE_FILE, serialized, 'Yönetim panelinden site ayarları güncellendi').backup;
  } catch (e) {
    backup = 'fail';
  }

  res.redirect('/admin/settings?saved=1&backup=' + backup);
});

// ------------------------------------------------------------------
// Görsel yükleme
// ------------------------------------------------------------------
router.post('/upload', requireAuth, uploader.single('file'), (req, res) => {
  if (!req.file) return res.json({ ok: false, error: 'Dosya yüklenemedi.' });

  const filename = req.file.filename;
  const url = '/assets/images/uploads/' + filename;
  const relPath = 'assets/images/uploads/' + filename;

  try {
    const buffer = fs.readFileSync(req.file.path);
    githubSync.syncBufferFile(relPath, buffer).catch(() => {});
  } catch (e) {
    /* yedek başarısız olursa görsel yine çalışır */
  }

  res.json({ ok: true, url });
});

// ------------------------------------------------------------------
// Güvenlik (şifre değiştirme)
// ------------------------------------------------------------------
router.get('/security', requireAuth, (req, res) => {
  res.render('admin/security', {
    active: 'security',
    saved: req.query.saved === '1',
    error: null,
    backupActive: githubSync.isConfigured()
  });
});

router.post('/password', requireAuth, (req, res) => {
  const { username, currentPassword, newPassword, newPasswordAgain } = req.body;
  const creds = passStore.current();

  const validCurrent = bcrypt.compareSync(currentPassword || '', creds.passwordHash);

  const renderError = (error) => res.render('admin/security', {
    active: 'security',
    saved: false,
    error,
    backupActive: githubSync.isConfigured()
  });

  if (!validCurrent) return renderError('Mevcut şifre hatalı.');
  if (!newPassword || newPassword.length < 6) return renderError('Yeni şifre en az 6 karakter olmalı.');
  if (newPassword !== newPasswordAgain) return renderError('Yeni şifreler eşleşmiyor.');

  passStore.save((username || creds.username).trim(), bcrypt.hashSync(newPassword, 10));
  res.redirect('/admin/security?saved=1');
});

module.exports = router;