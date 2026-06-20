/* =========================================================================
   PORTFOLIO TEMPLATE — SHARED SCRIPT
   Handles: mobile nav toggle, scroll-reveal fade-ins, back-to-top button.
   Page-specific behaviour (certificate filters/modal, contact form) lives
   in inline <script> tags at the bottom of those pages for clarity.
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Mobile navigation toggle ---- */
  const menuBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('flex');
      if (isOpen) {
        mobileMenu.classList.remove('flex');
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
      } else {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('flex');
        menuBtn.setAttribute('aria-expanded', 'true');
      }
    });
  }

  /* ---- Scroll-reveal fade-in for elements with class "reveal" ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---- Back to top button ---- */
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.classList.remove('opacity-0', 'pointer-events-none');
      } else {
        backToTop.classList.add('opacity-0', 'pointer-events-none');
      }
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
