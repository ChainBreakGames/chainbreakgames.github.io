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

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.game__screenshots').forEach(gallery => {
    const screenshots = JSON.parse(gallery.dataset.screenshots || '[]');
    if (!screenshots.length) return;

    const btnLeft = gallery.querySelector('.game__screenshot-arrow--left');
    const btnRight = gallery.querySelector('.game__screenshot-arrow--right');
    let current = 0;

    // Build a flex strip of all images
    const strip = document.createElement('div');
    strip.className = 'game__screenshot-slide';
    screenshots.forEach((src, i) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = `Screenshot ${i + 1}`;
      img.onerror = () => {
        gallery.innerHTML = '<div class="game__image-placeholder"><span>Screenshot</span></div>';
      };
      strip.appendChild(img);
    });

    // Remove the old placeholder img, insert the strip before the buttons
    gallery.querySelector('.game__screenshot-img')?.remove();
    btnLeft.before(strip);

    function update() {
      strip.style.transform = `translateX(-${current * 100}%)`;
      btnLeft.classList.toggle('hidden', current === 0);
      btnRight.classList.toggle('hidden', current === screenshots.length - 1);
    }

    btnLeft.addEventListener('click', () => { if (current > 0) { current--; update(); } });
    btnRight.addEventListener('click', () => { if (current < screenshots.length - 1) { current++; update(); } });

    update();
  });
});

/* ── press kit lightbox ── */
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('screenshots-grid');
  if (!grid) return; // only runs on presskit.html

  const overlay  = document.getElementById('lightbox');
  const img      = document.getElementById('lightbox-img');
  const counter  = document.getElementById('lightbox-counter');
  const btnClose = document.getElementById('lightbox-close');
  const btnPrev  = document.getElementById('lightbox-prev');
  const btnNext  = document.getElementById('lightbox-next');

  const items = Array.from(grid.querySelectorAll('.screenshot-item img'));
  let current = 0;

  function show(index) {
    current = (index + items.length) % items.length;
    img.src = items[current].src;
    img.alt = items[current].alt;
    counter.textContent = (current + 1) + ' / ' + items.length;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    img.src = '';
  }

  grid.querySelectorAll('.screenshot-item').forEach(el => {
    el.addEventListener('click', () => show(parseInt(el.dataset.lightbox, 10)));
  });

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click',  () => show(current - 1));
  btnNext.addEventListener('click',  () => show(current + 1));

  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

  document.addEventListener('keydown', e => {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
});

document.querySelectorAll('.game__team').forEach(team => {
    team.addEventListener('click', () => {
        const members = team.nextElementSibling;
        members.classList.toggle('open');
    });
});