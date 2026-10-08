'use strict';

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const SERVICES_FILE = path.join(DATA_DIR, 'services.js');
const BLOG_FILE = path.join(DATA_DIR, 'blog-posts.js');
const SITE_FILE = path.join(DATA_DIR, 'site.js');
const HOMEPAGE_FILE = path.join(DATA_DIR, 'homepage.js');

// Yasal/kurumsal sayfa gövdeleri (kvkk, hasta-haklari, gizlilik-politikasi).
// Tek dosyada tüm diller tutulur: { tr: {...}, en: {...}, es: {...}, it: {...},
// ru: {...}, ro: {...} }.
const LEGAL_FILE = path.join(DATA_DIR, 'legal.js');

// İngilizce veri dosyaları (data/*-en.js) — admin panelindeki EN sekmesi bunları yönetir.
const SERVICES_EN_FILE = path.join(DATA_DIR, 'services-en.js');
const BLOG_EN_FILE = path.join(DATA_DIR, 'blog-posts-en.js');
const SITE_EN_FILE = path.join(DATA_DIR, 'site-en.js');
const HOMEPAGE_EN_FILE = path.join(DATA_DIR, 'homepage-en.js');

// İspanyolca ve İtalyanca veri dosyaları (data/*-es.js, data/*-it.js).
const SERVICES_ES_FILE = path.join(DATA_DIR, 'services-es.js');
const BLOG_ES_FILE = path.join(DATA_DIR, 'blog-posts-es.js');
const SITE_ES_FILE = path.join(DATA_DIR, 'site-es.js');
const HOMEPAGE_ES_FILE = path.join(DATA_DIR, 'homepage-es.js');

const SERVICES_IT_FILE = path.join(DATA_DIR, 'services-it.js');
const BLOG_IT_FILE = path.join(DATA_DIR, 'blog-posts-it.js');
const SITE_IT_FILE = path.join(DATA_DIR, 'site-it.js');
const HOMEPAGE_IT_FILE = path.join(DATA_DIR, 'homepage-it.js');

// Rusça ve Romence veri dosyaları (data/*-ru.js, data/*-ro.js).
const SERVICES_RU_FILE = path.join(DATA_DIR, 'services-ru.js');
const BLOG_RU_FILE = path.join(DATA_DIR, 'blog-posts-ru.js');
const SITE_RU_FILE = path.join(DATA_DIR, 'site-ru.js');
const HOMEPAGE_RU_FILE = path.join(DATA_DIR, 'homepage-ru.js');

const SERVICES_RO_FILE = path.join(DATA_DIR, 'services-ro.js');
const BLOG_RO_FILE = path.join(DATA_DIR, 'blog-posts-ro.js');
const SITE_RO_FILE = path.join(DATA_DIR, 'site-ro.js');
const HOMEPAGE_RO_FILE = path.join(DATA_DIR, 'homepage-ro.js');

// Dile göre veri dosyası adını ve üst düzey değişken adını belirler.
// Yeni dil eklerken yalnızca bu tabloya satır eklemek yeterlidir.
// NOT: Değişken adları 'var' ile bildirilmelidir (bkz. serialize* yorumları).
function langTargets(lang) {
  const suffix = lang === 'tr' ? '' : '-' + lang;
  const cap = lang.charAt(0).toUpperCase() + lang.slice(1);
  return {
    servicesFile: path.join(DATA_DIR, 'services' + suffix + '.js'),
    servicesVar: lang === 'tr' ? 'services' : 'services' + cap,
    blogFile: path.join(DATA_DIR, 'blog-posts' + suffix + '.js'),
    blogVar: lang === 'tr' ? 'blogPosts' : 'blogPosts' + cap,
    siteFile: path.join(DATA_DIR, 'site' + suffix + '.js'),
    siteVar: lang === 'tr' ? 'siteSettings' : 'siteSettings' + cap,
    homepageFile: path.join(DATA_DIR, 'homepage' + suffix + '.js'),
    homepageVar: lang === 'tr' ? 'homepageSettings' : 'homepageSettings' + cap
  };
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
}

function writeText(filePath, text) {
  fs.writeFileSync(filePath, text, 'utf-8');
}

// Dosyadaki JS dizisini (const services = [...] gibi) güvenli şekilde canlı veriye çevirir.
// Kendi veri dosyamız olduğu için new Function kullanımı güvenlidir.
function evalArray(src, varName) {
  const fn = new Function(src + `\n;return (typeof ${varName} !== 'undefined') ? ${varName} : undefined;`);
  return fn();
}

function parseServicesFile(filePath, varName) {
  return evalArray(readText(filePath || SERVICES_FILE), varName || 'services');
}

function parseBlogFile(filePath, varName) {
  return evalArray(readText(filePath || BLOG_FILE), varName || 'blogPosts');
}

function parseSiteFile(filePath, varName) {
  return evalArray(readText(filePath || SITE_FILE), varName || 'siteSettings');
}

function parseHomepageFile(filePath, varName) {
  return evalArray(readText(filePath || HOMEPAGE_FILE), varName || 'homepageSettings');
}

// data/legal.js içindeki tüm dilleri içeren legalContent nesnesini okur.
function parseLegalFile(filePath) {
  const src = readText(filePath || LEGAL_FILE);
  const fn = new Function(src + '\n;return (typeof legalContent !== "undefined") ? legalContent : undefined;');
  const data = fn();
  if (!data || typeof data !== 'object') throw new Error('legalContent okunamadı');
  return data;
}

// Blog dosyasının başındaki açıklama (yorum) bloğunu korur.
function blogCommentPrefix(text, varName) {
  const name = varName || 'blogPosts';
  let i = text.indexOf('const ' + name);
  if (i === -1) i = text.indexOf('var ' + name);
  return i > 0 ? text.slice(0, i) : '';
}

// ÖNEMLİ: Değişkenler tarayıcıda window.* üzerinden (i18n.js pickData) okunduğu
// için üst düzey bildirim MUTLAKA 'var' olmalıdır. 'const'/'let' window özelliği
// oluşturmaz ve site İngilizce seçiliyken Türkçe veriye düşer.
function serializeServices(data, varName) {
  return 'var ' + (varName || 'services') + ' = ' + JSON.stringify(data, null, 2) + ';\n';
}

function serializeBlog(data, originalText, varName) {
  const prefix = originalText ? blogCommentPrefix(originalText, varName) : '';
  return prefix + 'var ' + (varName || 'blogPosts') + ' = ' + JSON.stringify(data, null, 2) + ';\n';
}

function serializeSite(data, varName) {
  return '// Sitenin düzenlenebilir genel ayarları (menü, iletişim, CTA, footer).\n' +
    '// Bu dosya /admin/settings üzerinden güncellenir; kaydedince site otomatik yenilenir.\n\n' +
    'var ' + (varName || 'siteSettings') + ' = ' + JSON.stringify(data, null, 2) + ';\n';
}

function serializeHomepage(data, varName) {
  return '// Ana sayfa içerikleri — bu dosya /admin/homepage üzerinden güncellenir.\n' +
    'var ' + (varName || 'homepageSettings') + ' = ' + JSON.stringify(data, null, 2) + ';\n';
}

// Yasal sayfa gövdeleri. Tek dosyada tüm diller tutulur; panelde bir dil ve
// sayfa düzenlenince diğer 11 gövde aynen geri yazılır.
// NOT: 'var' ile bildirilmelidir (tarayıcıda window.legalContent üzerinden okunur).
function serializeLegal(data) {
  return '// Yasal sayfa gövdeleri (kvkk, hasta-haklari, gizlilik-politikasi).\n' +
    '// Her dil için { title, desc, body } — body HTML stringidir ve .legal-body içine basılır.\n' +
    '// Bu dosya /admin/kurumsal üzerinden düzenlenir; js/legal-render.js tarafından okunur.\n\n' +
    'var legalContent = ' + JSON.stringify(data, null, 2) + ';\n';
}

// Üretilen JS'in sözdizimi hatasız olduğunu doğrular.
function assertValidJs(text) {
  new Function(text);
  return true;
}

// İletişim kutusu (legal-highlight) gövdenin sonunda durur ve düzenlemeye
// kapalıdır: ad/adres/telefon/e-posta satırları ile data-site-* öznitelikleri
// site ayarlarından otomatik doldurulur. Editör yalnızca kutudan önceki kısmı
// düzenler; kayıtta kutu orijinal body'den geri eklenerek korunur.
// Dönen rest değeri kutu ve kutudan sonraki her şeyi kapsar.
function splitLegalBody(body) {
  if (typeof body !== 'string' || !body) return { editable: '', rest: '' };
  const start = body.indexOf('<div class="legal-highlight">');
  if (start === -1) return { editable: body, rest: '' };
  return { editable: body.slice(0, start), rest: body.slice(start) };
}

module.exports = {
  SERVICES_FILE,
  BLOG_FILE,
  SITE_FILE,
  HOMEPAGE_FILE,
  LEGAL_FILE,
  SERVICES_EN_FILE,
  BLOG_EN_FILE,
  SITE_EN_FILE,
  HOMEPAGE_EN_FILE,
  SERVICES_ES_FILE,
  BLOG_ES_FILE,
  SITE_ES_FILE,
  HOMEPAGE_ES_FILE,
  SERVICES_IT_FILE,
  BLOG_IT_FILE,
  SITE_IT_FILE,
  HOMEPAGE_IT_FILE,
  SERVICES_RU_FILE,
  BLOG_RU_FILE,
  SITE_RU_FILE,
  HOMEPAGE_RU_FILE,
  SERVICES_RO_FILE,
  BLOG_RO_FILE,
  SITE_RO_FILE,
  HOMEPAGE_RO_FILE,
  langTargets,
  readText,
  writeText,
  parseServicesFile,
  parseBlogFile,
  parseSiteFile,
  parseHomepageFile,
  parseLegalFile,
  serializeServices,
  serializeBlog,
  serializeSite,
  serializeHomepage,
  serializeLegal,
  splitLegalBody,
  assertValidJs
};