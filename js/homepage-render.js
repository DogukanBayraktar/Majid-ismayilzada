// Ana sayfa bölümlerini data/homepage.js ve data/services.js dosyalarından render eder.
(function () {
  var hp = (typeof i18n !== 'undefined') ? i18n.hp() : (typeof homepageSettings !== 'undefined' ? homepageSettings : null);
  if (!hp) return;

  // --- Uzmanlık Kartları (data/services.js'den) ---
  function renderServiceCards() {
    var grid = document.getElementById('serviceGrid');
    var svcData = (typeof i18n !== 'undefined') ? i18n.services() : (typeof services !== 'undefined' ? services : []);
    if (!grid || !Array.isArray(svcData) || !svcData.length) return;
    var section = grid.closest('section');
    fillSectionHead(section, hp.servicesSection);
    var cta = section.querySelector('.head-actions .btn');
    if (cta && hp.servicesSection && hp.servicesSection.ctaText) cta.textContent = hp.servicesSection.ctaText;
    grid.innerHTML = svcData.map(function (s) {
      var img = s.cardImage || '';
      var title = s.title || '';
      var excerpt = s.excerpt || '';
      var link = s.link || ('services-detay.html?id=' + encodeURIComponent(s.id));
      if (link.indexOf('?') === -1 && s.id) link = 'services-detay.html?id=' + encodeURIComponent(s.id);
      return '<a class="service-card" href="' + link + '">' +
        '<img src="' + img + '" alt="' + title + '">' +
        '<h4>' + title + '</h4>' +
        '<p>' + excerpt + '</p>' +
        '<span class="more">' + ((typeof i18n !== 'undefined') ? i18n.t('svcMoreInfo') : 'Detaylı Bilgi') + ' <span class="a">\u2192</span></span>' +
      '</a>';
    }).join('');
  }

  // --- Bölüm Başlığı Helper: mevcut .section-head içindeki metinleri günceller ---
  function fillSectionHead(section, data) {
    if (!section || !data) return;
    var head = section.querySelector('.section-head') || section.querySelector('.section-head-row .section-head');
    if (!head) return;
    if (data.label) {
      var lab = head.querySelector('.label');
      if (lab) lab.textContent = data.label;
    }
    if (data.title) {
      var t = head.querySelector('h2');
      if (t) t.textContent = data.title;
    }
    if (data.description) {
      var p = head.querySelector('p');
      if (p) p.textContent = data.description;
    }
  }

  // --- Hakkımda Bölümü ---
  function renderAbout() {
    var a = hp.about;
    if (!a) return;
    var el = document.getElementById('aboutSection');
    if (!el) return;
    var bullets = (a.bullets || []).map(function (b) { return '\u2714 ' + b; }).join('<br>');
    var creds = (a.credentials || []).map(function (c) {
      return '<div class="cred-card"><span class="cred-icon"><i class="' + c.icon + '"></i></span><b>' + c.title + '</b><span>' + c.detail + '</span></div>';
    }).join('');
    el.querySelector('.about-copy').innerHTML =
      '<span class="label">' + (a.label || '') + '</span>' +
      '<h3>' + (a.title || '') + '</h3>' +
      '<p>' + (a.description || '') + '</p>' +
      '<p>' + bullets + '</p>' +
      '<p>' + (a.bio || '') + '</p>' +
      '<div class="credentials">' + creds + '</div>';
    if (a.photo) {
      var img = el.querySelector('.about-photo img');
      if (img) img.src = a.photo;
    }
  }

  // --- Hasta Hikayeleri ---
  function renderStories() {
    var s = hp.stories;
    if (!s || !s.items || !s.items.length) return;
    var track = document.getElementById('storyTrack');
    if (!track) return;
    var section = track.closest('section');
    fillSectionHead(section, s);
    track.innerHTML = s.items.map(function (item) {
      return '<div class="story-card">' +
        '<span class="story-quote-mark">&ldquo;</span>' +
        '<div class="story-stars">\u2605\u2605\u2605\u2605\u2605</div>' +
        '<p>' + item.quote + '</p>' +
        '<div class="story-foot">' +
          '<div class="story-avatar">' + (item.initials || '') + '</div>' +
          '<div class="story-who"><b>' + item.name + '</b><span>' + item.treatment + '</span></div>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  // --- Video Yorumlar ---
  function renderVideoStories() {
    var v = hp.videoStories;
    if (!v || !v.items || !v.items.length) return;
    var gallery = document.getElementById('videoGallery');
    if (!gallery) return;
    var vSection = gallery.closest('section');
    fillSectionHead(vSection, v);
    gallery.innerHTML = v.items.map(function (item) {
      return '<div class="video-card" data-video-id="' + (item.videoId || '') + '"' +
        ' style="--photo:url(\'' + (item.photo || '') + '\')">' +
        '<button class="video-play" aria-label="' + ((typeof i18n !== 'undefined') ? i18n.t('videoPlay') : 'Videoyu oynat') + '"></button>' +
        '<div class="video-info"><b>' + (item.name || '') + '</b><span>' + (item.treatment || '') + '</span></div>' +
      '</div>';
    }).join('');
    // Video kartları için event listener
    gallery.querySelectorAll('.video-card[data-video-id]').forEach(function (card) {
      card.addEventListener('click', function () {
        if (card.classList.contains('video-active')) return;
        var videoId = card.dataset.videoId;
        var title = card.querySelector('.video-info b') ? card.querySelector('.video-info b').textContent : ((typeof i18n !== 'undefined') ? i18n.t('patientVideo') : 'Hasta Videosu');
        card.classList.add('video-active');
        card.innerHTML = '<iframe src="https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0" title="' + title + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
      });
    });
  }

  // --- Öncesi/Sonrası ---
  function renderResults() {
    var r = hp.results;
    if (!r || !r.images || !r.images.length) return;
    var track = document.getElementById('baTrack');
    if (!track) return;
    var rSection = track.closest('section');
    fillSectionHead(rSection, r);
    track.innerHTML = r.images.map(function (img) {
      return '<article class="ba-card"><img src="' + img.src + '" alt="' + (img.alt || 'Öncesi Sonrası') + '"></article>';
    }).join('');
  }

  // --- Operasyon Süreci (statik, animasyon nedeniyle JS'den render edilmez) ---

  // --- Güvenlik ---
  function renderSafety() {
    var s = hp.safety;
    if (!s) return;
    var section = document.getElementById('safetySection');
    if (!section) return;
    fillSectionHead(section, s);
    var cardsWrap = section.querySelector('.safety-bento');
    if (cardsWrap && s.cards && s.cards.length) {
      var photo = cardsWrap.querySelector('.safety-photo');
      if (photo && s.photo) {
        var img = photo.querySelector('img');
        if (img) img.src = s.photo;
      }
      var cardsHtml = s.cards.map(function (c) {
        return '<div class="safety-card"><div class="icon">\u2713</div><h4>' + c.title + '</h4><p>' + c.description + '</p></div>';
      }).join('');
      // Fotoğraf kartını koru, diğerlerini yeniden oluştur
      cardsWrap.innerHTML = (photo ? photo.outerHTML : '') + cardsHtml;
    }
  }

  // --- SSS ---
  function renderFaq() {
    var f = hp.faq;
    if (!f || !f.items || !f.items.length) return;
    var list = document.getElementById('faqList');
    if (!list) return;
    var fSection = list.closest('section');
    fillSectionHead(fSection, f);
    list.innerHTML = f.items.map(function (item) {
      return '<div class="faq-item">' +
        '<div class="faq-q"><span>' + item.question + '</span><span class="plus">+</span></div>' +
        '<div class="faq-a"><p>' + item.answer + '</p></div>' +
      '</div>';
    }).join('');
    // FAQ accordion event'leri
    list.querySelectorAll('.faq-item').forEach(function (item) {
      var q = item.querySelector('.faq-q');
      var a = item.querySelector('.faq-a');
      q.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');
        list.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); i.querySelector('.faq-a').style.maxHeight = null; });
        if (!isOpen) { item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
      });
    });
  }

  // --- İstanbul ---
  function renderIstanbul() {
    var ist = hp.istanbul;
    if (!ist) return;
    var istSection = document.getElementById('istanbul');
    fillSectionHead(istSection, ist);
    var featuresWrap = document.querySelector('#istanbul .istanbul-features');
    if (featuresWrap && ist.features && ist.features.length) {
      featuresWrap.innerHTML = ist.features.map(function (f) {
        return '<div class="istanbul-feature"><span class="num">' + f.number + '</span><h4>' + f.title + '</h4><p>' + f.description + '</p></div>';
      }).join('');
    }
  }

  // --- Sertifikalar ---
  function renderCertificates() {
    var c = hp.certificates;
    if (!c || !c.items || !c.items.length) return;
    var track = document.getElementById('certTrack');
    if (!track) return;
    var cSection = track.closest('section');
    fillSectionHead(cSection, c);
    track.innerHTML = c.items.map(function (item) {
      return '<div class="cert-card">' +
        '<div class="cert-photo"><img src="' + item.image + '" alt="' + (item.mark || '') + '" loading="lazy"><span class="cert-badge">' + (item.badge || '') + '</span></div>' +
        '<div class="cert-body"><div class="mark">' + (item.mark || '') + '</div><p>' + (item.text || '') + '</p></div>' +
      '</div>';
    }).join('');
  }

  // --- Teşekkür Mesajları (form success) ---
  function renderThankYou() {
    var ty = hp.thankYou;
    if (!ty) return;
    var successEl = document.querySelector('.form-success');
    if (!successEl) return;
    var titleEl = successEl.querySelector('.form-success-title');
    var descEl = successEl.querySelector('.form-success-desc');
    var retryEl = successEl.querySelector('.form-retry');
    if (titleEl && ty.title) titleEl.textContent = ty.title;
    if (descEl && ty.description) descEl.textContent = ty.description;
    if (retryEl && ty.retryText) retryEl.textContent = ty.retryText;
  }

  // --- Hero ---
  function renderHero() {
    var h = hp.hero;
    if (!h) return;
    if (h.title) {
      var h1 = document.querySelector('.hero-copy h1');
      if (h1) h1.innerHTML = h.title;
    }
    if (h.lead) {
      var lead = document.querySelector('.hero-copy .lead');
      if (lead) lead.textContent = h.lead;
    }
    if (h.ctaPrimary) {
      var cta = document.querySelector('.hero-actions .btn-cta');
      if (cta) {
        var span = cta.querySelector(':scope > span:first-child');
        if (span) span.textContent = h.ctaPrimary;
      }
    }
    if (h.ctaSecondary) {
      var cta2 = document.querySelectorAll('.hero-actions .btn')[1];
      if (cta2) cta2.textContent = h.ctaSecondary;
    }
    if (h.videoSrc) {
      var src = document.querySelector('.hero-bg-video source');
      if (src) src.src = h.videoSrc;
    }
  }

  // --- Hastanemiz ---
  function renderHospital() {
    var ho = hp.hospital;
    if (!ho) return;
    var section = document.getElementById('hospital');
    if (!section) return;
    var label = section.querySelector('.about-copy .label');
    if (label && ho.label) label.textContent = ho.label;
    var title = section.querySelector('.about-copy h3');
    if (title && ho.title) title.textContent = ho.title;
    if (ho.paragraphs && ho.paragraphs.length) {
      var ps = section.querySelectorAll('.about-copy > p');
      ho.paragraphs.forEach(function (txt, i) {
        if (ps[i]) ps[i].textContent = txt;
      });
    }
    if (ho.credentials && ho.credentials.length) {
      var credWrap = section.querySelector('.about-copy .credentials');
      if (credWrap) {
        credWrap.innerHTML = ho.credentials.map(function (c) {
          return '<div class="cred-card"><span class="cred-icon"><i class="' + c.icon + '"></i></span><b>' + c.title + '</b><span>' + c.detail + '</span></div>';
        }).join('');
      }
    }
  }

  // --- Hasta Ulaşım Desteği ---
  function renderPatientAccess() {
    var pa = hp.patientAccess;
    if (!pa || !pa.cards || !pa.cards.length) return;
    var section = document.getElementById('patient-access');
    if (!section) return;
    fillSectionHead(section, pa);
    var grid = section.querySelector('.patient-access-grid');
    if (grid) {
      grid.innerHTML = pa.cards.map(function (c) {
        return '<div class="patient-access-card">' +
          '<div class="pa-icon"><i class="' + c.icon + '"></i></div>' +
          '<h4>' + c.title + '</h4>' +
          '<p>' + c.description + '</p>' +
        '</div>';
      }).join('');
    }
    if (pa.ctaText) {
      var cta = section.querySelector('.patient-access-cta .btn-cta span');
      if (cta) cta.textContent = pa.ctaText;
    }
  }

  // --- Blog Bölümü ---
  function renderBlog() {
    var b = hp.blog;
    if (!b) return;
    var section = document.getElementById('blog');
    if (!section) return;
    fillSectionHead(section, b);
    var cta = section.querySelector('.head-actions .btn');
    if (cta && b.ctaText) cta.textContent = b.ctaText;
  }

  // Başlangıç
  function safe(cb) {
    try { cb(); }
    catch (e) { console.error('Homepage render error:', e); }
  }

  function init() {
    safe(renderHero);
    safe(renderServiceCards);
    safe(renderAbout);
    safe(renderHospital);
    safe(renderPatientAccess);
    safe(renderStories);
    safe(renderVideoStories);
    safe(renderResults);
    safe(renderSafety);
    safe(renderFaq);
    safe(renderIstanbul);
    safe(renderCertificates);
    safe(renderBlog);
    safe(renderThankYou);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
