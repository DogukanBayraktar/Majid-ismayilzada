// ---------------------------------------------------------------
// Ortak header davranışı — tüm sayfalarda kullanılır:
// 1) Scroll aşağı -> header gizlenir, scroll yukarı -> header geri gelir.
// 2) 40px sonrası header'a arka plan/blur eklenir (scrolled).
// 3) "Daha Fazla" dropdown menüsü: hover (masaüstü) + click (dokunmatik).
// ---------------------------------------------------------------
(function () {
  const header = document.getElementById('siteHeader');
  if (header) {
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const currentY = window.scrollY;
      header.classList.toggle('scrolled', currentY > 40);

      // Sayfa başına yakınken veya mobil menü açıkken gizleme.
      const mobileNavOpen = document.getElementById('mobileNav')?.classList.contains('open');
      if (!mobileNavOpen && currentY > lastScrollY && currentY > 120) {
        header.classList.add('hide');
      } else {
        header.classList.remove('hide');
      }
      lastScrollY = currentY;
    }, { passive: true });
  }

  // "Daha Fazla" dropdown — dokunmatik cihazlarda tıklayarak aç/kapat.
  document.querySelectorAll('.nav-more').forEach((item) => {
    const trigger = item.querySelector('.nav-more-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = item.classList.toggle('open');
      trigger.setAttribute('aria-expanded', String(isOpen));
    });
  });
  document.addEventListener('click', () => {
    document.querySelectorAll('.nav-more.open').forEach((item) => {
      item.classList.remove('open');
      item.querySelector('.nav-more-trigger')?.setAttribute('aria-expanded', 'false');
    });
  });
})();
