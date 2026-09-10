
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
    const l = ((post.link || '') + '').trim();
    if (l && l !== '#') {
        if (/^blog-detay\.html\?id=/i.test(l)) {
            return `blog-detay.html?id=${encodeURIComponent(post.id)}`;
        }
        return l;
    }
    return `blog-detay.html?id=${encodeURIComponent(post.id)}`;
}

function relatedCardHtml(post) {
    const _t = (typeof i18n !== 'undefined') ? i18n.t : function(k){return k;};
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
<span class="read-more-link">${_t('blogReadMore')}</span>
</div>
</a>`;
}

function contentBlockHtml(block) {
    if (block.type === 'h3') return `<h3>${block.text}</h3>`;
    if (block.type === 'quote') return `<div class="article-quote">${block.text}</div>`;
    return `<p>${block.text}</p>`;
}

function renderNotFound(root) {
    const _t = (typeof i18n !== 'undefined') ? i18n.t : function(k){return k;};
    root.innerHTML = `
<section class="article-not-found">
<div class="wrap">
<span class="label" style="display:block;">Blog</span>
<h2>${_t('blogNotFound')}</h2>
<p>${_t('blogNotFoundDesc')}</p>
<a href="blog.html" class="btn btn-cta"><span>${_t('blogBackToAll')}</span><span class="arrow">\u2192</span></a>
</div>
</section>`;
}

(function initArticle() {
    const root = document.getElementById('articleRoot');
    const _t = (typeof i18n !== 'undefined') ? i18n.t : function(k){return k;};
    const blogPosts = (typeof i18n !== 'undefined') ? i18n.blog() : (typeof window.blogPosts !== 'undefined' ? window.blogPosts : []);
    if (!root || !blogPosts.length) return;

    document.body.style.overflowAnchor = 'none';
    if (window.history && 'scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
    }

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const post = blogPosts.find(p => p.id === id);

    if (!post) {
        renderNotFound(root);
        return;
    }

    document.getElementById('pageTitle').textContent = `${post.title} \u2014 ${_t('siteTitleDoc')}`;
    const descEl = document.getElementById('pageDescription');
    if (descEl) descEl.setAttribute('content', post.excerpt || '');

    const metaParts = [];
    if (post.author) metaParts.push(`<b>${post.author}</b>`);
    if (post.date) metaParts.push(`<span>${post.date}</span>`);
    const metaHtml = metaParts.map((m, i) => i === 0 ? m : `<span class="dot"></span>${m}`).join('');

    const coverStyle = post.image ? ` style="--photo:url('${post.image}');"` : '';
    const contentHtml = post.contentHtml || (post.content || []).map(contentBlockHtml).join('');

    const related = blogPosts.filter(p => p.id !== post.id).slice(0, 3);
    const relatedHtml = related.length
        ? `<section class="related-section">
<div class="wrap">
<div class="section-head">
<h2>${_t('blogRelatedTitle')}</h2>
<p>${_t('blogRelatedDesc')}</p>
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
<div class="breadcrumb"><a href="index.html">${_t('navHome')}</a><span>\u2192</span><a href="blog.html">${_t('navBlog')}</a><span>\u2192</span><span>${post.category}</span></div>
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
<section style="padding-top:16px;padding-bottom:0;">
<div class="wrap">
<div class="article-body">${contentHtml}</div>
<div class="article-share">
<a href="blog.html" class="back-link">\u2190 ${_t('blogBackToAll')}</a>
<span class="tag-pill">${post.category}</span>
</div>
</div>
</section>
${relatedHtml}
`;

    window.scrollTo(0, 0);

    const relatedTrack = document.getElementById('relatedTrack');
    if (relatedTrack) {
        relatedTrack.querySelectorAll('.blog-card').forEach((el, i) => applyReveal(el, i));
    }
    document.querySelectorAll('.article-body h3, .article-body p, .article-quote').forEach((el, i) => applyReveal(el, i));
})();
