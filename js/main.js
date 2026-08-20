const heroVisual = document.getElementById('heroVisual');
const heroPlayBtn = document.getElementById('heroPlayBtn');
heroPlayBtn?.addEventListener('click', () => {
    const videoId = heroVisual.dataset.videoId;
    heroVisual.classList.add('video-active');
    heroVisual.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" title="Tanıtım Videosu" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
});
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
    '.hero-copy, .hero-actions, .hero-visual, .hero-stats .stat, .section-head, .service-card, .cred-card, .process-step, .safety-photo, .safety-card, .cert-card, .story-card, .video-card, .blog-card, .faq-item, .ba-slider-wrap, .ba-card, #contact .box, .hospital-slider-wrap, .istanbul-slider-wrap, .istanbul-feature'
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
// ---------------------------------------------------------------
(function initProcessStack() {
    const photosWrap = document.getElementById('processPhotos');
    if (!photosWrap) return;
    const steps = Array.from(document.querySelectorAll('.process-step[data-photo-group]'));
    const photos = Array.from(photosWrap.querySelectorAll('.process-photo'));
    if (!steps.length || !photos.length) return;

    function setActiveGroup(activeIndex) {
        photos.forEach(photo => {
            const idx = Number(photo.dataset.photoIndex);
            photo.classList.remove('is-active', 'is-prev', 'is-next');
            if (idx === activeIndex) photo.classList.add('is-active');
            else if (idx < activeIndex) photo.classList.add('is-prev');
            else photo.classList.add('is-next');
        });
    }

    // Başlangıçta ilk grup aktif
    setActiveGroup(0);

    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const group = Number(entry.target.dataset.photoGroup);
                setActiveGroup(group);
            }
        });
    }, { threshold: 0.5, rootMargin: '-35% 0px -35% 0px' });

    steps.forEach(step => stepObserver.observe(step));
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
