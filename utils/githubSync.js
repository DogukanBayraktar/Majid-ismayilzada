'use strict';

// GitHub'a otomatik yedekleme (Contents API)
// Token yalnızca sunucunun .env dosyasında durur, tarayıcıya asla inmaz.

const TOKEN = process.env.GITHUB_TOKEN || '';
const OWNER = process.env.GITHUB_OWNER || '';
const REPO = process.env.GITHUB_REPO || '';
const BRANCH = process.env.GITHUB_BRANCH || 'main';

function isConfigured() {
  return !!(TOKEN && OWNER && REPO);
}

async function request(pathname, options = {}) {
  const res = await fetch(`https://api.github.com${pathname}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'majid-admin-panel',
      ...(options.headers || {})
    }
  });
  if (!res.ok) {
    const err = new Error(`GitHub API ${res.status} hatası: ${pathname}`);
    err.status = res.status;
    throw err;
  }
  return res.status === 204 ? null : res.json();
}

async function getFileInfo(pathname) {
  return request(`/repos/${OWNER}/${REPO}/contents/${pathname}?ref=${encodeURIComponent(BRANCH)}`);
}

async function putFile(pathname, contentB64, message) {
  let sha;
  try {
    sha = (await getFileInfo(pathname)).sha;
  } catch (e) {
    if (e.status !== 404) throw e;
  }
  const body = { message, branch: BRANCH, content: contentB64 };
  if (sha) body.sha = sha;
  return request(`/repos/${OWNER}/${REPO}/contents/${pathname}`, {
    method: 'PUT',
    body: JSON.stringify(body)
  });
}

// Metin dosyasını yedekler (services.js / blog-posts.js)
async function syncTextFile(pathname, text, message = 'Yönetim panelinden güncellendi') {
  if (!isConfigured()) return { skipped: true };
  const contentB64 = Buffer.from(text, 'utf-8').toString('base64');
  const result = await putFile(pathname, contentB64, message);
  return { skipped: false, sha: result.content.sha };
}

// İkili dosyayı yedekler (görsel/medya)
async function syncBufferFile(pathname, buffer, message = 'Yönetim panelinden görsel yüklendi') {
  if (!isConfigured()) return { skipped: true };
  const contentB64 = buffer.toString('base64');
  const result = await putFile(pathname, contentB64, message);
  return { skipped: false, sha: result.content.sha };
}

module.exports = { isConfigured, syncTextFile, syncBufferFile };