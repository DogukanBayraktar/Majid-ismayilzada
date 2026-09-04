
// Scroll reveal (kart animasyonları)
const serviceRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            serviceRevealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

function applyServiceReveal(el, i) {
    el.classList.add('reveal');
    el.style.transitionDelay = ((i % 6) * 70) + 'ms';
    serviceRevealObserver.observe(el);
}

// ---------------------------------------------------------------
// UZMANLIK LİSTESİ: data/services.js dosyasındaki TÜM işlemleri,
// filtre olmadan tek bir grid içinde gösterir.
// Kartlar services-detay.html?id=... bağlantısına gider.
// ---------------------------------------------------------------
(function initServicesList() {
    const track = document.getElementById('servicesAllTrack');
    if (!track || typeof services === 'undefined') return;

    function serviceHref(s) {
        const l = ((s.link || '') + '').trim();
        if (l && l !== '#') {
            if (/^services-detay\.html\?id=/i.test(l)) {
                return `services-detay.html?id=${encodeURIComponent(s.id)}`;
            }
            return l;
        }
        return `services-detay.html?id=${encodeURIComponent(s.id)}`;
    }

    track.innerHTML = services.map(s => `
<a class="service-card" href="${serviceHref(s)}">
<img src="${s.cardImage}" alt="${s.title}">
<h4>${s.title}</h4>
<p>${s.excerpt}</p>
<span class="more">Detaylı Bilgi <span class="a">→</span></span>
</a>`).join('');

    track.querySelectorAll('.service-card').forEach((el, i) => applyServiceReveal(el, i));
})();
