// Yasal sayfaların (kvkk, hasta-haklari, gizlilik-politikasi) gövdesini
// data/legal.js içindeki güncel dile göre .legal-body kutusuna basar.
// Ayrıca sayfa başlığını (document.title) ve meta açıklamasını dilleştirir.
//
// ÖNEMLİ SIRA: Bu dosya, HTML'de js/site-render.js'den ÖNCE yüklenmelidir.
// Böylece gövde önce değiştirilir, ardından site-render'daki applyPlaceholders
// içindeki data-site-text / data-site-mailto alanları (adres, telefon, e-posta)
// yeni basılan HTML'in içine doğru değerleri yazar.
(function () {
  'use strict';

  var PAGES = [
    { pattern: /kvkk\.html/i, key: 'kvkk' },
    { pattern: /hasta-haklari\.html/i, key: 'hastaHaklari' },
    { pattern: /gizlilik-politikasi\.html/i, key: 'gizlilik' }
  ];

  function pageKey() {
    var path = location.pathname || '';
    for (var i = 0; i < PAGES.length; i++) {
      if (PAGES[i].pattern.test(path)) return PAGES[i].key;
    }
    return null;
  }

  function apply() {
    var key = pageKey();
    if (!key) return;
    if (typeof legalContent === 'undefined' || !legalContent) return;

    var lang = (typeof i18n !== 'undefined' && typeof i18n.lang === 'function') ? i18n.lang() : 'tr';
    var page = (legalContent[lang] && legalContent[lang][key]) || null;
    var fallback = (legalContent.tr && legalContent.tr[key]) || null;
    var data = page || fallback;
    if (!data) return;

    var body = document.querySelector('.legal-body');
    if (body && data.body) body.innerHTML = data.body;

    // site-render'in title/data-seo-* üzerinden ezmemesi için ilgili HTML
    // dosyalarından data-seo-title / data-seo-description öznitelikleri kaldırıldı.
    if (data.title) document.title = data.title;
    if (data.desc) {
      var meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', data.desc);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();
