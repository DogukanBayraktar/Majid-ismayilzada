'use strict';

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function flash(msg, isError) {
  var toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.className = 'toast show' + (isError ? ' error' : '');
  clearTimeout(toast._t);
  toast._t = setTimeout(function () { toast.className = 'toast'; }, 3500);
}

function val(id) {
  var el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function fillTextArea(id, text) {
  document.getElementById(id).value = text;
}

// target: input elemanı ya da id. Görseli sunucuya yükler ve input'a yolu yazar.
function pickImage(target) {
  var inputEl = typeof target === 'string' ? document.getElementById(target) : target;
  var input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = function () {
    if (!input.files[0]) return;
    var fd = new FormData();
    fd.append('file', input.files[0]);
    fetch('/admin/upload', { method: 'POST', body: fd })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (res.ok) {
          if (inputEl) inputEl.value = res.url;
          flash('Görsel yüklendi: ' + res.url);
        } else {
          flash(res.error || 'Yükleme hatası', true);
        }
      })
      .catch(function () { flash('Yükleme hatası', true); });
  };
  input.click();
}

// ------------------------------------------------------------------
// Tekrar satırları (repeater)
// ------------------------------------------------------------------
var ROW_TEMPLATES = {
  result: function (r) {
    r = r || {};
    return '<tr>' +
      '<td><div class="imgpick"><input type="text" name="r_image[]" value="' + esc(r.image) + '" class="inp" placeholder="Görsel yolu">' +
      '<button type="button" class="btn-mini" title="Görsel yükle" onclick="pickImage(this.parentNode.querySelector(\'input\'))">↗</button></div></td>' +
      '<td class="cell-action"><button type="button" class="btn-mini danger" title="Sil" onclick="this.closest(\'tr\').remove()">✕</button></td>' +
      '</tr>';
  },
  video: function (v) {
    v = v || {};
    return '<tr>' +
      '<td><input type="text" name="v_videoId[]" value="' + esc(v.videoId) + '" class="inp" placeholder="Video ID"></td>' +
      '<td><div class="imgpick"><input type="text" name="v_image[]" value="' + esc(v.image) + '" class="inp" placeholder="Kapak görseli yolu">' +
      '<button type="button" class="btn-mini" title="Görsel yükle" onclick="pickImage(this.parentNode.querySelector(\'input\'))">↗</button></div></td>' +
      '<td><input type="text" name="v_name[]" value="' + esc(v.name) + '" class="inp" placeholder="Video adı"></td>' +
      '<td><input type="text" name="v_duration[]" value="' + esc(v.duration) + '" class="inp inp-sm" placeholder="Süre"></td>' +
      '<td class="cell-action"><button type="button" class="btn-mini danger" title="Sil" onclick="this.closest(\'tr\').remove()">✕</button></td>' +
      '</tr>';
  },
  content: function () {
    return '';
  },
  step: function (s) {
    s = s || {};
    return '<tr>' +
      '<td><input type="text" name="s_number[]" value="' + esc(s.number) + '" class="inp inp-sm" placeholder="1"></td>' +
      '<td><input type="text" name="s_title[]" value="' + esc(s.title) + '" class="inp" placeholder="Adım başlığı"></td>' +
      '<td><input type="text" name="s_description[]" value="' + esc(s.description) + '" class="inp" placeholder="Kısa açıklama"></td>' +
      '<td class="cell-action"><button type="button" class="btn-mini danger" title="Sil" onclick="this.closest(\'tr\').remove()">✕</button></td>' +
      '</tr>';
  }
};

function addRow(kind) {
  var tbody = document.querySelector('#rows-' + kind);
  if (!tbody) return;
  var tr = document.createElement('tr');
  tr.innerHTML = ROW_TEMPLATES[kind]();
  tbody.appendChild(tr);
  var first = tr.querySelector('input,textarea,select');
  if (first) first.focus();
}

function initRows(dataType, data) {
  if (dataType === 'service') {
    (data.results || []).forEach(function (r) { appendRow('result', r); });
    (data.videos || []).forEach(function (v) { appendRow('video', v); });
    (data.steps || []).forEach(function (s) { appendRow('step', s); });
  }
}

function appendRow(kind, obj) {
  var tbody = document.querySelector('#rows-' + kind);
  if (!tbody) return;
  var tr = document.createElement('tr');
  tr.innerHTML = ROW_TEMPLATES[kind](obj);
  tbody.appendChild(tr);
}

// ------------------------------------------------------------------
// JSON (gelişmiş) modu
// ------------------------------------------------------------------
function collectService() {
  syncSingleQuill();
  function repr(sel) {
    return Array.prototype.map.call(document.querySelectorAll(sel), function (x) { return x.value.trim(); });
  }
  function zip() {
    var cols = Array.prototype.slice.call(arguments);
    var len = Math.max.apply(null, cols.map(function (c) { return c.length; }));
    var rows = [];
    for (var i = 0; i < len; i++) {
      var r = cols.map(function (c) { return c[i]; });
      if (r.some(function (v) { return v !== ''; })) rows.push(r);
    }
    return rows;
  }
  var videos = zip(repr('input[name="v_videoId[]"]'), repr('input[name="v_image[]"]'), repr('input[name="v_name[]"]'), repr('input[name="v_duration[]"]'))
    .map(function (r) { return { videoId: r[0], image: r[1], name: r[2], duration: r[3] }; });
  var results = zip(repr('input[name="r_image[]"]')).map(function (r) { return { image: r[0] }; });
  var steps = zip(repr('input[name="s_number[]"]'), repr('input[name="s_title[]"]'), repr('input[name="s_description[]"]'))
    .map(function (r) { return { number: r[0], title: r[1], description: r[2] }; });
  var contentHtml = val('contentHtml');
  return {
    id: val('id'), title: val('title'), excerpt: val('excerpt'), category: val('category'),
    cardImage: val('cardImage'), link: val('link'), duration: val('duration'), recovery: val('recovery'),
    videos: videos, results: results, contentHtml: contentHtml, steps: steps
  };
}

function collectPost() {
  syncSingleQuill();
  var contentHtml = val('contentHtml');
  return {
    id: val('id'), category: val('category'), title: val('title'), excerpt: val('excerpt'),
    date: val('date'), readTime: val('readTime'), author: val('author'), link: val('link'), image: val('image'),
    contentHtml: contentHtml
  };
}

function setJsonMode(on, dataType) {
  var jsonMode = document.getElementById('jsonMode');
  var normalMode = document.getElementById('normalMode');
  var useJson = document.getElementById('useJson');
  if (on) {
    var obj = dataType === 'service' ? collectService() : collectPost();
    fillTextArea('jsonSource', JSON.stringify(obj, null, 2));
  }
  jsonMode.style.display = on ? 'block' : 'none';
  normalMode.style.display = on ? 'none' : 'block';
  useJson.value = on ? '1' : '0';
}

// Özel onay (silme) modalı. form üzerindeki onsubmit="return confirmDelete(...)" ile kullanılır.
var __pendingForm = null;
function confirmDelete(msg) {
  var target = event && event.currentTarget;
  var form = target && (target.tagName === 'FORM' ? target : target.querySelector('form'));
  __pendingForm = form || null;
  var text = String(msg || 'Bu kaydı silmek istediğinize emin misiniz?')
    .replace(/^«/, '').replace(/»/, '');
  showConfirmModal(text, function () {
    if (__pendingForm) {
      try { __pendingForm.onsubmit = null; } catch (e) {}
      __pendingForm.submit();
    }
  });
  return false;
}

function ensureModal() {
  var ov = document.getElementById('confirmOverlay');
  if (ov) return ov;
  ov = document.createElement('div');
  ov.id = 'confirmOverlay';
  ov.className = 'modal-overlay';
  ov.innerHTML =
    '<div class="modal" role="dialog" aria-modal="true">' +
    '  <div class="m-icon" id="confirmIcon"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg></div>' +
    '  <h3 id="confirmTitle">Emin misiniz?</h3>' +
    '  <p id="confirmText"></p>' +
    '  <div class="m-actions">' +
    '    <button type="button" class="btn btn-outline" id="confirmCancel">Vazgeç</button>' +
    '    <button type="button" class="btn btn-danger" id="confirmOk">Evet, sil</button>' +
    '  </div>' +
    '</div>';
  ov.addEventListener('click', function (e) {
    if (e.target === ov) hideConfirmModal();
  });
  ov.querySelector('#confirmCancel').addEventListener('click', hideConfirmModal);
  ov.querySelector('#confirmOk').addEventListener('click', function () {
    var cb = ov._cb;
    hideConfirmModal();
    if (cb) cb();
  });
  document.body.appendChild(ov);
  return ov;
}

// opts: { icon: 'delete' | 'logout', okLabel, okClass, title }
function showConfirmModal(text, cb, opts) {
  opts = opts || {};
  var ov = ensureModal();
  var icon = ov.querySelector('#confirmIcon');
  if (opts.icon === 'logout' && icon) {
    icon.className = 'm-icon m-icon-logout';
    icon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>';
  } else if (icon) {
    icon.className = 'm-icon';
    icon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>';
  }
  var titleEl = ov.querySelector('#confirmTitle');
  titleEl.textContent = opts.title || 'Emin misiniz?';
  var okBtn = ov.querySelector('#confirmOk');
  okBtn.textContent = opts.okLabel || 'Evet, sil';
  okBtn.className = 'btn ' + (opts.okClass || 'btn-danger');
  ov.querySelector('#confirmText').textContent = text;
  ov._cb = cb;
  ov.classList.add('open');
  requestAnimationFrame(function () { ov.classList.add('show'); });
}

function hideConfirmModal() {
  var ov = document.getElementById('confirmOverlay');
  if (!ov) return;
  ov.classList.remove('show');
  var done = function () { ov.classList.remove('open'); };
  setTimeout(done, 180);
}

// Çıkış yap onayı. Sidebar'daki logout formu üzerinde onsubmit="return confirmLogout();"
function confirmLogout() {
  var form = event && event.currentTarget;
  showConfirmModal('Oturumunuzdan çıkmak istediğinize emin misiniz?', function () {
    if (form) {
      try { form.onsubmit = null; } catch (e) {}
      form.submit();
    }
  }, { icon: 'logout', title: 'Çıkış Yap', okLabel: 'Evet, çık', okClass: 'btn-danger' });
  return false;
}

// Katlanabilir bölüm başlığına tıklayınca kartı aç/kapat.
function toggleCard(head) {
  var card = head.closest('.collapse');
  if (!card) return;
  card.classList.toggle('collapsed');
}

// Şifre göster/gizle toggle
function togglePass(btn) {
  var wrap = btn.closest('.pass-wrap');
  if (!wrap) return;
  var inp = wrap.querySelector('input');
  if (!inp) return;
  var isPassword = inp.type === 'password';
  inp.type = isPassword ? 'text' : 'password';
  btn.innerHTML = isPassword
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
  btn.title = isPassword ? 'Şifreyi gizle' : 'Şifreyi göster';
}

// Kullanıcı detayını aç/kapat
function toggleUserDetail(btn) {
  var row = btn.closest('tr');
  if (!row) return;
  var detail = row.nextElementSibling;
  if (detail && detail.classList.contains('user-detail-row')) {
    var isOpen = detail.style.display !== 'none';
    detail.style.display = isOpen ? 'none' : '';
    btn.classList.toggle('open', !isOpen);
  }
}

// ------------------------------------------------------------------
// Rich Text (Quill) — TEK editör (Sayfa İçeriği)
// ------------------------------------------------------------------
var QUIL_CONFIG = {
  theme: 'snow',
  modules: {
    toolbar: [
      [{ header: [2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['blockquote', 'link'],
      ['clean']
    ]
  }
};

// Eski content dizisini ({type,text}[] veya [{type,text}]) tek HTML'e çevirir.
function contentBlocksToHtml(content) {
  if (typeof content === 'string') return content;
  if (!Array.isArray(content)) return '';
  return content.map(function (b) {
    var txt = b && b.text != null ? String(b.text) : '';
    if (!b) return '';
    if (b.type === 'h3') return '<h3>' + txt + '</h3>';
    if (b.type === 'quote') return '<div class="article-quote">' + txt + '</div>';
    return '<p>' + txt + '</p>';
  }).join('');
}

// Tek Quill editörü (#contentEditor) başlatır.
function initSingleQuill(initialHtml) {
  var el = document.getElementById('contentEditor');
  if (!el || !window.Quill) return;
  if (el._quill) return;
  var quill = new Quill(el, QUIL_CONFIG);
  el._quill = quill;
  if (initialHtml) {
    quill.clipboard.dangerouslyPasteHTML(0, initialHtml, 'silent');
  }
  quill.on('text-change', function () { syncSingleQuill(); });
  syncSingleQuill();
}

// Tek editörün içeriğini gizli #contentHtml input'una yazar.
function syncSingleQuill() {
  var el = document.getElementById('contentEditor');
  var hidden = document.getElementById('contentHtml');
  if (!el || !hidden) return;
  if (el._quill) hidden.value = el._quill.root.innerHTML;
}

document.addEventListener('DOMContentLoaded', function () {
  var dataType = document.body.getAttribute('data-type');
  var dataStr = document.getElementById('initData');
  if (dataType && dataStr) {
    try {
      var obj = JSON.parse(dataStr.textContent);
      initRows(dataType, obj);
      // Tek editör başlat
      var html = obj.contentHtml || contentBlocksToHtml(obj.content);
      initSingleQuill(html);
    } catch (e) { /* boş veri */ }
  }
  // Submit'te içeriği senkronize et
  var f1 = document.getElementById('svcForm');
  var f2 = document.getElementById('postForm');
  if (f1) f1.addEventListener('submit', function () { syncSingleQuill(); });
  if (f2) f2.addEventListener('submit', function () { syncSingleQuill(); });
});