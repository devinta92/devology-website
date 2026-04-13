/* ════════════════════════════════════════════════════════════════
   DEVOLOGY TECHNOLOGY — Main JavaScript
════════════════════════════════════════════════════════════════ */

// ─── NAVBAR SCROLL ───────────────────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ─── WHATSAPP FLOATING BUTTON ─────────────────────────────────
const waFloat = document.getElementById('waFloat');

// Show after 2s or after scrolling past hero
setTimeout(() => {
  if (waFloat) waFloat.classList.add('visible');
}, 2000);

window.addEventListener('scroll', () => {
  if (!waFloat) return;
  if (window.scrollY > 300) {
    waFloat.classList.add('visible');
  }
}, { passive: true });

// ─── MOBILE MENU ─────────────────────────────────────────────
const burger = document.querySelector('.nav-burger');
const navLinks = document.querySelector('.nav-links');
const navCta = document.querySelector('.nav-cta');

if (burger) {
  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navCta.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navCta.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ─── SCROLL REVEAL ───────────────────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── STAT BAR ANIMATION ──────────────────────────────────────
const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        statObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll('.result-stat').forEach(el => statObserver.observe(el));

// ─── SMOOTH SCROLL FOR ANCHORS ────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ─── CONTACT FORM ────────────────────────────────────────────
function handleFormSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const data = new FormData(form);

  // Build WhatsApp message from form data
  const name = data.get('name') || '';
  const whatsapp = data.get('whatsapp') || '';
  const websiteType = data.get('website_type') || '';
  const budget = data.get('budget') || '';
  const message = data.get('message') || '';

  const waMessage = encodeURIComponent(
    `Halo Devology! 👋\n\n` +
    `Nama/Bisnis: ${name}\n` +
    `No. WA: ${whatsapp}\n` +
    `Tipe website: ${websiteType}\n` +
    `Budget: ${budget}\n` +
    (message ? `\nCerita: ${message}` : '') +
    `\n\nSaya ingin konsultasi lebih lanjut.`
  );

  // Show success state
  form.style.display = 'none';
  success.style.display = 'flex';

  // Open WhatsApp after a short delay
  setTimeout(() => {
    window.open(`https://wa.me/6281219215091?text=${waMessage}`, '_blank');
  }, 800);
}

// ─── ACTIVE NAV LINK (on scroll) ─────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--c-text)'
            : 'var(--c-text-muted)';
        });
      }
    });
  },
  { threshold: 0.4, rootMargin: '-80px 0px -40% 0px' }
);

sections.forEach(s => sectionObserver.observe(s));

// ─── COUNTER ANIMATION ───────────────────────────────────────
function animateCounter(el, end, suffix = '') {
  const start = 0;
  const duration = 1200;
  const step = (timestamp) => {
    if (!start_time) start_time = timestamp;
    const progress = Math.min((timestamp - start_time) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * end) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  let start_time = null;
  requestAnimationFrame(step);
}

const statNums = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;

        if (text.includes('50+')) animateCounter(el, 50, '+');
        else if (text.includes('<2s')) { /* keep as is */ }
        else if (text.includes('100%')) animateCounter(el, 100, '%');
        // "7 Hari" keeps as is

        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);

statNums.forEach(el => counterObserver.observe(el));
