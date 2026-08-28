// Hero iletişim formu — doğrulama + FormSubmit.co ile doğrudan e-postaya gönderim
const heroForm = document.getElementById('heroForm');
if (heroForm) {
    const adSoyadInput = document.getElementById('adSoyad');
    const alanKoduSelect = document.getElementById('alanKodu'); // gizli input: seçili alan kodunu tutar
    const telefonInput = document.getElementById('telefon');
    const epostaInput = document.getElementById('eposta');
    const islemInput = document.getElementById('islem');

    const islemDropdown = document.getElementById('islemDropdown');
    const islemBtn = document.getElementById('islemBtn');
    const islemList = document.getElementById('islemList');
    const islemText = document.getElementById('islemText');

    // Özel alan kodu dropdown'ı (bayrak ikonları flagcdn.com üzerinden — native select'te bayrak emojisi Windows'ta render olmuyor)
    const phoneCodeDropdown = document.getElementById('phoneCodeDropdown');
    const phoneCodeBtn = document.getElementById('phoneCodeBtn');
    const phoneCodeList = document.getElementById('phoneCodeList');
    const phoneCodeFlag = document.getElementById('phoneCodeFlag');
    const phoneCodeText = document.getElementById('phoneCodeText');

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

    // "İlgilendiğiniz İşlem" seçeneklerini data/services.js içindeki güncel
    // hizmet başlıklarından otomatik üretir (liste güncellendiğinde form da otomatik güncellenir).
    if (typeof services !== 'undefined' && Array.isArray(services) && services.length) {
        const titles = [...services.map(s => s.title), 'Diğer'];
        islemList.innerHTML = titles.map(t =>
            `<li role="option" data-value="${t}">${t}</li>`
        ).join('');
    }

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

    // Telefon: sadece rakam. +90 seçiliyken "5XX XXX XX XX" formatı, diğer kodlarda serbest gruplama
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

    const formSuccess = heroForm.querySelector('.form-success');
    const formFields = heroForm.querySelector('.form-fields');
    const formRetry = heroForm.querySelector('.form-retry');

    formRetry?.addEventListener('click', () => {
        heroForm.reset();
        islemInput.value = '';
        islemText.textContent = 'İlgilendiğiniz İşlem';
        islemText.classList.add('custom-select-placeholder');
        islemList.querySelector('li.active')?.classList.remove('active');
        phoneCodeFlag.src = 'https://flagcdn.com/w20/tr.png';
        phoneCodeText.textContent = '+90';
        alanKoduSelect.value = '+90';
        formSuccess.classList.remove('visible');
        formFields.classList.remove('hidden');
    });

    heroForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const validations = [validateAdSoyad(), validateTelefon(), validateEposta(), validateIslem()];
        if (validations.includes(false)) {
            heroForm.querySelector('.form-row.has-error input, .form-row.has-error .custom-select-btn')?.focus();
            return;
        }
        const submitBtn = heroForm.querySelector('.form-submit');
        const submitLabel = submitBtn.querySelector('span:first-child');
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
            heroForm.reset();
            islemInput.value = '';
            islemText.textContent = 'İlgilendiğiniz İşlem';
            islemText.classList.add('custom-select-placeholder');
            islemList.querySelector('li.active')?.classList.remove('active');
            phoneCodeFlag.src = 'https://flagcdn.com/w20/tr.png';
            phoneCodeText.textContent = '+90';
            alanKoduSelect.value = '+90';
            formFields.classList.add('hidden');
            formSuccess.classList.add('visible');
            submitBtn.disabled = false;
            submitLabel.textContent = 'Bilgi Talep Et';
        } catch (err) {
            submitLabel.textContent = 'Bir hata oluştu, tekrar deneyin';
            setTimeout(() => {
                submitLabel.textContent = 'Bilgi Talep Et';
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}
// Hasta video yorumları galerisi — her kart kendi YouTube videosunu oynatır
document.querySelectorAll('.video-card[data-video-id]').forEach(card => {
    card.addEventListener('click', () => {
        if (card.classList.contains('video-active')) return;
        const videoId = card.dataset.videoId;
        const title = card.querySelector('.video-info b')?.textContent || 'Hasta Videosu';
        card.classList.add('video-active');
        card.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" title="${title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    });
});
document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => { i.classList.remove('open'); i.querySelector('.faq-a').style.maxHeight = null; });
        if (!isOpen) { item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
});
const baPrev = document.getElementById('baPrev');
const baNext = document.getElementById('baNext');
const baTrack = document.getElementById('baTrack');
function baStep() {
    const card = baTrack?.querySelector('.ba-card');
    const gap = baTrack ? (parseFloat(getComputedStyle(baTrack).gap) || 18) : 18;
    return card ? card.getBoundingClientRect().width + gap : (baTrack?.clientWidth || 0);
}
baPrev?.addEventListener('click', () => baTrack?.scrollBy({ left: -baStep(), behavior: 'smooth' }));
baNext?.addEventListener('click', () => baTrack?.scrollBy({ left: baStep(), behavior: 'smooth' }));
function makeSlider(trackId, prevId, nextId, cardSelector) {
    const track = document.getElementById(trackId);
    const prev = document.getElementById(prevId);
    const next = document.getElementById(nextId);
    if (!track || !prev || !next) return;
    const step = () => {
        const card = track.querySelector(cardSelector);
        const gap = parseFloat(getComputedStyle(track).gap) || 16;
        return card ? card.getBoundingClientRect().width + gap : track.clientWidth;
    };
    prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
}
makeSlider('storyTrack', 'storiesPrev', 'storiesNext', '.story-card');
makeSlider('videoGallery', 'videoPrev', 'videoNext', '.video-card');
makeSlider('certTrack', 'certPrev', 'certNext', '.cert-card');

// ---------------------------------------------------------------
// HASTANE: fotoğraf alanı — otomatik geçişli (fade) slider.
// Fareyle üzerine gelindiğinde durur, noktalara tıklayarak manuel
// geçiş de yapılabilir.
// ---------------------------------------------------------------
(function initHospitalSlider() {
    const wrap = document.getElementById('hospitalSliderWrap');
    const slider = document.getElementById('hospitalSlider');
    const dotsWrap = document.getElementById('hospitalDots');
    const prev = document.getElementById('hospitalPrev');
    const next = document.getElementById('hospitalNext');
    if (!wrap || !slider || !dotsWrap) return;
    const slides = Array.from(slider.querySelectorAll('.hospital-slide'));
    const dots = Array.from(dotsWrap.querySelectorAll('.hospital-dot'));
    if (slides.length < 2) return;
    let index = 0;
    let timer = null;

    function show(i) {
        index = (i + slides.length) % slides.length;
        slides.forEach((s, n) => s.classList.toggle('is-active', n === index));
        dots.forEach((d, n) => d.classList.toggle('is-active', n === index));
    }

    function start() {
        stop();
        timer = setInterval(() => show(index + 1), 4500);
    }

    function stop() {
        if (timer) clearInterval(timer);
        timer = null;
    }

    dots.forEach(dot => dot.addEventListener('click', () => {
        show(Number(dot.dataset.index));
        start();
    }));
    prev?.addEventListener('click', () => {
        show(index - 1);
        start();
    });
    next?.addEventListener('click', () => {
        show(index + 1);
        start();
    });
    wrap.addEventListener('mouseenter', stop);
    wrap.addEventListener('mouseleave', start);

    start();
})();

// ---------------------------------------------------------------
// İSTANBUL: tam genişlik görsel slider — ok butonları, nokta
// göstergeleri ve kaydırma ile senkronize çalışır.
// ---------------------------------------------------------------
(function initIstanbulSlider() {
    const wrap = document.getElementById('istanbulSliderWrap');
    const slider = document.getElementById('istanbulSlider');
    const prev = document.getElementById('istanbulPrev');
    const next = document.getElementById('istanbulNext');
    const dotsWrap = document.getElementById('istanbulDots');
    if (!slider || !dotsWrap) return;
    const slideCount = slider.querySelectorAll('.istanbul-slide').length;
    const dots = Array.from(dotsWrap.querySelectorAll('.istanbul-dot'));
    let timer = null;

    function currentIndex() {
        return Math.round(slider.scrollLeft / slider.clientWidth);
    }

    function setActiveDot(index) {
        dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
    }

    function goTo(index) {
        const wrapped = (index + slideCount) % slideCount;
        slider.scrollTo({ left: wrapped * slider.clientWidth, behavior: 'smooth' });
    }

    function start() {
        stop();
        if (slideCount < 2) return;
        timer = setInterval(() => goTo(currentIndex() + 1), 4500);
    }

    function stop() {
        if (timer) clearInterval(timer);
        timer = null;
    }

    prev?.addEventListener('click', () => { goTo(currentIndex() - 1); start(); });
    next?.addEventListener('click', () => { goTo(currentIndex() + 1); start(); });
    dots.forEach(dot => dot.addEventListener('click', () => { goTo(Number(dot.dataset.index)); start(); }));

    let scrollTimer;
    slider.addEventListener('scroll', () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => setActiveDot(currentIndex()), 80);
    });

    wrap?.addEventListener('mouseenter', stop);
    wrap?.addEventListener('mouseleave', start);

    start();
})();
// Scroll reveal animations
const revealTargets = document.querySelectorAll(
    '.hero-copy, .hero-actions, .hero-form-wrap, .section-head, .service-card, .cred-card, .process-step, .safety-photo, .safety-card, .cert-card, .story-card, .video-card, .blog-card, .faq-item, .ba-slider-wrap, .ba-card, #contact .box, .hospital-slider-wrap, .istanbul-slider-wrap, .istanbul-feature'
);
revealTargets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = ((i % 6) * 70) + 'ms';
});
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
revealTargets.forEach(el => revealObserver.observe(el));

// ---------------------------------------------------------------
// SÜREÇ (PROCESS): scroll edilirken 3 fotoğraf kartını, hangi
// adımın görünümde olduğuna göre üst üste yığılmış şekilde
// animasyonla öne/arkaya alır.
// Aktif grup: üst kenarı ekran ortasını EN SON geçen adımın grubudur.
// Adımlar yukarıdan aşağıya tarandığı için gruplar daima sırayla
// ilerler (0 -> 1 -> 2), atlama imkansızdır.
// ---------------------------------------------------------------
(function initProcessStack() {
    const photosWrap = document.getElementById('processPhotos');
    if (!photosWrap) return;
    const steps = Array.from(document.querySelectorAll('.process-step[data-photo-group]'));
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

    // Başlangıçta ve düzen oturduğunda mevcut konuma göre hizala
    const syncInitial = () => { currentGroup = -1; computeActive(); };
    syncInitial();
    window.addEventListener('load', () => setTimeout(syncInitial, 60));
})();

// ---------------------------------------------------------------
// BLOG: data/blog-posts.js dosyasındaki `blogPosts` dizisinden
// kartları otomatik oluşturur. Yeni yazı eklemek/çıkarmak için
// admin panel gerekmez — sadece o dosyayı düzenlemek yeterlidir.
// ---------------------------------------------------------------
function renderBlogPosts() {
    const track = document.getElementById('blogTrack');
    if (!track || typeof blogPosts === 'undefined') return;

    track.innerHTML = blogPosts.slice(0, 3).map(post => {
        const thumbStyle = post.image
            ? ` style="background-image:url('${post.image}');background-size:cover;background-position:center;"`
            : '';
        const meta = post.date || '';
        const href = (post.link && post.link !== '#') ? post.link : `blog-detay.html?id=${encodeURIComponent(post.id)}`;
        return `
<a class="blog-card" href="${href}" style="display:block;">
<div class="blog-thumb"${thumbStyle}></div>
<div class="blog-body">
<span>${post.category}</span>
${meta ? `<span class="blog-meta">${meta}</span>` : ''}
<h4>${post.title}</h4>
<p>${post.excerpt}</p>
<span class="read-more-link">Devamını oku</span>
</div>
</a>`;
    }).join('');

    // Yeni oluşan kartlara da scroll-reveal animasyonunu uygula
    const newCards = track.querySelectorAll('.blog-card');
    newCards.forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = ((i % 6) * 70) + 'ms';
        revealObserver.observe(el);
    });
}
renderBlogPosts();

// Hero arka plan videosu — mobil tarayıcılarda otomatik oynatmayı garanti altına al
const heroVideo = document.getElementById('heroVideo');
if (heroVideo) {
    // iOS'in eski sürümleri attribute yerine JS mute'u gerektiriyor
    heroVideo.muted = true;

    const tryPlay = () => {
        if (!heroVideo.paused) return;
        const p = heroVideo.play();
        if (p && typeof p.catch === 'function') p.catch(() => { });
    };

    tryPlay();

    // Video yüklendikçe tekrar dene
    ['loadeddata', 'loadedmetadata', 'canplay', 'canplaythrough'].forEach(ev => {
        heroVideo.addEventListener(ev, tryPlay);
    });

    // Sekmeye/uygulamaya geri dönüldüğünde veya bfcache'ten gelindiğinde devam ettir
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') tryPlay();
    });
    window.addEventListener('pageshow', tryPlay);
    window.addEventListener('focus', tryPlay);

    // Mobil ağlarda video geç yüklenirse periyodik yeniden dene (maks ~15 sn)
    let retries = 0;
    const retryTimer = setInterval(() => {
        if (!heroVideo.paused || retries++ > 20) clearInterval(retryTimer);
        else tryPlay();
    }, 700);

    // Düşük güç modu vb. engelleyici varsa ilk kullanıcı etkileşiminde başlat
    const unlockVideo = () => { heroVideo.muted = true; tryPlay(); };
    ['touchstart', 'touchend', 'click', 'keydown'].forEach(ev => {
        document.addEventListener(ev, unlockVideo, { once: true, passive: true });
    });
}