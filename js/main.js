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
// Scroll reveal animations
const revealTargets = document.querySelectorAll(
    '.hero-copy, .hero-actions, .hero-visual, .hero-stats .stat, .section-head, .service-card, .cred-card, .process-step, .safety-photo, .safety-card, .cert-card, .story-card, .video-card, .blog-card, .faq-item, .ba-slider-wrap, .ba-card, #contact .box'
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
