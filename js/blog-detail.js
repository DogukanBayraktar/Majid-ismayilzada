// ---------------------------------------------------------------
// Ortak mobil menü davranışı (header scroll/gizle-göster js/nav.js'de)
// ---------------------------------------------------------------
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');
if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        mobileNav.classList.toggle('open');
    });
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        navToggle.classList.remove('open');
        mobileNav.classList.remove('open');
    }));
}

// Scroll reveal
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

function hrefFor(post) {
    return (post.link && post.link !== '#') ? post.link : `blog-detay.html?id=${encodeURIComponent(post.id)}`;
}

function relatedCardHtml(post) {
    const thumbStyle = post.image
        ? ` style="background-image:url('${post.image}');background-size:cover;background-position:center;"`
        : '';
    const meta = post.date || '';
    return `
<a class="blog-card" href="${hrefFor(post)}" style="display:block;">
<div class="blog-thumb"${thumbStyle}></div>
<div class="blog-body">
<span>${post.category}</span>
${meta ? `<span class="blog-meta">${meta}</span>` : ''}
<h4>${post.title}</h4>
<p>${post.excerpt}</p>
<span class="read-more-link">Devamını oku</span>
</div>
</a>`;
}

function contentBlockHtml(block) {
    if (block.type === 'h3') return `<h3>${block.text}</h3>`;
    if (block.type === 'quote') return `<div class="article-quote">${block.text}</div>`;
    return `<p>${block.text}</p>`;
}

function renderNotFound(root) {
    root.innerHTML = `
<section class="article-not-found">
<div class="wrap">
<span class="label" style="display:block;">Blog</span>
<h2>Aradığınız yazı bulunamadı</h2>
<p>Bu yazı kaldırılmış ya da bağlantı hatalı olabilir. Tüm yazılarımıza göz atabilirsiniz.</p>
<a href="blog.html" class="btn btn-cta"><span>Tüm Yazılara Dön</span><span class="arrow">→</span></a>
</div>
</section>`;
}

(function initArticle() {
    const root = document.getElementById('articleRoot');
    if (!root || typeof blogPosts === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const post = blogPosts.find(p => p.id === id);

    if (!post) {
        renderNotFound(root);
        return;
    }

    document.getElementById('pageTitle').textContent = `${post.title} — Doç. Dr. Majid İsmayilzada`;
    const descEl = document.getElementById('pageDescription');
    if (descEl) descEl.setAttribute('content', post.excerpt || '');

    const metaParts = [];
    if (post.author) metaParts.push(`<b>${post.author}</b>`);
    if (post.date) metaParts.push(`<span>${post.date}</span>`);
    const metaHtml = metaParts.map((m, i) => i === 0 ? m : `<span class="dot"></span>${m}`).join('');

    const coverStyle = post.image ? ` style="--photo:url('${post.image}');"` : '';
    const contentHtml = (post.content || []).map(contentBlockHtml).join('');

    const related = blogPosts.filter(p => p.id !== post.id).slice(0, 3);
    const relatedHtml = related.length
        ? `<section class="related-section">
<div class="wrap">
<div class="section-head">
<h2>Sonraki Yazılar</h2>
<p>İlgili konuları keşfetmek için diğer yazılarımızı okuyun.</p>
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
<div class="breadcrumb"><a href="index.html">Ana Sayfa</a><span>→</span><a href="blog.html">Blog</a><span>→</span><span>${post.category}</span></div>
<div class="section-head">
<span class="label">${post.category}</span>
<h2>${post.title}</h2>
${post.excerpt ? `<p>${post.excerpt}</p>` : ''}
<div class="article-meta">${metaHtml}</div>
</div>
</div>
</section>
<section style="padding-top:0;padding-bottom:0;">
<div class="wrap">
<div class="article-cover"${coverStyle}></div>
</div>
</section>
<section style="padding-top:0;padding-bottom:0;">
<div class="wrap">
<div class="article-body">${contentHtml}</div>
<div class="article-share">
<a href="blog.html" class="back-link">← Tüm Yazılara Dön</a>
<span class="tag-pill">${post.category}</span>
</div>
</div>
</section>
${relatedHtml}
`;

    const relatedTrack = document.getElementById('relatedTrack');
    if (relatedTrack) {
        relatedTrack.querySelectorAll('.blog-card').forEach((el, i) => applyReveal(el, i));
    }
    document.querySelectorAll('.article-body h3, .article-body p, .article-quote').forEach((el, i) => applyReveal(el, i));
})();
