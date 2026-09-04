'use strict';

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

// Admin giriş bilgileri.
// Sunucuda data/admin-pass.json (.gitignore'lanmış) varsa onu kullanır,
// yoksa .env'deki ilk giriş bilgilerine döner. Public repo'ya şifre hash'i asla yazılmaz.
// Birden fazla hesap desteklenir.

const CRED_FILE = path.join(__dirname, '..', 'data', 'admin-pass.json');

function readStored() {
  try {
    const raw = JSON.parse(fs.readFileSync(CRED_FILE, 'utf-8'));
    // Eski format (tek kullanıcı): { username, passwordHash }
    if (raw.username && raw.passwordHash) {
      return { users: [{ username: raw.username, passwordHash: raw.passwordHash }] };
    }
    // Yeni format (çoklu kullanıcı): { users: [...] }
    if (Array.isArray(raw.users)) {
      return { users: raw.users.filter(u => u.username && u.passwordHash) };
    }
  } catch (e) {
    /* dosya yok ya da bozuk */
  }
  return null;
}

function writeStored(data) {
  fs.writeFileSync(CRED_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

let envHashCache = null;

function current() {
  const stored = readStored();
  if (stored && stored.users.length > 0) {
    const u = stored.users[0];
    return { username: u.username, passwordHash: u.passwordHash };
  }
  if (!envHashCache) {
    envHashCache = bcrypt.hashSync(process.env.ADMIN_PASS || 'admin123', 10);
  }
  return {
    username: process.env.ADMIN_USER || 'admin',
    passwordHash: envHashCache
  };
}

function listUsers() {
  const stored = readStored();
  if (stored && stored.users.length > 0) {
    return stored.users.map(u => ({ username: u.username }));
  }
  return [{ username: process.env.ADMIN_USER || 'admin' }];
}

function authenticate(username, password) {
  const stored = readStored();
  const users = (stored && stored.users.length > 0)
    ? stored.users
    : [{ username: process.env.ADMIN_USER || 'admin', passwordHash: envHashCache || bcrypt.hashSync(process.env.ADMIN_PASS || 'admin123', 10) }];

  const user = users.find(u => u.username === username);
  if (!user) return false;
  return bcrypt.compareSync(password || '', user.passwordHash);
}

function save(username, passwordHash) {
  const stored = readStored();
  const data = stored || { users: [] };
  const idx = data.users.findIndex(u => u.username === username);
  const entry = { username, passwordHash };
  if (idx >= 0) data.users[idx] = entry;
  else data.users.push(entry);
  writeStored(data);
}

function addUser(username, passwordHash) {
  const stored = readStored();
  const data = stored || { users: [] };
  if (data.users.some(u => u.username === username)) return false;
  data.users.push({ username, passwordHash });
  writeStored(data);
  return true;
}

function removeUser(username) {
  const stored = readStored();
  if (!stored) return false;
  const before = stored.users.length;
  stored.users = stored.users.filter(u => u.username !== username);
  if (stored.users.length === before) return false;
  writeStored(stored);
  return true;
}

module.exports = { current, save, listUsers, authenticate, addUser, removeUser };