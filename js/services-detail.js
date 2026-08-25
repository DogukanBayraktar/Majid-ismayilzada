
// ---------------------------------------------------------------
// Scroll reveal animation
// ---------------------------------------------------------------
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

function applyReveal(el, i) {
  el.classList.add('reveal');
  el.style.transitionDelay = ((i % 6) * 70) + 'ms';
  revealObserver.observe(el);
}

// ---------------------------------------------------------------
// Content rendering (orijinal metin — dokunulmuyor, olduğu gibi basılır)
// ---------------------------------------------------------------
function contentBlockHtml(block) {
  if (block.type === 'h3') return `<h3>${block.text}</h3>`;
  if (block.type === 'quote') return `<div class="article-quote">${block.text}</div>`;
  return `<p>${block.text}</p>`;
}

function renderNotFound(root) {
  root.innerHTML = `
    <section class="article-not-found">
      <div class="wrap">
        <span class="label" style="display:block;">Hizmet</span>
        <h2>Aradığınız hizmet bulunamadı</h2>
        <p>Bu hizmet kaldırılmış ya da bağlantı hatalı olabilir. Tüm hizmetlerimize göz atabilirsiniz.</p>
        <a href="index.html#services" class="btn btn-cta"><span>Tüm Hizmetlere Dön</span><span class="arrow">→</span></a>
      </div>
    </section>`;
}

// ---------------------------------------------------------------
// Ortak ikonlar
// ---------------------------------------------------------------
const ICON_CHECK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`;
const ICON_INFO = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/></svg>`;
const ICON_DURATION = `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>`;
const ICON_RECOVERY = `<svg viewBox="0 0 24 24"><path d="M12 21s-7.2-4.6-9.6-9.2C.7 8.1 2.4 4.5 6 4.5c2 0 3.3 1 4 2.2.7-1.2 2-2.2 4-2.2 3.6 0 5.3 3.6 3.6 7.3C19.2 16.4 12 21 12 21z" /></svg>`;

// =================================================================
// 1) HERO — banner: solda hizmet bilgisi, sağda ön görüşme formu.
//    Arkaplanda hizmet fotoğrafı + sitenin genel gradient stili.
// =================================================================
function heroHtml(service) {
  const iconDuration = ICON_DURATION;
  const iconRecovery = ICON_RECOVERY;
  const metaParts = [];
  if (service.duration) metaParts.push(`<span>${iconDuration}Operasyon süresi: <b>${service.duration}</b></span>`);
  if (service.recovery) metaParts.push(`<span>${iconRecovery}İyileşme süresi: <b>${service.recovery}</b></span>`);
  const metaHtml = metaParts.length ? `<div class="service-meta">${metaParts.join('')}</div>` : '';

  const bgStyle = service.image ? ` style="--photo:url('${service.image}');"` : '';

  // "İlgilendiğiniz İşlem" seçeneklerinde mevcut hizmet önceden seçili gelir.
  const procedureOptions = [
    "İmplant ile Meme Rekonstrüksiyonu",
    "Otolog Doku ile Meme Rekonstrüksiyonu (DIEP Flap)",
    "Liposuction (Yağ Aldırma)",
    "Annelik Estetiği (Mommy Makeover)",
    "Yüze Yağ Enjeksiyonu (Yağ Transferi)",
    "Endoskopik Alın Germe",
    "Diğer"
  ];
  const matchedProcedure = procedureOptions.find(p => p === service.title);
  const procedureOptionsHtml = procedureOptions.map(p =>
    `<li role="option" data-value="${p}"${p === matchedProcedure ? ' class="active"' : ''}>${p}</li>`
  ).join('');

  const selectedProcedure = matchedProcedure || '';

  return `
    <section class="hero service-hero">
      <div class="hero-bg">
        <div class="hero-bg-photo"${bgStyle}></div>
        <div class="hero-overlay"></div>
      </div>
      <div class="wrap hero-grid">
        <div class="hero-copy">
          <div class="breadcrumb"><a href="index.html">Ana Sayfa</a><span>→</span><a href="index.html#services">Uzmanlık</a><span>→</span><span>${service.category}</span></div>
          <span class="label">${service.category}</span>
          <h1>${service.title}</h1>
          ${service.excerpt ? `<p class="lead">${service.excerpt}</p>` : ''}
          ${metaHtml}
          <div class="hero-actions">
            <a href="#service-hero-form" class="btn btn-cta"><span>Ücretsiz Ön Görüşme</span><span class="arrow">→</span></a>
            <a href="#${service.results && service.results.length ? 'results' : 'videos'}" class="btn">Sonuçları İncele</a>
          </div>
        </div>
        <div class="hero-form-wrap" id="service-hero-form">
          <form class="hero-form" id="serviceHeroForm" action="https://formsubmit.co/dogukan.bayraktar11@gmail.com" method="POST">
            <input type="hidden" name="_subject" value="Web Sitesi — Hizmet Sayfası Ön Görüşme Talebi (${service.title})">
            <input type="hidden" name="_template" value="table">
            <input type="hidden" name="_captcha" value="false">
            <input type="hidden" name="hizmet_sayfasi" value="${service.title}">
            <input type="text" name="_honey" style="display:none" tabindex="-1" autocomplete="off">
            <span class="label">Ücretsiz Ön Görüşme</span>
            <h3>Bilgilerinizi bırakın, size dönelim.</h3>
            <div class="form-row">
              <input type="text" id="svcAdSoyad" name="ad_soyad" placeholder="Ad Soyad" autocomplete="name" required>
              <span class="field-error" id="svcAdSoyadError"></span>
            </div>
            <div class="form-row">
              <div class="phone-input-group">
                <div class="phone-code-dropdown" id="svcPhoneCodeDropdown">
                  <button type="button" class="phone-code-btn" id="svcPhoneCodeBtn" aria-haspopup="listbox" aria-expanded="false">
                    <img class="flag-icon" src="https://flagcdn.com/w20/tr.png" alt="" id="svcPhoneCodeFlag">
                    <span id="svcPhoneCodeText">+90</span>
                    <svg class="phone-code-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
                      <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </button>
                  <ul class="phone-code-list" id="svcPhoneCodeList" role="listbox" hidden>
                    <li role="option" data-code="+90" data-country="tr" class="active">
                      <img src="https://flagcdn.com/w20/tr.png" alt=""><span>Türkiye</span><b>+90</b>
                    </li>
                    <li role="option" data-code="+49" data-country="de">
                      <img src="https://flagcdn.com/w20/de.png" alt=""><span>Almanya</span><b>+49</b>
                    </li>
                    <li role="option" data-code="+44" data-country="gb">
                      <img src="https://flagcdn.com/w20/gb.png" alt=""><span>Birleşik Krallık</span><b>+44</b>
                    </li>
                    <li role="option" data-code="+1" data-country="us">
                      <img src="https://flagcdn.com/w20/us.png" alt=""><span>ABD</span><b>+1</b>
                    </li>
                    <li role="option" data-code="+33" data-country="fr">
                      <img src="https://flagcdn.com/w20/fr.png" alt=""><span>Fransa</span><b>+33</b>
                    </li>
                    <li role="option" data-code="+31" data-country="nl">
                      <img src="https://flagcdn.com/w20/nl.png" alt=""><span>Hollanda</span><b>+31</b>
                    </li>
                    <li role="option" data-code="+7" data-country="ru">
                      <img src="https://flagcdn.com/w20/ru.png" alt=""><span>Rusya</span><b>+7</b>
                    </li>
                    <li role="option" data-code="+39" data-country="it">
                      <img src="https://flagcdn.com/w20/it.png" alt=""><span>İtalya</span><b>+39</b>
                    </li>
                    <li role="option" data-code="+34" data-country="es">
                      <img src="https://flagcdn.com/w20/es.png" alt=""><span>İspanya</span><b>+34</b>
                    </li>
                    <li role="option" data-code="+971" data-country="ae">
                      <img src="https://flagcdn.com/w20/ae.png" alt=""><span>BAE</span><b>+971</b>
                    </li>
                    <li role="option" data-code="+966" data-country="sa">
                      <img src="https://flagcdn.com/w20/sa.png" alt=""><span>Suudi Arabistan</span><b>+966</b>
                    </li>
                    <li role="option" data-code="+974" data-country="qa">
                      <img src="https://flagcdn.com/w20/qa.png" alt=""><span>Katar</span><b>+974</b>
                    </li>
                    <li role="option" data-code="+994" data-country="az">
                      <img src="https://flagcdn.com/w20/az.png" alt=""><span>Azerbaycan</span><b>+994</b>
                    </li>
                  </ul>
                </div>
                <input type="hidden" id="svcAlanKodu" name="alan_kodu" value="+90">
                <input type="tel" id="svcTelefon" name="telefon" placeholder="5XX XXX XX XX" autocomplete="tel" inputmode="numeric" maxlength="14" required>
              </div>
              <span class="field-error" id="svcTelefonError"></span>
            </div>
            <div class="form-row">
              <input type="email" id="svcEposta" name="eposta" placeholder="E-posta" autocomplete="email">
              <span class="field-error" id="svcEpostaError"></span>
            </div>
            <div class="form-row">
              <div class="custom-select" id="svcIslemDropdown">
                <button type="button" class="custom-select-btn" id="svcIslemBtn" aria-haspopup="listbox" aria-expanded="false">
                  <span id="svcIslemText" class="${selectedProcedure ? '' : 'custom-select-placeholder'}">${selectedProcedure || 'İlgilendiğiniz İşlem'}</span>
                  <svg class="custom-select-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
                <ul class="custom-select-list" id="svcIslemList" role="listbox" hidden>
                  ${procedureOptionsHtml}
                </ul>
              </div>
              <input type="hidden" id="svcIslem" name="islem" value="${selectedProcedure}" required>
              <span class="field-error" id="svcIslemError"></span>
            </div>
            <button type="submit" class="btn btn-cta form-submit"><span>Bilgi Talep Et</span><span class="arrow">→</span></button>
            <p class="form-note">Bilgileriniz KVKK kapsamında gizli tutulur, üçüncü taraflarla paylaşılmaz.</p>
          </form>
        </div>
      </div>
    </section>
  `;
}

function initHeroForm(root) {
  const heroForm = root.querySelector('#serviceHeroForm');
  if (!heroForm) return;

  const adSoyadInput = root.querySelector('#svcAdSoyad');
  const alanKoduSelect = root.querySelector('#svcAlanKodu');
  const telefonInput = root.querySelector('#svcTelefon');
  const epostaInput = root.querySelector('#svcEposta');
  const islemInput = root.querySelector('#svcIslem');

  const islemDropdown = root.querySelector('#svcIslemDropdown');
  const islemBtn = root.querySelector('#svcIslemBtn');
  const islemList = root.querySelector('#svcIslemList');
  const islemText = root.querySelector('#svcIslemText');

  const phoneCodeDropdown = root.querySelector('#svcPhoneCodeDropdown');
  const phoneCodeBtn = root.querySelector('#svcPhoneCodeBtn');
  const phoneCodeList = root.querySelector('#svcPhoneCodeList');
  const phoneCodeFlag = root.querySelector('#svcPhoneCodeFlag');
  const phoneCodeText = root.querySelector('#svcPhoneCodeText');

  const closePhoneCodeList = () => {
    phoneCodeList.hidden = true;
    phoneCodeDropdown.classList.remove('open');
    phoneCodeBtn.setAttribute('aria-expanded', 'false');
  };
  const openPhoneCodeList = () => {
    phoneCodeList.hidden = false;
    phoneCodeDropdown.classList.add('open');
    phoneCodeBtn.setAttribute('aria-expanded', 'true');
  };

  phoneCodeBtn.addEventListener('click', () => {
    phoneCodeList.hidden ? openPhoneCodeList() : closePhoneCodeList();
  });

  phoneCodeList.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', () => {
      phoneCodeList.querySelector('li.active')?.classList.remove('active');
      li.classList.add('active');
      const code = li.dataset.code;
      const country = li.dataset.country;
      alanKoduSelect.value = code;
      phoneCodeFlag.src = `https://flagcdn.com/w20/${country}.png`;
      phoneCodeText.textContent = code;
      closePhoneCodeList();
      telefonInput.value = '';
      telefonInput.placeholder = code === '+90' ? '5XX XXX XX XX' : 'Telefon numarası';
      clearError(telefonInput);
      telefonInput.focus();
    });
  });

  const closeIslemList = () => {
    islemList.hidden = true;
    islemDropdown.classList.remove('open');
    islemBtn.setAttribute('aria-expanded', 'false');
  };
  const openIslemList = () => {
    islemList.hidden = false;
    islemDropdown.classList.add('open');
    islemBtn.setAttribute('aria-expanded', 'true');
  };

  islemBtn.addEventListener('click', () => {
    islemList.hidden ? openIslemList() : closeIslemList();
  });

  islemList.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', () => {
      islemList.querySelector('li.active')?.classList.remove('active');
      li.classList.add('active');
      const value = li.dataset.value;
      islemInput.value = value;
      islemText.textContent = value;
      islemText.classList.remove('custom-select-placeholder');
      closeIslemList();
      clearError(islemInput);
    });
  });

  document.addEventListener('click', (e) => {
    if (!phoneCodeDropdown.contains(e.target)) closePhoneCodeList();
    if (!islemDropdown.contains(e.target)) closeIslemList();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closePhoneCodeList(); closeIslemList(); }
  });

  const showError = (input, message) => {
    const row = input.closest('.form-row');
    const errorEl = row.querySelector('.field-error');
    row.classList.add('has-error');
    errorEl.textContent = message;
  };
  const clearError = (input) => {
    const row = input.closest('.form-row');
    row.classList.remove('has-error');
    row.querySelector('.field-error').textContent = '';
  };

  telefonInput.addEventListener('input', () => {
    const isTurkey = alanKoduSelect.value === '+90';
    let digits = telefonInput.value.replace(/\D/g, '').slice(0, isTurkey ? 10 : 14);
    let formatted = digits;
    if (isTurkey) {
      if (digits.length > 3 && digits.length <= 6) {
        formatted = `${digits.slice(0, 3)} ${digits.slice(3)}`;
      } else if (digits.length > 6 && digits.length <= 8) {
        formatted = `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
      } else if (digits.length > 8) {
        formatted = `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8)}`;
      }
    } else {
      formatted = digits.replace(/(\d{3})(?=\d)/g, '$1 ');
    }
    telefonInput.value = formatted;
  });

  const validateAdSoyad = () => {
    const value = adSoyadInput.value.trim();
    if (value.length < 3) {
      showError(adSoyadInput, 'Lütfen adınızı ve soyadınızı girin.');
      return false;
    }
    if (!/^[A-Za-zÇĞİıÖŞÜçğıöşü\s]+$/.test(value)) {
      showError(adSoyadInput, 'İsim yalnızca harflerden oluşmalıdır.');
      return false;
    }
    clearError(adSoyadInput);
    return true;
  };

  const validateTelefon = () => {
    const isTurkey = alanKoduSelect.value === '+90';
    const digits = telefonInput.value.replace(/\D/g, '');
    if (isTurkey) {
      if (digits.length !== 10) {
        showError(telefonInput, 'Telefon numarası 10 haneli olmalıdır (5XX XXX XX XX).');
        return false;
      }
      if (digits[0] !== '5') {
        showError(telefonInput, 'Lütfen 5 ile başlayan bir cep telefonu numarası girin.');
        return false;
      }
    } else {
      if (digits.length < 6 || digits.length > 14) {
        showError(telefonInput, 'Lütfen geçerli bir telefon numarası girin.');
        return false;
      }
    }
    clearError(telefonInput);
    return true;
  };

  const validateEposta = () => {
    const value = epostaInput.value.trim();
    if (value === '') { clearError(epostaInput); return true; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      showError(epostaInput, 'Geçerli bir e-posta adresi girin.');
      return false;
    }
    clearError(epostaInput);
    return true;
  };

  const validateIslem = () => {
    if (!islemInput.value) {
      showError(islemInput, 'Lütfen ilgilendiğiniz işlemi seçin.');
      return false;
    }
    clearError(islemInput);
    return true;
  };

  adSoyadInput.addEventListener('blur', validateAdSoyad);
  telefonInput.addEventListener('blur', validateTelefon);
  epostaInput.addEventListener('blur', validateEposta);

  heroForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const validations = [validateAdSoyad(), validateTelefon(), validateEposta(), validateIslem()];
    if (validations.includes(false)) {
      heroForm.querySelector('.form-row.has-error input, .form-row.has-error .custom-select-btn')?.focus();
      return;
    }
    const submitBtn = heroForm.querySelector('.form-submit');
    const submitLabel = submitBtn.querySelector('span:first-child');
    const originalText = submitLabel.textContent;
    submitBtn.disabled = true;
    submitLabel.textContent = 'Gönderiliyor...';
    try {
      const formData = new FormData(heroForm);
      formData.set('telefon', `${alanKoduSelect.value} ${telefonInput.value}`);
      const response = await fetch(heroForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (!response.ok) throw new Error('Gönderim başarısız');
      submitLabel.textContent = 'Gönderildi ✓';
      heroForm.reset();
      islemInput.value = matchedProcedure || '';
      islemText.textContent = matchedProcedure || 'İlgilendiğiniz İşlem';
      if (matchedProcedure) {
        islemText.classList.remove('custom-select-placeholder');
        islemList.querySelector('li.active')?.classList.remove('active');
        islemList.querySelector(`li[data-value="${matchedProcedure}"]`)?.classList.add('active');
      } else {
        islemText.classList.add('custom-select-placeholder');
        islemList.querySelector('li.active')?.classList.remove('active');
      }
    } catch (err) {
      submitLabel.textContent = 'Bir hata oluştu, tekrar deneyin';
    } finally {
      setTimeout(() => {
        submitLabel.textContent = originalText;
        submitBtn.disabled = false;
      }, 3000);
    }
  });
}

// =================================================================
// 2) PROOF — hasta videoları + öncesi/sonrası aynı bölümde, sekmeli.
// =================================================================
function extractYoutubeId(url) {
  if (!url) return '';
  const match = url.match(/embed\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : '';
}

function videoGalleryHtml(videos) {
  return videos.map((video, i) => {
    const videoId = video.videoId || extractYoutubeId(video.url);
    const photoVar = video.image ? `--photo:url('${video.image}');` : '';
    return `
      <div class="video-card reveal" data-video-id="${videoId}" style="transition-delay:${(i % 6) * 70}ms;${photoVar}">
        <button class="video-play" aria-label="Videoyu oynat"></button>
        <div class="video-info"><b>${video.name}</b><span>${video.duration}</span></div>
      </div>
    `;
  }).join('');
}

function resultsGalleryHtml(results) {
  const photos = results.map(r => r.image);
  return photos.map((src, i) => `
    <div class="result-photo-card reveal" style="transition-delay:${(i % 6) * 70}ms;">
      <div class="result-photo" style="background-image:url('${src}');"></div>
    </div>
  `).join('');
}

function videosHtml(service) {
  const videos = service.videos;
  if (!videos || videos.length === 0) return '';

  return `
    <section class="service-videos" id="videos">
      <div class="wrap">
        <div class="section-head-row">
          <div class="section-head">
            <span class="label">Hasta Yorumları</span>
            <h2>Operasyon sonrası kendi sözleriyle.</h2>
            <p>Operasyondan sonra hastalarımızın kendi sözleriyle deneyimleri.</p>
          </div>
        </div>
        <div class="video-gallery-wrap">
          <div class="video-gallery" id="serviceVideoGallery">
            ${videoGalleryHtml(videos)}
          </div>
          ${videos.length > 1 ? `
          <button class="slider-btn panel-nav panel-nav-prev" id="svcTestiPrev" aria-label="Önceki">←</button>
          <button class="slider-btn panel-nav panel-nav-next" id="svcTestiNext" aria-label="Sonraki">→</button>` : ''}
        </div>
      </div>
    </section>
  `;
}

function resultsHtml(service) {
  const results = service.results;
  if (!results || results.length === 0) return '';

  return `
    <section class="service-results" id="results">
      <div class="wrap">
        <div class="section-head">
          <span class="label">Sonuçlarımız</span>
          <h2>Öncesi / Sonrası</h2>
          <p>Gerçekleştirdiğimiz operasyonlardan örnek vakalar.</p>
        </div>
        <div class="results-slider-wrap">
          <div class="results-track" data-results-track>
            ${resultsGalleryHtml(results)}
          </div>
          ${results.length > 1 ? `
          <button class="slider-btn results-nav results-nav-prev" data-results-prev aria-label="Önceki">←</button>
          <button class="slider-btn results-nav results-nav-next" data-results-next aria-label="Sonraki">→</button>` : ''}
        </div>
      </div>
    </section>
  `;
}

function initVideosSection(root) {
  const section = root.querySelector('.service-videos');
  if (!section) return;

  section.querySelectorAll('.video-card[data-video-id]').forEach(card => {
    card.addEventListener('click', () => {
      if (card.classList.contains('video-active')) return;
      const videoId = card.dataset.videoId;
      if (!videoId) return;
      const title = card.querySelector('.video-info b')?.textContent || 'Hasta Videosu';
      card.classList.add('video-active');
      card.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" title="${title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    });
  });

  const videoTrack = section.querySelector('#serviceVideoGallery');
  const videoPrev = section.querySelector('#svcTestiPrev');
  const videoNext = section.querySelector('#svcTestiNext');
  if (videoTrack && videoPrev && videoNext) {
    const step = () => {
      const card = videoTrack.querySelector('.video-card');
      const gap = parseFloat(getComputedStyle(videoTrack).gap) || 18;
      return card ? card.getBoundingClientRect().width + gap : videoTrack.clientWidth;
    };
    videoPrev.addEventListener('click', () => videoTrack.scrollBy({ left: -step(), behavior: 'smooth' }));
    videoNext.addEventListener('click', () => videoTrack.scrollBy({ left: step(), behavior: 'smooth' }));
  }
}

function initResultsSection(root) {
  const section = root.querySelector('.service-results');
  if (!section) return;

  const resultsTrack = section.querySelector('[data-results-track]');
  const resultsPrev = section.querySelector('[data-results-prev]');
  const resultsNext = section.querySelector('[data-results-next]');
  if (resultsTrack && resultsPrev && resultsNext) {
    const step = () => {
      const card = resultsTrack.querySelector('.result-photo-card');
      const gap = parseFloat(getComputedStyle(resultsTrack).gap) || 20;
      return card ? card.getBoundingClientRect().width + gap : resultsTrack.clientWidth;
    };
    resultsPrev.addEventListener('click', () => resultsTrack.scrollBy({ left: -step(), behavior: 'smooth' }));
    resultsNext.addEventListener('click', () => resultsTrack.scrollBy({ left: step(), behavior: 'smooth' }));
  }
}

// =================================================================
// 3) KİMLER UYGUNDUR — aşağıdaki "orjinal yazı" içeriğinden
//    (content dizisi) hiçbir kelime değiştirilmeden, yalnızca ilgili
//    başlık + madde işaretli cümleler ayıklanıp öne çıkarılır.
// =================================================================
function extractCandidacyBlock(service) {
  const content = service.content || [];
  let idx = content.findIndex(b => b.type === 'h3' && /uygun/i.test(b.text));
  if (idx === -1) {
    idx = content.findIndex(b => b.type === 'h3' && /(tercih edilir|hangi durumlarda|kimler|kimlere|kimin için)/i.test(b.text));
  }
  if (idx === -1) return null;

  const blocks = [];
  for (let i = idx + 1; i < content.length; i++) {
    if (content[i].type === 'h3') break;
    blocks.push(content[i]);
  }
  return { heading: content[idx].text, blocks };
}

function parseBulletParagraph(text) {
  const parts = text.split(/<br\s*\/?>\s*•\s*/i);
  const intro = (parts[0] || '').trim();
  const items = parts.slice(1).map(s => s.trim()).filter(Boolean);
  return { intro, items };
}

function buildCandidacyLists(blocks) {
  const suitable = [];
  const notSuitable = [];
  const notes = [];
  blocks.forEach(b => {
    if (b.type === 'quote') { notes.push(b.text); return; }
    if (b.type !== 'p') return;
    const { intro, items } = parseBulletParagraph(b.text);
    if (items.length === 0) { notes.push(b.text); return; }
    const isNegative = /uygun değildir|uygun olmayan|tercih edilmez|önerilmez|uygun olmadığı/i.test(intro);
    if (isNegative) notSuitable.push(...items);
    else suitable.push(...items);
  });
  return { suitable, notSuitable, notes };
}

function candidacyHtml(service) {
  const block = extractCandidacyBlock(service);
  const parsed = block ? buildCandidacyLists(block.blocks) : { suitable: [], notSuitable: [], notes: [] };
  const hasLists = parsed.suitable.length > 0 || parsed.notSuitable.length > 0;

  // Hiçbir uygun aday bilgisi ayıklanamazsa, güvenli ve genel bir
  // çerçeve metniyle bölüm yine de gösterilir (uydurma tıbbi kriter yok).
  const suitableList = hasLists ? parsed.suitable : [
    'Genel sağlık durumunuz ve beklentileriniz muayenede birlikte değerlendirilir.',
    'Kişiye özel planlama, ücretsiz ön görüşme sırasında netleştirilir.'
  ];

  const introNote = !hasLists
    ? 'Bu işlem için adaylık kriterleri, kişisel sağlık geçmişiniz ve beklentileriniz doğrultusunda muayenede belirlenir.'
    : (parsed.notes[0] || '');

  const cautionList = parsed.notSuitable.length > 0 ? parsed.notSuitable : [
    'Kontrol altında olmayan kronik hastalıklar',
    'Aktif sigara kullanımı (en az 4 hafta önce bırakılması önerilir)',
    'Gerçekçi olmayan beklentiler'
  ];

  return `
    <section class="candidacy-section" id="candidacy">
      <div class="wrap">
        <div class="section-head">
          <span class="label">Adaylık Değerlendirmesi</span>
          <h2>Kimler Uygundur?</h2>
          ${introNote ? `<p>${introNote}</p>` : ''}
        </div>
        <div class="candidacy-grid two-col">
          <div class="candidacy-card is-suitable reveal">
            <div class="candidacy-card-head">
              <span class="icon-circle">${ICON_CHECK}</span>
              <h3>Uygun Adaylar</h3>
            </div>
            <ul>${suitableList.map(i => `<li>${i}</li>`).join('')}</ul>
          </div>
          <div class="candidacy-card is-caution reveal">
            <div class="candidacy-card-head">
              <span class="icon-circle">${ICON_INFO}</span>
              <h3>Değerlendirilmesi Gereken Durumlar</h3>
            </div>
            <ul>${cautionList.map(i => `<li>${i}</li>`).join('')}</ul>
          </div>
        </div>
        <div class="candidacy-cta">
          <p>Adaylığınızdan emin değil misiniz? Doç. Dr. Majid İsmayilzada'nın klinik ekibi ücretsiz ön görüşmede sizi kişisel olarak değerlendirsin.</p>
          <a href="#service-hero-form" class="btn btn-cta"><span>Adaylığımı Öğrenmek İstiyorum</span><span class="arrow">→</span></a>
        </div>
      </div>
    </section>
  `;
}

// =================================================================
// 4) SÜREÇ — "Nasıl Uygulanır" dikey adım listesi (mevcut davranış).
// =================================================================
function stepPhotosFor(service) {
  const candidates = [];
  const addUnique = (src) => {
    if (src && !candidates.includes(src)) candidates.push(src);
  };
  addUnique(service.image);
  (service.results || []).forEach(r => addUnique(r.image));
  (service.videos || []).forEach(v => addUnique(v.image));

  while (candidates.length > 0 && candidates.length < 3) {
    candidates.push(candidates[candidates.length % candidates.length] || candidates[0]);
  }
  return candidates.slice(0, 3);
}

function stepsHtml(service) {
  const steps = service.steps;
  if (!steps || steps.length === 0) return '';

  const photos = stepPhotosFor(service);

  const stepsMarkup = steps.map((step, i) => {
    const group = photos.length ? Math.min(photos.length - 1, Math.floor((i * photos.length) / steps.length)) : 0;
    return `
      <div class="process-step reveal" data-photo-group="${group}" style="transition-delay:${(i % 6) * 70}ms;">
        <div class="marker">
          <div class="circle">${step.number}</div>
        </div>
        <div class="content">
          <h4>${step.title}</h4>
          <p>${step.description}</p>
        </div>
      </div>
    `;
  }).join('');

  const photosMarkup = photos.map((src, i) => `
    <div class="process-photo" data-photo-index="${i}" style="--photo:url('${src}')"></div>
  `).join('');

  return `
    <section class="op-steps">
      <div class="wrap">
        <div class="section-head">
          <span class="label">Nasıl Uygulanır</span>
          <h2>Cerrahi Adımlar</h2>
          <p>Operasyonun her aşaması önceden planlı ve kontrollü şekilde uygulanır.</p>
        </div>
        <div class="process-layout">
          <div class="process-vertical">
            ${stepsMarkup}
          </div>
          ${photos.length ? `
          <div class="process-photos" id="serviceProcessPhotos">
            ${photosMarkup}
          </div>` : ''}
        </div>
      </div>
    </section>
  `;
}

function initStepPhotoStack(root) {
  const photosWrap = root.querySelector('#serviceProcessPhotos');
  if (!photosWrap) return;
  const steps = Array.from(root.querySelectorAll('.process-step[data-photo-group]'));
  const photos = Array.from(photosWrap.querySelectorAll('.process-photo'));
  if (!steps.length || !photos.length) return;

  let currentGroup = -1;

  function setActiveGroup(activeIndex) {
    if (activeIndex === currentGroup) return;
    currentGroup = activeIndex;
    photos.forEach(photo => {
      const idx = Number(photo.dataset.photoIndex);
      photo.classList.toggle('is-active', idx === activeIndex);
      photo.classList.toggle('is-prev', idx < activeIndex);
      photo.classList.toggle('is-next', idx > activeIndex);
    });
  }

  const computeActive = () => {
    const mid = window.innerHeight / 2;
    let best = Number(steps[0].dataset.photoGroup);
    for (const el of steps) {
      const r = el.getBoundingClientRect();
      if (r.top <= mid) best = Number(el.dataset.photoGroup);
    }
    setActiveGroup(best);
  };

  const stepObserver = new IntersectionObserver(computeActive, { rootMargin: '-15% 0px -15% 0px', threshold: 0 });
  steps.forEach(step => stepObserver.observe(step));

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { computeActive(); ticking = false; });
  }, { passive: true });

  const syncInitial = () => { currentGroup = -1; computeActive(); };
  syncInitial();
  window.addEventListener('load', () => setTimeout(syncInitial, 60));
}

// =================================================================
// 5) İlgili hizmetler
// =================================================================
function relatedCardHtml(service) {
  const thumbStyle = service.image
    ? ` style="background-image:url('${service.image}');background-size:cover;background-position:center;"`
    : '';
  return `
    <a class="blog-card" href="services-detay.html?id=${encodeURIComponent(service.id)}" style="display:block;">
      <div class="blog-thumb"${thumbStyle}></div>
      <div class="blog-body">
        <span>${service.category}</span>
        <h4>${service.title}</h4>
        <p>${service.excerpt}</p>
        <span class="read-more-link">Detaylı Bilgi</span>
      </div>
    </a>`;
}

// ---------------------------------------------------------------
// Initialize service detail page
// ---------------------------------------------------------------
(function initService() {
  const root = document.getElementById('serviceRoot');
  if (!root || typeof services === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const service = services.find(s => s.id === id);

  if (!service) {
    renderNotFound(root);
    return;
  }

  document.getElementById('pageTitle').textContent = `${service.title} — Doç. Dr. Majid İsmayilzada`;
  const descEl = document.getElementById('pageDescription');
  if (descEl) descEl.setAttribute('content', service.excerpt || '');

  const contentHtml = (service.content || []).map(contentBlockHtml).join('');

  // İlgili hizmetler (mevcut hariç)
  const related = services.filter(s => s.id !== service.id).slice(0, 3);
  const relatedHtml = related.length
    ? `<section class="related-section">
        <div class="wrap">
          <div class="section-head">
            <h2>İlgili Hizmetler</h2>
            <p>Diğer hizmetlerimizi keşfetmek için aşağıyı inceleyin.</p>
          </div>
          <div class="slider-wrap">
            <div class="blog-slider" id="relatedTrack">
              ${related.map(relatedCardHtml).join('')}
            </div>
          </div>
        </div>
      </section>`
    : '';

  // Sıralama: Hero (form) → Hasta Videoları → Öncesi/Sonrası → Kimler Uygundur
  // → Cerrahi Adımlar (süreç) → Orijinal yazı (SSS dahil) → İlgili Hizmetler
  root.innerHTML = `
    ${heroHtml(service)}
    ${resultsHtml(service)}
    ${videosHtml(service)}
    ${candidacyHtml(service)}
    ${stepsHtml(service)}
    <section class="article-original">
      <div class="wrap">
        <div class="section-head">
          <span class="label">${service.category}</span>
          <h2>${service.title} Hakkında Detaylı Bilgi</h2>
        </div>
        <div class="article-body">${contentHtml}</div>
      </div>
    </section>
    ${relatedHtml}
  `;

  initHeroForm(root);
  initVideosSection(root);
  initResultsSection(root);
  initStepPhotoStack(root);

  // Reveal animasyonları
  root.querySelectorAll('.reveal').forEach((el, i) => applyReveal(el, i));

  const relatedTrack = document.getElementById('relatedTrack');
  if (relatedTrack) {
    relatedTrack.querySelectorAll('.blog-card').forEach((el, i) => applyReveal(el, i));
  }

  root.querySelectorAll('.process-step, .result-photo-card, .video-card, .candidacy-card').forEach((el) => {
    if (!el.classList.contains('in-view')) {
      revealObserver.observe(el);
    }
  });
})();
