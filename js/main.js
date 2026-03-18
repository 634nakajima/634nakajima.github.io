/* ============================================
   634.nakajima Portfolio - Main JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Navbar scroll effect --- */
  const nav = document.querySelector('.nav');
  const handleNavScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  /* --- Mobile nav toggle --- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* --- Scroll animations (IntersectionObserver) --- */
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(el => observer.observe(el));
  }

  /* --- Project filter --- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.era === filter) {
          card.style.display = '';
          card.style.animation = 'fadeUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* --- Project modal --- */
  const modalOverlay = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-content');
  const modalClose = document.querySelector('.modal-close');

  // Project data stored in data attributes
  document.querySelectorAll('.project-card[data-modal]').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.modal;
      const detail = document.getElementById('detail-' + id);
      if (!detail) return;

      modalBody.innerHTML = detail.innerHTML;
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Lazy load YouTube in modal
      modalBody.querySelectorAll('.youtube-lazy').forEach(initYoutubeLazy);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    // Stop any playing videos
    setTimeout(() => {
      modalBody.querySelectorAll('iframe').forEach(f => f.remove());
      modalBody.innerHTML = '';
    }, 300);
  }

  /* --- YouTube lazy loading --- */
  function initYoutubeLazy(el) {
    el.addEventListener('click', function handler() {
      const src = el.dataset.src;
      if (!src) return;
      const iframe = document.createElement('iframe');
      iframe.src = src + (src.includes('?') ? '&' : '?') + 'autoplay=1';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:none;';
      el.innerHTML = '';
      el.appendChild(iframe);
      el.removeEventListener('click', handler);
    });
  }

  document.querySelectorAll('.youtube-lazy').forEach(initYoutubeLazy);

  /* --- Works tabs --- */
  const tabs = document.querySelectorAll('.works-tab');
  const panels = document.querySelectorAll('.works-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(target)?.classList.add('active');
    });
  });

  /* --- Back to top --- */
  const btt = document.querySelector('.back-to-top');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('visible', window.scrollY > 300);
    }, { passive: true });
    btt.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --- Hero waveform animation --- */
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h, time = 0;
    let animId;

    function resize() {
      w = canvas.width = canvas.parentElement.offsetWidth;
      h = canvas.height = canvas.parentElement.offsetHeight;
    }

    function draw() {
      time += 0.008;
      ctx.clearRect(0, 0, w, h);

      // Draw multiple wave layers
      const waves = [
        { amp: 40, freq: 0.008, speed: 1, color: 'rgba(99, 102, 241, 0.12)', yOff: 0.5 },
        { amp: 25, freq: 0.012, speed: 1.3, color: 'rgba(139, 92, 246, 0.08)', yOff: 0.48 },
        { amp: 55, freq: 0.005, speed: 0.7, color: 'rgba(34, 211, 238, 0.06)', yOff: 0.52 },
        { amp: 15, freq: 0.02, speed: 1.8, color: 'rgba(99, 102, 241, 0.05)', yOff: 0.45 },
      ];

      waves.forEach(wave => {
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 2) {
          const y = h * wave.yOff
            + Math.sin(x * wave.freq + time * wave.speed) * wave.amp
            + Math.sin(x * wave.freq * 0.5 + time * wave.speed * 0.8) * wave.amp * 0.5;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fillStyle = wave.color;
        ctx.fill();
      });

      // Particle dots
      for (let i = 0; i < 30; i++) {
        const px = (i / 30) * w + Math.sin(time * 0.5 + i) * 20;
        const py = h * 0.5 + Math.sin(time + i * 0.8) * 60;
        const alpha = 0.1 + Math.sin(time * 2 + i) * 0.05;
        const size = 1 + Math.sin(time + i * 0.3) * 0.5;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize);

    // Pause when not visible
    const heroObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!animId) draw();
      } else {
        cancelAnimationFrame(animId);
        animId = null;
      }
    });
    heroObserver.observe(canvas.parentElement);
  }

});

/* Fade-up animation for filter */
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
