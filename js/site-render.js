// Sitenin ortak bölümlerini data/site.js içindeki ayarlardan render eder.
// Nav ve footer her sayfada tekrarlandığı için buradan tek noktadan yönetilir.
(function () {
  if (typeof siteSettings === 'undefined') return;

  var s = siteSettings;
  var instagramSvg = '<svg viewBox="0 0 24 24">' +
    '<path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.97.24 2.43.4a4.9 4.9 0 0 1 1.77 1.15 4.9 4.9 0 0 1 1.15 1.77c.16.46.35 1.26.4 2.43.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.97-.4 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.46.16-1.26.35-2.43.4-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.97-.24-2.43-.4a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.16-.46-.35-1.26-.4-2.43C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.24-1.97.4-2.43a4.9 4.9 0 0 1 1.15-1.77A4.9 4.9 0 0 1 5.6 1.8c.46-.16 1.26-.35 2.43-.4C9.3 1.34 9.68 1.33 12 1.33m0 1.8c-3.15 0-3.5.01-4.73.07-.96.04-1.48.2-1.83.34-.46.18-.79.39-1.13.73a3.05 3.05 0 0 0-.73 1.13c-.14.35-.3.87-.34 1.83-.06 1.23-.07 1.58-.07 4.73s.01 3.5.07 4.73c.04.96.2 1.48.34 1.83.18.46.39.79.73 1.13.34.34.67.55 1.13.73.35.14.87.3 1.83.34 1.23.06 1.58.07 4.73.07s3.5-.01 4.73-.07c.96-.04 1.48-.2 1.83-.34.46-.18.79-.39 1.13-.73.34-.34.55-.67.73-1.13.14-.35.3-.87.34-1.83.06-1.23.07-1.58.07-4.73s-.01-3.5-.07-4.73c-.04-.96-.2-1.48-.34-1.83a3.05 3.05 0 0 0-.73-1.13 3.05 3.05 0 0 0-1.13-.73c-.35-.14-.87-.3-1.83-.34-1.23-.06-1.58-.07-4.73-.07M12 6.86A5.14 5.14 0 1 1 6.86 12 5.14 5.14 0 0 1 12 6.86m0 1.8A3.34 3.34 0 1 0 15.34 12 3.34 3.34 0 0 0 12 8.66m5.34-2.04a1.2 1.2 0 1 1-1.2-1.2 1.2 1.2 0 0 1 1.2 1.2" />' +
    '</svg>';

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
                  '<a href="' + (s.instagram || '#') + '" target="_blank" rel="noopener" aria-label="Instagram">' + instagramSvg + '</a>' +
                '</div>' +
              '</div>' +
              '<div class="foot-links">' + cols + '</div>' +
            '</div>' +
            '<div class="foot-bottom"><span>' + copyright + '</span></div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function init() {
    renderFooter();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
