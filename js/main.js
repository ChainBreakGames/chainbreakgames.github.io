/* ═══════════════════════════════════════════════════
   ChainBreak Games — main.js
═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── copyright year ── */
  const yearEl = document.getElementById('copyright-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── mobile hamburger ── */
  const hamburger = document.querySelector('.nav__hamburger');
  const navLinks  = document.querySelector('.nav__links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
    });

    // close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* ── active nav link (index.html only) ── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

  if (sections.length && navAnchors.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(s => observer.observe(s));
  }

  /* ── placeholder image fallback ── */
  document.querySelectorAll('img[data-fallback]').forEach(img => {
    img.addEventListener('error', function () {
      const placeholder = document.createElement('div');
      placeholder.className = this.dataset.fallback;
      placeholder.innerHTML = `<span>${this.alt || 'Image'}</span><span class="hint">Replace ${this.src.split('/').pop()}</span>`;
      this.parentNode.replaceChild(placeholder, this);
    });
  });

});
