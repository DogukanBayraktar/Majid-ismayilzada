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

// Scroll reveal (kart animasyonları)
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

function cardHtml(post) {
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

// ---------------------------------------------------------------
// BLOG LİSTESİ: data/blog-posts.js dosyasındaki TÜM yazıları,
// kategoriye göre filtrelenebilir bir grid içinde gösterir.
// Pagination: 9'dan fazla post varsa sayfa numaraları gösterilir.
// ---------------------------------------------------------------
(function initBlogList() {
    const track = document.getElementById('blogAllTrack');
    const filterWrap = document.getElementById('blogFilter');
    const paginationWrap = document.getElementById('blogPagination');
    if (!track || typeof blogPosts === 'undefined') return;

    const POSTS_PER_PAGE = 9;
    let currentPage = 1;
    let currentCategory = 'Tümü';
    let filteredPosts = [];

    const categories = ['Tümü', ...Array.from(new Set(blogPosts.map(p => p.category)))];

    function getPaginatedPosts(posts, page) {
        const start = (page - 1) * POSTS_PER_PAGE;
        return posts.slice(start, start + POSTS_PER_PAGE);
    }

    function getTotalPages(postsCount) {
        return Math.ceil(postsCount / POSTS_PER_PAGE);
    }

    function renderPagination(totalPosts) {
        if (!paginationWrap) return;
        const totalPages = getTotalPages(totalPosts);
        paginationWrap.innerHTML = '';

        if (totalPages <= 1) return;

        const prevBtn = document.createElement('button');
        prevBtn.className = 'pagination-btn' + (currentPage === 1 ? ' disabled' : '');
        prevBtn.textContent = '← Önceki';
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                render(currentCategory);
                track.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
        paginationWrap.appendChild(prevBtn);

        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = 'pagination-btn' + (i === currentPage ? ' active' : '');
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                render(currentCategory);
                track.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            paginationWrap.appendChild(pageBtn);
        }

        const nextBtn = document.createElement('button');
        nextBtn.className = 'pagination-btn' + (currentPage === totalPages ? ' disabled' : '');
        nextBtn.textContent = 'Sonraki →';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                render(currentCategory);
                track.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
        paginationWrap.appendChild(nextBtn);
    }

    function render(activeCategory) {
        currentCategory = activeCategory;
        filteredPosts = activeCategory === 'Tümü' ? blogPosts : blogPosts.filter(p => p.category === activeCategory);
        currentPage = 1; // Reset to first page when filtering

        const paginatedPosts = getPaginatedPosts(filteredPosts, currentPage);

        track.innerHTML = paginatedPosts.length
            ? paginatedPosts.map(cardHtml).join('')
            : `<div class="blog-empty" style="grid-column: 1 / -1;">Bu kategoride henüz yazı bulunmuyor.</div>`;

        track.querySelectorAll('.blog-card').forEach((el, i) => applyReveal(el, i));
        renderPagination(filteredPosts.length);
    }

    if (filterWrap) {
        filterWrap.innerHTML = categories.map((cat, i) =>
            `<button class="filter-chip${i === 0 ? ' active' : ''}" data-cat="${cat}">${cat}</button>`
        ).join('');

        filterWrap.querySelectorAll('.filter-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                filterWrap.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                render(chip.dataset.cat);
            });
        });
    }

    render('Tümü');
})();
