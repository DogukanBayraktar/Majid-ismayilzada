'use strict';

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const SERVICES_FILE = path.join(DATA_DIR, 'services.js');
const BLOG_FILE = path.join(DATA_DIR, 'blog-posts.js');
const SITE_FILE = path.join(DATA_DIR, 'site.js');
const HOMEPAGE_FILE = path.join(DATA_DIR, 'homepage.js');

// İngilizce veri dosyaları (data/*-en.js) — admin panelindeki EN sekmesi bunları yönetir.
const SERVICES_EN_FILE = path.join(DATA_DIR, 'services-en.js');
const BLOG_EN_FILE = path.join(DATA_DIR, 'blog-posts-en.js');
const SITE_EN_FILE = path.join(DATA_DIR, 'site-en.js');
const HOMEPAGE_EN_FILE = path.join(DATA_DIR, 'homepage-en.js');

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

// Blog dosyasının başındaki açıklama (yorum) bloğunu korur.
function blogCommentPrefix(text, varName) {
  const i = text.indexOf('const ' + (varName || 'blogPosts'));
  return i > 0 ? text.slice(0, i) : '';
}

function serializeServices(data, varName) {
  return 'const ' + (varName || 'services') + ' = ' + JSON.stringify(data, null, 2) + ';\n';
}

function serializeBlog(data, originalText, varName) {
  const prefix = originalText ? blogCommentPrefix(originalText, varName) : '';
  return prefix + 'const ' + (varName || 'blogPosts') + ' = ' + JSON.stringify(data, null, 2) + ';\n';
}

function serializeSite(data, varName) {
  return '// Sitenin düzenlenebilir genel ayarları (menü, iletişim, CTA, footer).\n' +
    '// Bu dosya /admin/settings üzerinden güncellenir; kaydedince site otomatik yenilenir.\n\n' +
    'const ' + (varName || 'siteSettings') + ' = ' + JSON.stringify(data, null, 2) + ';\n';
}

function serializeHomepage(data, varName) {
  return '// Ana sayfa içerikleri — bu dosya /admin/homepage üzerinden güncellenir.\n' +
    'const ' + (varName || 'homepageSettings') + ' = ' + JSON.stringify(data, null, 2) + ';\n';
}

// Üretilen JS'in sözdizimi hatasız olduğunu doğrular.
function assertValidJs(text) {
  new Function(text);
  return true;
}

module.exports = {
  SERVICES_FILE,
  BLOG_FILE,
  SITE_FILE,
  HOMEPAGE_FILE,
  SERVICES_EN_FILE,
  BLOG_EN_FILE,
  SITE_EN_FILE,
  HOMEPAGE_EN_FILE,
  readText,
  writeText,
  parseServicesFile,
  parseBlogFile,
  parseSiteFile,
  parseHomepageFile,
  serializeServices,
  serializeBlog,
  serializeSite,
  serializeHomepage,
  assertValidJs
};