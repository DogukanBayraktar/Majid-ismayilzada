// Sitenin ortak bölümlerini data/site.js içindeki ayarlardan render eder.
// Nav ve footer her sayfada tekrarlandığı için buradan tek noktadan yönetilir.
(function () {
  if (typeof siteSettings === 'undefined') return;

  var s = siteSettings;
  var instagramSvg = '<svg viewBox="0 0 24 24">' +
    '<path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.97.24 2.43.4a4.9 4.9 0 0 1 1.77 1.15 4.9 4.9 0 0 1 1.15 1.77c.16.46.35 1.26.4 2.43.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.97-.4 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.46.16-1.26.35-2.43.4-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.97-.24-2.43-.4a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.16-.46-.35-1.26-.4-2.43C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.24-1.97.4-2.43a4.9 4.9 0 0 1 1.15-1.77A4.9 4.9 0 0 1 5.6 1.8c.46-.16 1.26-.35 2.43-.4C9.3 1.34 9.68 1.33 12 1.33m0 1.8c-3.15 0-3.5.01-4.73.07-.96.04-1.48.2-1.83.34-.46.18-.79.39-1.13.73a3.05 3.05 0 0 0-.73 1.13c-.14.35-.3.87-.34 1.83-.06 1.23-.07 1.58-.07 4.73s.01 3.5.07 4.73c.04.96.2 1.48.34 1.83.18.46.39.79.73 1.13.34.34.67.55 1.13.73.35.14.87.3 1.83.34 1.23.06 1.58.07 4.73.07s3.5-.01 4.73-.07c.96-.04 1.48-.2 1.83-.34.46-.18.79-.39 1.13-.73.34-.34.55-.67.73-1.13.14-.35.3-.87.34-1.83.06-1.23.07-1.58.07-4.73s-.01-3.5-.07-4.73c-.04-.96-.2-1.48-.34-1.83a3.05 3.05 0 0 0-.73-1.13 3.05 3.05 0 0 0-1.13-.73c-.35-.14-.87-.3-1.83-.34-1.23-.06-1.58-.07-4.73-.07M12 6.86A5.14 5.14 0 1 1 6.86 12 5.14 5.14 0 0 1 12 6.86m0 1.8A3.34 3.34 0 1 0 15.34 12 3.34 3.34 0 0 0 12 8.66m5.34-2.04a1.2 1.2 0 1 1-1.2-1.2 1.2 1.2 0 0 1 1.2 1.2" />' +
    '</svg>';
  var facebookSvg = '<svg viewBox="0 0 24 24">' +
    '<path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07z" />' +
    '</svg>';
  var youtubeSvg = '<svg viewBox="0 0 24 24">' +
    '<path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.51 3.55 12 3.55 12 3.55s-7.51 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.87.5 9.38.5 9.38.5s7.51 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />' +
    '</svg>';

  // Nav menü öğelerini data/site.js'deki navMenu listesinden render eder.
  // HTML'deki mevcut .nav-links ve .mobile-nav bloklarını günceller.
  function renderNav() {
    // ÖNEMLİ: data/site.js içinde navMenu tanımlı değilse (bu site şu an
    // için tanımlamıyor), HTML'de sayfa başına elle yazılmış ve zaten doğru
    // olan linklere DOKUNMA. Aksi halde .nav-links / .mobile-nav boş bir
    // diziyle ("") üzerine yazılır ve navbar'da hiçbir öğe görünmez.
    if (!Array.isArray(s.navMenu) || !s.navMenu.length) return;

    // Desktop: .nav-links içindeki linkleri navMenu'den bas
    var linksHost = document.querySelector('.nav-links');
    if (linksHost) {
      linksHost.innerHTML = s.navMenu.map(function (m) {
        return '<a href="' + m.href + '">' + m.label + '</a>';
      }).join('');
    }

    // Mobile: .mobile-nav içindeki linkleri navMenu'den bas + Randevu CTA'sı
    var mobileHost = document.querySelector('.mobile-nav');
    if (mobileHost) {
      var html = s.navMenu.map(function (m) {
        return '<a href="' + m.href + '">' + m.label + '</a>';
      }).join('');
      var cta = document.querySelector('.mobile-nav .mobile-cta');
      if (cta) html += cta.outerHTML;
      mobileHost.innerHTML = html;
    }
  }

  function renderFooter() {
    var host = document.getElementById('siteFooter');
    if (!host) return;

    var year = new Date().getFullYear();
    var copyright = (s.footerCopyright || '').replace(/\{year\}/g, year);

    var cols = (s.footerMenu || []).map(function (col) {
      var links = (col.links || []).map(function (l) {
        var href = l.href;
        var label = l.label;
        if (l.dynamic === 'phoneDisplay') { href = 'tel:' + s.phone; label = s.phoneDisplay || label; }
        else if (l.dynamic === 'email') { href = 'mailto:' + s.email; label = s.email || label; }
        else if (l.dynamic === 'address') { href = s.mapsLink; label = s.address || label; }
        return '<a href="' + href + '">' + label + '</a>';
      }).join('');
      return '<div class="foot-column"><h5>' + (col.title || '') + '</h5>' + links + '</div>';
    }).join('');

    host.innerHTML =
      '<div class="foot-shell">' +
        '<div class="foot-inner">' +
          '<div class="foot-content">' +
            '<div class="foot-top">' +
              '<div class="foot-brand">' +
                '<img src="assets/images/logo.png" alt="Doç. Dr. Majid İsmayilzada">' +
                '<p>' + (s.footerBrandText || '') + '</p>' +
                '<div class="foot-social">' +
                  (s.instagram ? '<a href="' + s.instagram + '" target="_blank" rel="noopener" aria-label="Instagram">' + instagramSvg + '</a>' : '') +
                  (s.facebook ? '<a href="' + s.facebook + '" target="_blank" rel="noopener" aria-label="Facebook">' + facebookSvg + '</a>' : '') +
                  (s.youtube ? '<a href="' + s.youtube + '" target="_blank" rel="noopener" aria-label="YouTube">' + youtubeSvg + '</a>' : '') +
                '</div>' +
              '</div>' +
              '<div class="foot-links">' + cols + '</div>' +
            '</div>' +
            '<div class="foot-bottom"><span>' + copyright + '</span></div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  // Genel yer tutucu dolgusu: data-site-text="ayarAdi" -> textContent,
  // data-site-href="ayarAdi" -> href.
  // Böylece sayfadaki sabit butonlar/metinler data/site.js'den güncellenebilir.
  // --- CTA butonlarını data/site.js'den güncelle ---
  // HTML'de sabit duran butonlara dokunmadan, değerleri ayar dosyasından basar.
  function applyCta() {
    // WhatsApp butonu: link + metin
    document.querySelectorAll('a[href="https://wa.me/905015804482"]').forEach(function (a) {
      a.setAttribute('href', s.whatsappLink || a.getAttribute('href'));
      var span = a.querySelector(':scope > span:first-child');
      if (span && s.ctaWhatsAppText) span.textContent = s.ctaWhatsAppText;
    });
    // Telefon butonu: link + metin (yalnızca btn-outline)
    document.querySelectorAll('a[href="tel:+905015804482"].btn-outline').forEach(function (a) {
      a.setAttribute('href', 'tel:' + (s.phone || '+905015804482'));
      if (s.ctaCallText) a.textContent = s.ctaCallText;
    });
    // Nav "Randevu Al" CTA metni
    document.querySelectorAll('.nav-cta').forEach(function (a) {
      var span = a.querySelector(':scope > span:first-child');
      if (span && s.ctaAppointmentText) span.textContent = s.ctaAppointmentText;
    });
    // Mobil "Randevu Al" CTA metni
    document.querySelectorAll('.mobile-cta').forEach(function (a) {
      if (s.ctaAppointmentText) a.textContent = s.ctaAppointmentText;
    });
  }

  function applyPlaceholders() {
    document.querySelectorAll('[data-site-text]').forEach(function (el) {
      var key = el.getAttribute('data-site-text');
      var val = s[key];
      if (typeof val === 'string' && val !== '') el.textContent = val;
    });
    document.querySelectorAll('[data-site-href]').forEach(function (el) {
      var key = el.getAttribute('data-site-href');
      var val = s[key];
      if (typeof val === 'string' && val !== '') el.setAttribute('href', val);
    });
    applyCta();
  }

  function init() {
    renderNav();
    renderFooter();
    applyPlaceholders();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();