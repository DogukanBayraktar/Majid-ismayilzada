(function () {
  'use strict';

  var LANGS = (typeof window.LANGUAGES !== 'undefined' && window.LANGUAGES.length)
    ? window.LANGUAGES
    : [{ code: 'tr', label: 'Türkçe', flag: 'tr' }, { code: 'en', label: 'English', flag: 'gb' }];
  var CODES = LANGS.map(function (l) { return l.code; });

  // Dile göre kullanılacak global değişken adları. Yeni dil eklerken
  // veri dosyası adıyla buraya satır eklemek yeterlidir.
  var DATA = {
    hp: { tr: 'homepageSettings', en: 'homepageSettingsEn' },
    site: { tr: 'siteSettings', en: 'siteSettingsEn' },
    services: { tr: 'services', en: 'servicesEn' },
    blog: { tr: 'blogPosts', en: 'blogPostsEn' }
  };

  var NAV = {
    tr: { about: 'Hakkımda', specialties: 'Uzmanlık', blog: 'Blog', contact: 'İletişim', cta: 'Randevu Al' },
    en: { about: 'About', specialties: 'Specialties', blog: 'Blog', contact: 'Contact', cta: 'Book Appointment' }
  };

  function detectLanguage() {
    var params = new URLSearchParams(window.location.search);
    var urlLang = params.get('lang');
    if (urlLang && CODES.indexOf(urlLang) !== -1) return urlLang;

    var stored = localStorage.getItem('site-lang');
    if (stored && CODES.indexOf(stored) !== -1) return stored;

    var browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase().slice(0, 2);
    if (CODES.indexOf(browserLang) !== -1) return browserLang;

    return LANGS[0].code;
  }

  var currentLang = detectLanguage();
  localStorage.setItem('site-lang', currentLang);

  function setLanguage(lang) {
    if (CODES.indexOf(lang) === -1) return;
    currentLang = lang;
    localStorage.setItem('site-lang', lang);
    var url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.location.href = url.toString();
  }

  function getLanguage() { return currentLang; }

  function t(key) {
    if (typeof translations !== 'undefined' && translations[currentLang]) {
      return translations[currentLang][key] || translations[LANGS[0].code][key] || key;
    }
    return key;
  }

  function pickData(kind) {
    var map = DATA[kind] || {};
    var wanted = map[currentLang];
    if (wanted && typeof window[wanted] !== 'undefined') return window[wanted];
    return typeof window[map.tr] !== 'undefined' ? window[map.tr] : {};
  }

  window.i18n = {
    lang: getLanguage,
    setLang: setLanguage,
    t: t,
    hp: function () { return pickData('hp'); },
    site: function () { return pickData('site'); },
    services: function () { return pickData('services'); },
    blog: function () { return pickData('blog'); },
    isEn: function () { return currentLang === 'en'; },
    isTr: function () { return currentLang === LANGS[0].code; }
  };

  document.documentElement.lang = currentLang;

  function flagUrl(flag) {
    return 'https://flagcdn.com/w20/' + flag + '.png';
  }

  function buildSwitcher(container) {
    var sel = LANGS.filter(function (l) { return l.code === currentLang; })[0] || LANGS[0];
    var options = LANGS.map(function (l) {
      return '<li><button type="button" role="option" data-lang="' + l.code + '"' +
        (l.code === currentLang ? ' class="active" aria-selected="true"' : ' aria-selected="false"') + '>' +
        '<img class="flag" src="' + flagUrl(l.flag) + '" alt="">' +
        '<span>' + l.label + '</span>' +
        (l.code === currentLang ? '<svg class="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>' : '') +
        '</button></li>';
    }).join('');

    container.innerHTML =
      '<button type="button" class="lang-btn" aria-haspopup="listbox" aria-expanded="false">' +
      '<img class="flag" src="' + flagUrl(sel.flag) + '" alt="">' +
      '<span class="lang-code">' + sel.code.toUpperCase() + '</span>' +
      '<svg class="caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>' +
      '</button>' +
      '<ul class="lang-menu" role="listbox">' + options + '</ul>';

    var toggle = container.querySelector('.lang-btn');
    var menu = container.querySelector('.lang-menu');

    function open() {
      container.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    }
    function close() {
      container.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      container.classList.contains('open') ? close() : open();
    });

    menu.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-lang]');
      if (!btn) return;
      e.stopPropagation();
      setLanguage(btn.getAttribute('data-lang'));
    });

    document.addEventListener('click', function (e) {
      if (!container.contains(e.target)) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  function initLangSwitcher() {
    document.querySelectorAll('.lang-switcher').forEach(buildSwitcher);
  }

  function updateNav() {
    var labels = NAV[currentLang] || NAV[LANGS[0].code];

    var navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(function (a) {
      var href = a.getAttribute('href') || '';
      if (href.indexOf('#about') !== -1 || href.endsWith('#about')) a.textContent = labels.about;
      else if (href.indexOf('#services') !== -1 || href.indexOf('uzmanliklar') !== -1) a.textContent = labels.specialties;
      else if (href.indexOf('blog') !== -1 && !href.includes('#')) a.textContent = labels.blog;
      else if (href.indexOf('iletisim') !== -1 || href.indexOf('#contact') !== -1 || href.indexOf('#form') !== -1) a.textContent = labels.contact;
    });

    var mobileLinks = document.querySelectorAll('.mobile-nav a:not(.mobile-cta)');
    mobileLinks.forEach(function (a) {
      var href = a.getAttribute('href') || '';
      if (href.indexOf('#about') !== -1 || href.endsWith('#about')) a.textContent = labels.about;
      else if (href.indexOf('#services') !== -1 || href.indexOf('uzmanliklar') !== -1) a.textContent = labels.specialties;
      else if (href.indexOf('blog') !== -1 && !href.includes('#')) a.textContent = labels.blog;
      else if (href.indexOf('iletisim') !== -1 || href.indexOf('#contact') !== -1 || href.indexOf('#form') !== -1) a.textContent = labels.contact;
    });

    var ctaButtons = document.querySelectorAll('.nav-cta > span:first-child, .mobile-cta');
    ctaButtons.forEach(function (el) {
      el.textContent = labels.cta;
    });
  }

  function updateHeroForm() {
    var formLabel = document.querySelector('#heroForm .label');
    var formTitle = document.querySelector('#heroForm h3');
    var formNote = document.querySelector('#heroForm .form-note');
    var formSubmit = document.querySelector('#heroForm .form-submit span:first-child');
    var formSuccess = document.querySelector('#heroForm .form-success-title');
    var formSuccessDesc = document.querySelector('#heroForm .form-success-desc');
    var formRetry = document.querySelector('#heroForm .form-retry');

    if (formLabel) formLabel.textContent = t('heroFormLabel');
    if (formTitle) formTitle.textContent = t('heroFormTitle');
    if (formNote) formNote.textContent = t('heroFormNote');
    if (formSubmit) formSubmit.textContent = t('heroFormSubmit');
    if (formSuccess) formSuccess.textContent = t('heroFormSuccess');
    if (formSuccessDesc) formSuccessDesc.textContent = t('heroFormSuccessDesc');
    if (formRetry) formRetry.textContent = t('heroFormRetry');

    var nameInput = document.getElementById('adSoyad');
    var emailInput = document.getElementById('eposta');
    var islemText = document.getElementById('islemText');
    if (nameInput) nameInput.placeholder = t('heroFormName');
    if (emailInput) emailInput.placeholder = t('heroFormEmail');
    if (islemText && islemText.classList.contains('custom-select-placeholder')) {
      islemText.textContent = t('heroFormProcedure');
    }

    var breadcrumb = document.querySelector('.breadcrumb');
    var sectionHead = document.querySelector('.page-hero .section-head');
    if (breadcrumb) {
      var homeLink = breadcrumb.querySelector('a[href="index.html"]');
      if (homeLink) homeLink.textContent = t('navHome');
    }
    if (sectionHead) {
      var label = sectionHead.querySelector('.label');
      var h2 = sectionHead.querySelector('h2');
      var p = sectionHead.querySelector('p');
      if (label) label.textContent = t('navContact');
      if (h2) h2.textContent = t('contactHeroTitle');
      if (p) p.textContent = t('contactHeroDesc');
    }

    var contactCards = document.querySelectorAll('.contact-info-stack .cred-card');
    contactCards.forEach(function (card) {
      var b = card.querySelector('b');
      if (!b) return;
      var key = b.textContent.trim().toLowerCase();
      if (key === 'telefon' || key === 'phone') b.textContent = t('contactPhone');
      else if (key === 'e-posta' || key === 'email') b.textContent = t('contactEmail');
      else if (key === 'adres' || key === 'address') b.textContent = t('contactAddress');
      else if (key.indexOf('çalışma') !== -1 || key.indexOf('working') !== -1) b.textContent = t('contactWorkingHours');
    });

    var mapIframe = document.querySelector('.contact-map iframe');
    if (mapIframe) mapIframe.title = t('contactMapTitle');
  }

  function updateProcess() {
    var section = document.getElementById('process');
    if (!section) return;

    var label = section.querySelector('.section-head .label');
    var h2 = section.querySelector('.section-head h2');
    var p = section.querySelector('.section-head p');
    if (label) label.textContent = t('processLabel');
    if (h2) h2.textContent = t('processTitle');
    if (p) p.textContent = t('processDesc');

    var steps = section.querySelectorAll('.process-step');
    steps.forEach(function (step, i) {
      var n = i + 1;
      var tag = step.querySelector('.tag');
      var h4 = step.querySelector('h4');
      var pEl = step.querySelector('p');
      if (tag) tag.textContent = t('processStep' + n + 'Tag');
      if (h4) h4.textContent = t('processStep' + n + 'Title');
      if (pEl) pEl.textContent = t('processStep' + n + 'Desc');
    });
  }

  function init() {
    initLangSwitcher();
    updateNav();
    updateHeroForm();
    updateProcess();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();