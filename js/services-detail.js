
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
// Content rendering
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

// Aynı fotoğrafın tekrarlanmasını önlemek için servis görsellerinden
// (kapak + sonuç + video fotoğrafları) benzersiz 3 fotoğraf seçilir.
function stepPhotosFor(service) {
  const candidates = [];
  const addUnique = (src) => {
    if (src && !candidates.includes(src)) candidates.push(src);
  };
  addUnique(service.image);
  (service.results || []).forEach(r => addUnique(r.after || r.before));
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

// ---------------------------------------------------------------
// "Nasıl Uygulanır" fotoğraf yığını — anasayfadaki Operasyon Süreci
// bölümüyle birebir aynı davranış (scroll'a göre foto geçişi).
// ---------------------------------------------------------------
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

  // IO olayları bazen gecikmeli gelir; scroll'da her karede garantili hesapla
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

function resultsHtml(results) {
  if (!results || results.length === 0) return '';

  // Her vaka için tek bir sonuç fotoğrafı (before/after karşılaştırması kaldırıldı)
  const photos = results.map(r => r.after || r.before);

  return `
    <section class="service-results">
      <div class="wrap">
        <div class="section-head">
          <h2>Görsel Sonuçlar</h2>
          <p>Gerçekleştirdiğimiz operasyonlardan örnek vakalar.</p>
        </div>
        <div class="results-slider-wrap">
          <button class="slider-btn results-nav results-nav-prev" data-results-prev aria-label="Önceki">←</button>
          <div class="results-track" data-results-track>
            ${photos.map((src, i) => `
              <div class="result-photo-card reveal" style="transition-delay:${(i % 6) * 70}ms;">
                <div class="result-photo" style="background-image:url('${src}');"></div>
              </div>
            `).join('')}
          </div>
          <button class="slider-btn results-nav results-nav-next" data-results-next aria-label="Sonraki">→</button>
        </div>
      </div>
    </section>
  `;
}

// ---------------------------------------------------------------
// Results slider (3-up, arrow navigation)
// ---------------------------------------------------------------
function initResultsSlider(root) {
  const track = root.querySelector('[data-results-track]');
  const prev = root.querySelector('[data-results-prev]');
  const next = root.querySelector('[data-results-next]');
  if (!track || !prev || !next) return;

  const step = () => {
    const card = track.querySelector('.result-photo-card');
    const gap = parseFloat(getComputedStyle(track).gap) || 20;
    return card ? card.getBoundingClientRect().width + gap : track.clientWidth;
  };
  prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
}

function videosHtml(videos) {
  if (!videos || videos.length === 0) return '';

  // Anasayfadaki video-stories bölümüyle birebir aynı stil:
  // video-gallery / video-card / video-play / video-info.
  return `
    <section class="service-videos">
      <div class="wrap">
        <div class="section-head-row">
          <div class="section-head">
            <span class="label">Hasta Testimonialları</span>
            <h2>Operasyon sonrası kendi sözleriyle.</h2>
            <p>Operasyondan sonra hastalarımızın kendi sözleriyle deneyimleri.</p>
          </div>
          <div class="slider-controls">
            <button class="slider-btn" id="testiPrev" aria-label="Önceki">←</button>
            <button class="slider-btn" id="testiNext" aria-label="Sonraki">→</button>
          </div>
        </div>
        <div class="video-gallery" id="testiGallery">
          ${videos.map((video, i) => {
    const videoId = extractYoutubeId(video.url);
    const photoVar = video.image ? `--photo:url('${video.image}');` : '';
    return `
            <div class="video-card reveal" data-video-id="${videoId}" style="transition-delay:${(i % 6) * 70}ms;${photoVar}">
              <button class="video-play" aria-label="Videoyu oynat"></button>
              <div class="video-info"><b>${video.name}</b><span>${video.duration}</span></div>
            </div>
          `;
  }).join('')}
        </div>
      </div>
    </section>
  `;
}

// ---------------------------------------------------------------
// Testimonial slider (ok butonları) — anasayfadaki video-stories
// slider'ıyla aynı davranış.
// ---------------------------------------------------------------
function initTestiSlider(root) {
  const track = root.querySelector('#testiGallery');
  const prev = root.querySelector('#testiPrev');
  const next = root.querySelector('#testiNext');
  if (!track || !prev || !next) return;

  const step = () => {
    const card = track.querySelector('.video-card');
    const gap = parseFloat(getComputedStyle(track).gap) || 18;
    return card ? card.getBoundingClientRect().width + gap : track.clientWidth;
  };
  prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
}

function extractYoutubeId(url) {
  if (!url) return '';
  const match = url.match(/embed\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : '';
}

// ---------------------------------------------------------------
// Click-to-play video cards (loads iframe only on click)
// ---------------------------------------------------------------
function initVideoCards(root) {
  root.querySelectorAll('.video-card[data-video-id]').forEach(card => {
    card.addEventListener('click', () => {
      if (card.classList.contains('video-active')) return;
      const videoId = card.dataset.videoId;
      if (!videoId) return;
      const title = card.querySelector('.video-info b')?.textContent || 'Hasta Videosu';
      card.classList.add('video-active');
      card.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" title="${title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    });
  });
}

// ---------------------------------------------------------------
// Related services slider
// ---------------------------------------------------------------
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

  // Meta info
  const iconDuration = `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>`;
  const iconRecovery = `<svg viewBox="0 0 24 24"><path d="M12 21s-7.2-4.6-9.6-9.2C.7 8.1 2.4 4.5 6 4.5c2 0 3.3 1 4 2.2.7-1.2 2-2.2 4-2.2 3.6 0 5.3 3.6 3.6 7.3C19.2 16.4 12 21 12 21z" /></svg>`;
  const metaParts = [];
  if (service.duration) metaParts.push(`<span>${iconDuration}Operasyon süresi: <b>${service.duration}</b></span>`);
  if (service.recovery) metaParts.push(`<span>${iconRecovery}İyileşme süresi: <b>${service.recovery}</b></span>`);
  const metaHtml = metaParts.length ? `<div class="service-meta">${metaParts.join('')}</div>` : '';

  const coverStyle = service.image ? ` style="--photo:url('${service.image}');"` : '';
  const contentHtml = (service.content || []).map(contentBlockHtml).join('');

  // Related services (excluding current)
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

  root.innerHTML = `
    <section class="article-hero">
      <div class="wrap">
        <div class="breadcrumb"><a href="index.html">Ana Sayfa</a><span>→</span><a href="index.html#services">Uzmanlık</a><span>→</span><span>${service.category}</span></div>
        <div class="section-head">
          <span class="label">${service.category}</span>
          <h2>${service.title}</h2>
          ${service.excerpt ? `<p>${service.excerpt}</p>` : ''}
          ${metaHtml}
        </div>
      </div>
    </section>
    <section style="padding-top:0;padding-bottom:0;">
      <div class="wrap">
        <div class="article-cover"${coverStyle}></div>
      </div>
    </section>
    <section style="padding-top:16px;padding-bottom:0;">
      <div class="wrap">
        <div class="article-body">${contentHtml}</div>
      </div>
    </section>
    ${stepsHtml(service)}
    ${resultsHtml(service.results)}
    ${videosHtml(service.videos)}
    ${relatedHtml}
  `;

  // Nasıl Uygulanır fotoğraf yığını + sonuç slider'ı + testimonial slider'ı + tıkla-oynat
  initStepPhotoStack(root);
  initResultsSlider(root);
  initTestiSlider(root);
  initVideoCards(root);

  // Apply reveal animations to all elements
  root.querySelectorAll('.reveal').forEach((el, i) => applyReveal(el, i));

  // Related track reveal
  const relatedTrack = document.getElementById('relatedTrack');
  if (relatedTrack) {
    relatedTrack.querySelectorAll('.blog-card').forEach((el, i) => applyReveal(el, i));
  }

  // Step reveal
  root.querySelectorAll('.process-step').forEach((el, i) => {
    if (!el.classList.contains('in-view')) {
      revealObserver.observe(el);
    }
  });

  // Result photo cards reveal
  root.querySelectorAll('.result-photo-card').forEach((el, i) => {
    if (!el.classList.contains('in-view')) {
      revealObserver.observe(el);
    }
  });

  // Video cards reveal
  root.querySelectorAll('.video-card').forEach((el, i) => {
    if (!el.classList.contains('in-view')) {
      revealObserver.observe(el);
    }
  });
})();
