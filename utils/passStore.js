'use strict';

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

// Admin giriş bilgileri.
// Sunucuda data/admin-pass.json (.gitignore'lanmış) varsa onu kullanır,
// yoksa .env'deki ilk giriş bilgilerine döner. Public repo'ya şifre hash'i asla yazılmaz.

const CRED_FILE = path.join(__dirname, '..', 'data', 'admin-pass.json');

function readStored() {
  try {
    const raw = JSON.parse(fs.readFileSync(CRED_FILE, 'utf-8'));
    if (raw.username && raw.passwordHash) return raw;
  } catch (e) {
    /* dosya yok ya da bozuk */
  }
  return null;
}

let envHashCache = null;

function current() {
  const stored = readStored();
  if (stored) return { username: stored.username, passwordHash: stored.passwordHash };
  if (!envHashCache) {
    envHashCache = bcrypt.hashSync(process.env.ADMIN_PASS || 'admin123', 10);
  }
  return {
    username: process.env.ADMIN_USER || 'admin',
    passwordHash: envHashCache
  };
}

function save(username, passwordHash) {
  fs.writeFileSync(CRED_FILE, JSON.stringify({ username, passwordHash }, null, 2), 'utf-8');
}

module.exports = { current, save };