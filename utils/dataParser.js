'use strict';

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const SERVICES_FILE = path.join(DATA_DIR, 'services.js');
const BLOG_FILE = path.join(DATA_DIR, 'blog-posts.js');
const SITE_FILE = path.join(DATA_DIR, 'site.js');

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

function parseServicesFile(filePath) {
  return evalArray(readText(filePath || SERVICES_FILE), 'services');
}

function parseBlogFile(filePath) {
  return evalArray(readText(filePath || BLOG_FILE), 'blogPosts');
}

function parseSiteFile(filePath) {
  return evalArray(readText(filePath || SITE_FILE), 'siteSettings');
}

// Blog dosyasının başındaki açıklama (yorum) bloğunu korur.
function blogCommentPrefix(text) {
  const i = text.indexOf('const blogPosts');
  return i > 0 ? text.slice(0, i) : '';
}

function serializeServices(data) {
  return 'const services = ' + JSON.stringify(data, null, 2) + ';\n';
}

function serializeBlog(data, originalText) {
  const prefix = originalText ? blogCommentPrefix(originalText) : '';
  return prefix + 'const blogPosts = ' + JSON.stringify(data, null, 2) + ';\n';
}

function serializeSite(data) {
  return '// Sitenin düzenlenebilir genel ayarları (menü, iletişim, CTA, footer).\n' +
    '// Bu dosya /admin/settings üzerinden güncellenir; kaydedince site otomatik yenilenir.\n\n' +
    'const siteSettings = ' + JSON.stringify(data, null, 2) + ';\n';
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
  readText,
  writeText,
  parseServicesFile,
  parseBlogFile,
  parseSiteFile,
  serializeServices,
  serializeBlog,
  serializeSite,
  assertValidJs
};