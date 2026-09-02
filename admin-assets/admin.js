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
  content: function (c) {
    c = c || {};
    var opts = ['p', 'h3', 'quote'];
    var sel = '<select name="c_type[]" class="inp inp-ct">' +
      opts.map(function (o) { return '<option value="' + o + '"' + (c.type === o ? ' selected' : '') + '>' + o + '</option>'; }).join('') +
      '</select>';
    return '<tr>' +
      '<td class="cell-select">' + sel + '</td>' +
      '<td><textarea name="c_text[]" class="inp inp-area" rows="2" placeholder="İçerik metni">' + esc(c.text) + '</textarea></td>' +
      '<td class="cell-action"><button type="button" class="btn-mini danger" title="Sil" onclick="this.closest(\'tr\').remove()">✕</button></td>' +
      '</tr>';
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
  tr.querySelector('input,textarea,select').focus();
}

function initRows(dataType, data) {
  if (dataType === 'service') {
    (data.results || []).forEach(function (r) { appendRow('result', r); });
    (data.videos || []).forEach(function (v) { appendRow('video', v); });
    (data.content || []).forEach(function (c) { appendRow('content', c); });
    (data.steps || []).forEach(function (s) { appendRow('step', s); });
  } else {
    (data.content || []).forEach(function (c) { appendRow('content', c); });
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
  var content = zip(repr('select[name="c_type[]"]'), repr('textarea[name="c_text[]"]')).map(function (r) { return { type: r[0], text: r[1] }; });
  return {
    id: val('id'), title: val('title'), excerpt: val('excerpt'), category: val('category'),
    image: val('image'), cardImage: val('cardImage'), duration: val('duration'), recovery: val('recovery'),
    videos: videos, results: results, content: content, steps: steps
  };
}

function collectPost() {
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
  var content = zip(repr('select[name="c_type[]"]'), repr('textarea[name="c_text[]"]')).map(function (r) { return { type: r[0], text: r[1] }; });
  return {
    id: val('id'), category: val('category'), title: val('title'), excerpt: val('excerpt'),
    date: val('date'), readTime: val('readTime'), author: val('author'), link: val('link'), image: val('image'),
    content: content
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
    '  <div class="m-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg></div>' +
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

function showConfirmModal(text, cb) {
  var ov = ensureModal();
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
  });
  return false;
}

// Katlanabilir bölüm başlığına tıklayınca kartı aç/kapat.
function toggleCard(head) {
  var card = head.closest('.collapse');
  if (!card) return;
  card.classList.toggle('collapsed');
}

document.addEventListener('DOMContentLoaded', function () {
  var dataType = document.body.getAttribute('data-type');
  var dataStr = document.getElementById('initData');
  if (dataType && dataStr) {
    try {
      initRows(dataType, JSON.parse(dataStr.textContent));
    } catch (e) { /* boş veri */ }
  }
});