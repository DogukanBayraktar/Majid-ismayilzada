'use strict';

const express = require('express');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const router = express.Router();

const LANGUAGES = require('../data/languages');

router.use(function (req, res, next) {
  res.locals.LANGS = LANGUAGES;
  next();
});

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

// Dosyayı yere yazar ve GitHub'a yedekler. { backup: 'ok' | 'skip' | 'fail' }
function persist(pathname, contentText, message) {
  parser.writeText(pathname, contentText);
  parser.assertValidJs(contentText);

  let backup = 'skip';
  if (!githubSync.isConfigured()) return { backup };

  const relPath = pathname.split(/[\\/]/).slice(-2).join('/');
  // GitHub yedeği arka planda çalışır; hata (örn. geçersiz/eksik token)
  // process'i düşürmesin diye yutulur. Yerel dosya zaten yazıldı.
  githubSync.syncTextFile(relPath, contentText, message).catch(() => {});
  backup = 'ok';
  return { backup };
}

// Admin dilini döndürür: varsayılan ilk dil. GET'te ?lang=, POST'ta hidden lang alanı.
function langOf(req) {
  const v = (req.body && req.body.lang) || req.query.lang;
  return LANGUAGES.some(l => l.code === v) ? v : LANGUAGES[0].code;
}

// Dile göre hangi veri dosyasının ve değişken adının kullanılacağını belirler.
function targets(lang) {
  const en = lang === 'en';
  return {
    servicesFile: en ? parser.SERVICES_EN_FILE : parser.SERVICES_FILE,
    servicesVar: en ? 'servicesEn' : 'services',
    blogFile: en ? parser.BLOG_EN_FILE : parser.BLOG_FILE,
    blogVar: en ? 'blogPostsEn' : 'blogPosts',
    siteFile: en ? parser.SITE_EN_FILE : parser.SITE_FILE,
    siteVar: en ? 'siteSettingsEn' : 'siteSettings',
    homepageFile: en ? parser.HOMEPAGE_EN_FILE : parser.HOMEPAGE_FILE,
    homepageVar: en ? 'homepageSettingsEn' : 'homepageSettings'
  };
}

function loadServices(filePath, varName) {
  try {
    return parser.parseServicesFile(filePath, varName);
  } catch (e) {
    return null;
  }
}

function loadBlog(filePath, varName) {
  try {
    return parser.parseBlogFile(filePath, varName);
  } catch (e) {
    return null;
  }
}

function loadSite(filePath, varName) {
  try {
    return parser.parseSiteFile(filePath, varName);
  } catch (e) {
    return null;
  }
}

function loadHomepage(filePath, varName) {
  try {
    return parser.parseHomepageFile(filePath, varName);
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

  if (passStore.authenticate(username, password)) {
    req.session.isAdmin = true;
    req.session.adminUser = username;
    return res.redirect('/admin/homepage');
  }
  res.render('admin/login', { error: 'Kullanıcı adı veya şifre hatalı.' });
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/admin/login'));
});

router.get('/', requireAuth, (req, res) => res.redirect('/admin/homepage'));

// ------------------------------------------------------------------
// Uzmanlıklar
// ------------------------------------------------------------------
router.get('/services', requireAuth, (req, res) => {
  const lang = langOf(req);
  const tg = targets(lang);
  const services = loadServices(tg.servicesFile, tg.servicesVar);
  res.render('admin/services/list', {
    active: 'services',
    lang,
    services,
    loadError: services === null,
    saved: req.query.saved === '1',
    backup: req.query.backup || '',
    backupActive: githubSync.isConfigured()
  });
});

router.get('/services/new', requireAuth, (req, res) => {
  const lang = langOf(req);
  res.render('admin/services/form', {
    active: 'services',
    lang,
    isNew: true,
    service: {},
    error: null,
    backupActive: githubSync.isConfigured(),
    jsonBlob: blob({})
  });
});

router.get('/services/edit/:id', requireAuth, (req, res) => {
  const lang = langOf(req);
  const tg = targets(lang);
  const services = loadServices(tg.servicesFile, tg.servicesVar);
  const service = Array.isArray(services) ? services.find(s => s.id === req.params.id) : null;
  if (!service) return res.redirect('/admin/services?lang=' + lang);
  res.render('admin/services/form', {
    active: 'services',
    lang,
    isNew: false,
    service,
    error: null,
    backupActive: githubSync.isConfigured(),
    jsonBlob: blob(service)
  });
});

router.post('/services/save', requireAuth, (req, res) => {
  const lang = langOf(req);
  const tg = targets(lang);
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
        lang,
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
      cardImage: (req.body.cardImage || '').trim(),
      link: (req.body.link || '').trim(),
      duration: (req.body.duration || '').trim(),
      recovery: (req.body.recovery || '').trim(),
      videos,
      results,
      contentHtml: (req.body.contentHtml || '').trim(),
      steps,
      candidacy: {
        note: (req.body.candNote || '').trim(),
        suitable: Array.isArray(req.body.suitableList) ? req.body.suitableList : String(req.body.suitableList || '').split(/[\r\n]+/).map(function (l) { return l.trim(); }).filter(Boolean),
        notSuitable: Array.isArray(req.body.notSuitableList) ? req.body.notSuitableList : String(req.body.notSuitableList || '').split(/[\r\n]+/).map(function (l) { return l.trim(); }).filter(Boolean)
      }
    };
    if (!service.title) {
      return res.render('admin/services/form', {
        active: 'services',
        lang,
        isNew: !req.body.id,
        service,
        error: 'Başlık boş olamaz.',
        backupActive: githubSync.isConfigured(),
        jsonBlob: blob(service)
      });
    }
  }

  const services = loadServices(tg.servicesFile, tg.servicesVar);
  const idx = Array.isArray(services) ? services.findIndex(s => s.id === service.id) : -1;
  if (idx >= 0) services[idx] = service;
  else services.push(service);

  const serialized = parser.serializeServices(services, tg.servicesVar);
  let backup = 'skip';
  try {
    const result = persist(tg.servicesFile, serialized, 'Yönetim panelinden uzmanlık güncellendi (' + lang + '): ' + service.title);
    backup = result.backup;
  } catch (e) {
    backup = 'fail';
  }

  res.redirect('/admin/services?saved=1&backup=' + backup + '&lang=' + lang);
});

router.post('/services/delete/:id', requireAuth, (req, res) => {
  const lang = langOf(req);
  const tg = targets(lang);
  const services = loadServices(tg.servicesFile, tg.servicesVar);
  if (Array.isArray(services)) {
    const next = services.filter(s => String(s.id) !== String(req.params.id));
    if (next.length !== services.length) {
      const serialized = parser.serializeServices(next, tg.servicesVar);
      let backup = 'skip';
      try {
        backup = persist(tg.servicesFile, serialized, 'Yönetim panelinden uzmanlık silindi (' + lang + '): ' + req.params.id).backup;
      } catch (e) {
        backup = 'fail';
      }
      return res.redirect('/admin/services?backup=' + backup + '&lang=' + lang);
    }
  }
  res.redirect('/admin/services?lang=' + lang);
});

// ------------------------------------------------------------------
// Blog
// ------------------------------------------------------------------
router.get('/blog', requireAuth, (req, res) => {
  const lang = langOf(req);
  const tg = targets(lang);
  const posts = loadBlog(tg.blogFile, tg.blogVar);
  res.render('admin/blog/list', {
    active: 'blog',
    lang,
    posts,
    loadError: posts === null,
    saved: req.query.saved === '1',
    backup: req.query.backup || '',
    backupActive: githubSync.isConfigured()
  });
});

router.get('/blog/new', requireAuth, (req, res) => {
  const lang = langOf(req);
  res.render('admin/blog/form', {
    active: 'blog',
    lang,
    isNew: true,
    post: {},
    error: null,
    backupActive: githubSync.isConfigured(),
    jsonBlob: blob({})
  });
});

router.get('/blog/edit/:id', requireAuth, (req, res) => {
  const lang = langOf(req);
  const tg = targets(lang);
  const posts = loadBlog(tg.blogFile, tg.blogVar);
  const post = Array.isArray(posts) ? posts.find(p => p.id === req.params.id) : null;
  if (!post) return res.redirect('/admin/blog?lang=' + lang);
  res.render('admin/blog/form', {
    active: 'blog',
    lang,
    isNew: false,
    post,
    error: null,
    backupActive: githubSync.isConfigured(),
    jsonBlob: blob(post)
  });
});

router.post('/blog/save', requireAuth, (req, res) => {
  const lang = langOf(req);
  const tg = targets(lang);
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
        lang,
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
      contentHtml: (req.body.contentHtml || '').trim()
    };
    if (!post.title) {
      return res.render('admin/blog/form', {
        active: 'blog',
        lang,
        isNew: !req.body.id,
        post,
        error: 'Başlık boş olamaz.',
        backupActive: githubSync.isConfigured(),
        jsonBlob: blob(post)
      });
    }
  }

  const posts = loadBlog(tg.blogFile, tg.blogVar);
  const idx = Array.isArray(posts) ? posts.findIndex(p => p.id === post.id) : -1;
  if (idx >= 0) posts[idx] = post;
  else posts.push(post);

  const originalText = parser.readText(tg.blogFile);
  const serialized = parser.serializeBlog(posts, originalText, tg.blogVar);
  let backup = 'skip';
  try {
    backup = persist(tg.blogFile, serialized, 'Yönetim panelinden blog güncellendi (' + lang + '): ' + post.title).backup;
  } catch (e) {
    backup = 'fail';
  }

  res.redirect('/admin/blog?saved=1&backup=' + backup + '&lang=' + lang);
});

router.post('/blog/delete/:id', requireAuth, (req, res) => {
  const lang = langOf(req);
  const tg = targets(lang);
  const posts = loadBlog(tg.blogFile, tg.blogVar);
  if (Array.isArray(posts)) {
    const next = posts.filter(p => String(p.id) !== String(req.params.id));
    if (next.length !== posts.length) {
      const originalText = parser.readText(tg.blogFile);
      const serialized = parser.serializeBlog(next, originalText, tg.blogVar);
      let backup = 'skip';
      try {
        backup = persist(tg.blogFile, serialized, 'Yönetim panelinden blog silindi (' + lang + '): ' + req.params.id).backup;
      } catch (e) {
        backup = 'fail';
      }
      return res.redirect('/admin/blog?backup=' + backup + '&lang=' + lang);
    }
  }
  res.redirect('/admin/blog?lang=' + lang);
});

// ------------------------------------------------------------------
// Site Ayarları (iletişim, CTA, footer)
// ------------------------------------------------------------------
router.get('/settings', requireAuth, (req, res) => {
  const lang = langOf(req);
  const tg = targets(lang);
  const settings = loadSite(tg.siteFile, tg.siteVar);
  res.render('admin/settings', {
    active: 'settings',
    lang,
    settings,
    loadError: settings === null,
    saved: req.query.saved === '1',
    backup: req.query.backup || '',
    backupActive: githubSync.isConfigured()
  });
});

router.post('/settings/save', requireAuth, (req, res) => {
  const lang = langOf(req);
  const tg = targets(lang);
  const current = loadSite(tg.siteFile, tg.siteVar) || {};

  const trims = [
    'phone', 'whatsappLink',
    'ctaAppointmentText', 'ctaWhatsAppText', 'ctaCallText',
    'contactLabel', 'contactTitle', 'contactDescription', 'contactImage',
    'footerBrandText', 'footerCopyright'
  ];
  trims.forEach(k => { current[k] = (req.body[k] || '').toString().trim(); });

  // navMenu düzenlenebilir üst menü linkleri: nav_label[], nav_href[]
  if (Array.isArray(req.body.nav_label) && Array.isArray(req.body.nav_href)) {
    const labels = req.body.nav_label;
    const hrefs = req.body.nav_href;
    current.navMenu = labels.map((label, i) => ({
      label: (label || '').trim(),
      href: (hrefs[i] || '').trim() || '#'
    })).filter(l => l.label);
  }

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

  const serialized = parser.serializeSite(current, tg.siteVar);
  let backup = 'skip';
  try {
    backup = persist(tg.siteFile, serialized, 'Yönetim panelinden site ayarları güncellendi (' + lang + ')').backup;
  } catch (e) {
    backup = 'fail';
  }

  res.redirect('/admin/settings?saved=1&backup=' + backup + '&lang=' + lang);
});

// ------------------------------------------------------------------
// Genel Ayarlar (logo, çalışma saatleri, SEO başlık/açıklama)
// ------------------------------------------------------------------
router.get('/site', requireAuth, (req, res) => {
  const lang = langOf(req);
  const tg = targets(lang);
  const settings = loadSite(tg.siteFile, tg.siteVar);
  res.render('admin/site', {
    active: 'site',
    lang,
    settings,
    loadError: settings === null,
    saved: req.query.saved === '1',
    backup: req.query.backup || '',
    backupActive: githubSync.isConfigured()
  });
});

router.post('/site/save', requireAuth, (req, res) => {
  const lang = langOf(req);
  const tg = targets(lang);
  const current = loadSite(tg.siteFile, tg.siteVar) || {};

  const trims = ['logo', 'workingHours', 'seoTitle', 'seoDescription'];
  trims.forEach(k => { current[k] = (req.body[k] || '').toString().trim(); });

  const serialized = parser.serializeSite(current, tg.siteVar);
  let backup = 'skip';
  try {
    backup = persist(tg.siteFile, serialized, 'Yönetim panelinden genel ayarlar güncellendi (' + lang + ')').backup;
  } catch (e) {
    backup = 'fail';
  }

  res.redirect('/admin/site?saved=1&backup=' + backup + '&lang=' + lang);
});

// ------------------------------------------------------------------
// İletişim (sitede gösterilen iletişim bilgileri)
// ------------------------------------------------------------------
router.get('/iletisim', requireAuth, (req, res) => {
  const lang = langOf(req);
  const tg = targets(lang);
  const settings = loadSite(tg.siteFile, tg.siteVar);
  res.render('admin/contact', {
    active: 'iletisim',
    lang,
    settings,
    loadError: settings === null,
    saved: req.query.saved === '1',
    backup: req.query.backup || '',
    backupActive: githubSync.isConfigured()
  });
});

router.post('/iletisim/save', requireAuth, (req, res) => {
  const lang = langOf(req);
  const tg = targets(lang);
  const current = loadSite(tg.siteFile, tg.siteVar) || {};

  const trims = ['email', 'address', 'mapsLink', 'instagram', 'facebook', 'youtube'];
  trims.forEach(k => { current[k] = (req.body[k] || '').toString().trim(); });

  const serialized = parser.serializeSite(current, tg.siteVar);
  let backup = 'skip';
  try {
    backup = persist(tg.siteFile, serialized, 'Yönetim panelinden iletişim bilgileri güncellendi (' + lang + ')').backup;
  } catch (e) {
    backup = 'fail';
  }

  res.redirect('/admin/iletisim?saved=1&backup=' + backup + '&lang=' + lang);
});

// ------------------------------------------------------------------
// Ana Sayfa İçerikleri
// ------------------------------------------------------------------
router.get('/homepage', requireAuth, (req, res) => {
  const lang = langOf(req);
  const tg = targets(lang);
  const hp = loadHomepage(tg.homepageFile, tg.homepageVar);
  res.render('admin/homepage', {
    active: 'homepage',
    lang,
    hp,
    loadError: hp === null,
    saved: req.query.saved === '1',
    backup: req.query.backup || '',
    backupActive: githubSync.isConfigured(),
    jsonBlob: blob(hp || {})
  });
});

router.post('/homepage/save', requireAuth, (req, res) => {
  const lang = langOf(req);
  const tg = targets(lang);
  let hp;
  if (req.body.useJson === '1') {
    try {
      hp = JSON.parse(req.body.jsonSource || '{}');
    } catch (e) {
      return res.render('admin/homepage', {
        active: 'homepage',
        lang,
        hp: {},
        loadError: false,
        saved: false,
        backup: '',
        backupActive: githubSync.isConfigured(),
        jsonBlob: req.body.jsonSource || '{}'
      });
    }
  } else {
    const t = (k) => (req.body[k] || '').toString().trim();
    const parseJson = (k) => { try { return JSON.parse(req.body[k] || '[]'); } catch (e) { return []; } };

    hp = {
      hero: {
        title: t('hero_title'),
        lead: t('hero_lead'),
        ctaPrimary: t('hero_ctaPrimary'),
        ctaSecondary: t('hero_ctaSecondary'),
        videoSrc: t('hero_videoSrc')
      },
      about: {
        label: t('about_label'),
        title: t('about_title'),
        description: t('about_description'),
        bullets: parseJson('about_bullets'),
        bio: t('about_bio'),
        photo: t('about_photo'),
        credentials: parseJson('about_credentials')
      },
      servicesSection: {
        label: t('servicesSection_label'),
        title: t('servicesSection_title'),
        description: t('servicesSection_description')
      },
      results: {
        label: t('results_label'),
        title: t('results_title'),
        description: t('results_description'),
        images: parseJson('results_images')
      },
      videoStories: {
        label: t('videoStories_label'),
        title: t('videoStories_title'),
        description: t('videoStories_description'),
        items: parseJson('videoStories_items')
      },
      stories: {
        label: t('stories_label'),
        title: t('stories_title'),
        description: t('stories_description'),
        items: parseJson('stories_items')
      },
      process: {
        label: t('process_label'),
        title: t('process_title'),
        description: t('process_description'),
        steps: parseJson('process_steps'),
        photos: parseJson('process_photos')
      },
      safety: {
        label: t('safety_label'),
        title: t('safety_title'),
        description: t('safety_description'),
        photo: t('safety_photo'),
        cards: parseJson('safety_cards')
      },
      hospital: {
        label: t('hospital_label'),
        title: t('hospital_title'),
        paragraphs: parseJson('hospital_paragraphs'),
        credentials: parseJson('hospital_credentials'),
        slides: parseJson('hospital_slides')
      },
      patientAccess: {
        label: t('patientAccess_label'),
        title: t('patientAccess_title'),
        description: t('patientAccess_description'),
        ctaText: t('patientAccess_ctaText'),
        cards: parseJson('patientAccess_cards')
      },
      istanbul: {
        label: t('istanbul_label'),
        title: t('istanbul_title'),
        description: t('istanbul_description'),
        slides: parseJson('istanbul_slides'),
        features: parseJson('istanbul_features')
      },
      certificates: {
        label: t('certificates_label'),
        title: t('certificates_title'),
        description: t('certificates_description'),
        items: parseJson('certificates_items')
      },
      faq: {
        label: t('faq_label'),
        title: t('faq_title'),
        description: t('faq_description'),
        items: parseJson('faq_items')
      },
      thankYou: {
        title: t('thankYou_title'),
        description: t('thankYou_description'),
        retryText: t('thankYou_retryText')
      }
    };
  }

  const serialized = parser.serializeHomepage(hp, tg.homepageVar);
  let backup = 'skip';
  try {
    const result = persist(tg.homepageFile, serialized, 'Yönetim panelinden ana sayfa içerikleri güncellendi (' + lang + ')');
    backup = result.backup;
  } catch (e) {
    backup = 'fail';
  }
  res.redirect('/admin/homepage?saved=1&backup=' + backup + '&lang=' + lang);
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
  const lang = langOf(req);
  res.render('admin/security', {
    active: 'security',
    lang,
    saved: req.query.saved === '1',
    error: null,
    users: passStore.listUsers(),
    currentUser: req.session.adminUser,
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
    users: passStore.listUsers(),
    currentUser: req.session.adminUser,
    backupActive: githubSync.isConfigured()
  });

  if (!validCurrent) return renderError('Mevcut şifre hatalı.');
  if (!newPassword || newPassword.length < 6) return renderError('Yeni şifre en az 6 karakter olmalı.');
  if (newPassword !== newPasswordAgain) return renderError('Yeni şifreler eşleşmiyor.');

  const targetUser = (username || creds.username).trim();
  passStore.save(targetUser, bcrypt.hashSync(newPassword, 10));
  req.session.adminUser = targetUser;
  res.redirect('/admin/security?saved=1');
});

// ------------------------------------------------------------------
// Kullanıcı yönetimi
// ------------------------------------------------------------------
router.post('/users/add', requireAuth, (req, res) => {
  const { newUsername, newUserPassword, newUserPasswordAgain } = req.body;

  const renderError = (error) => res.render('admin/security', {
    active: 'security',
    saved: false,
    error,
    users: passStore.listUsers(),
    currentUser: req.session.adminUser,
    backupActive: githubSync.isConfigured()
  });

  const uname = (newUsername || '').trim();
  if (!uname) return renderError('Kullanıcı adı boş olamaz.');
  if (uname.length < 3) return renderError('Kullanıcı adı en az 3 karakter olmalı.');
  if (!newUserPassword || newUserPassword.length < 6) return renderError('Şifre en az 6 karakter olmalı.');
  if (newUserPassword !== newUserPasswordAgain) return renderError('Şifreler eşleşmiyor.');

  const ok = passStore.addUser(uname, bcrypt.hashSync(newUserPassword, 10));
  if (!ok) return renderError('Bu kullanıcı adı zaten var.');

  res.redirect('/admin/security?saved=1');
});

router.post('/users/delete/:username', requireAuth, (req, res) => {
  const creds = passStore.current();
  if (req.params.username === creds.username) {
    return res.redirect('/admin/security?error=self-delete');
  }
  passStore.removeUser(req.params.username);
  res.redirect('/admin/security?saved=1');
});

module.exports = router;