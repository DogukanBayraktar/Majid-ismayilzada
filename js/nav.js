// ---------------------------------------------------------------
// Ortak header davranışı — tüm sayfalarda kullanılır:
// 1) Scroll aşağı -> header gizlenir, scroll yukarı -> header geri gelir.
// 2) 40px sonrası header'a arka plan/blur eklenir (scrolled).
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

  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        mobileNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();
