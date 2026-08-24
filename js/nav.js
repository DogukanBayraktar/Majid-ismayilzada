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
    // Tam ekran menü overlay'ini body'ye taşı — header içindeki
    // backdrop-filter/transform fixed konumlandırmayı bozmaması için.
    if (mobileNav.parentElement !== document.body) {
      document.body.appendChild(mobileNav);
    }

    const setMenu = (open) => {
      navToggle.classList.toggle('open', open);
      mobileNav.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('menu-open', open);
    };

    navToggle.addEventListener('click', () => {
      setMenu(!mobileNav.classList.contains('open'));
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenu(false));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setMenu(false);
    });

    // Masaüstü genişliğine geçilince menüyü sıfırla
    window.addEventListener('resize', () => {
      if (window.innerWidth > 920 && mobileNav.classList.contains('open')) {
        setMenu(false);
      }
    }, { passive: true });
  }
})();
