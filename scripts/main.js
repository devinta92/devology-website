/* ════════════════════════════════════════════════════════════════
   DEVOLOGY TECHNOLOGY — Main JavaScript
════════════════════════════════════════════════════════════════ */

// ─── GITHUB PORTFOLIO ────────────────────────────────────────
const GITHUB_USER = 'devinta92';

// Repos to skip (internal/boilerplate)
const SKIP_REPOS = new Set([
  'express-hello-world', 'CV', 'devology-website'
]);

// Language color map (GitHub colors)
const LANG_COLORS = {
  'HTML':       '#e34c26',
  'CSS':        '#563d7c',
  'JavaScript': '#f1e05a',
  'TypeScript': '#3178c6',
  'Python':     '#3572A5',
  'PHP':        '#4F5D95',
  'Vue':        '#41b883',
  'React':      '#61dafb',
};

// Friendly repo name formatter
function formatName(name) {
  return name
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

// Time ago formatter
function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 3600)  return `${Math.floor(diff/60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff/86400)}d ago`;
  if (diff < 31536000) return `${Math.floor(diff/2592000)}mo ago`;
  return `${Math.floor(diff/31536000)}y ago`;
}

function buildRepoCard(repo, index) {
  const color = LANG_COLORS[repo.language] || '#5E72C3';
  const desc  = repo.description || 'Website project oleh Devology Technology.';
  const name  = formatName(repo.name);
  const delay = (index % 3) * 0.08;

  const liveBtn = repo.homepage
    ? `<a href="${repo.homepage}" target="_blank" rel="noopener" class="repo-card__live" onclick="event.stopPropagation()">Live ↗</a>`
    : '';

  return `
  <a class="repo-card" href="${repo.html_url}" target="_blank" rel="noopener"
     style="animation-delay:${delay}s">
    <div class="repo-card__header">
      <div class="repo-card__icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
        </svg>
      </div>
      <svg class="repo-card__arrow" width="16" height="16" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="2">
        <path d="M7 17L17 7M17 7H7M17 7v10"/>
      </svg>
    </div>
    <h3 class="repo-card__name">${name}</h3>
    <p class="repo-card__desc">${desc}</p>
    <div class="repo-card__footer">
      ${repo.language ? `
      <div class="repo-card__lang">
        <span class="lang-dot" style="background:${color}"></span>
        ${repo.language}
      </div>` : ''}
      <div class="repo-card__stars">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        ${repo.stargazers_count}
      </div>
      <div class="repo-card__updated">${timeAgo(repo.updated_at)}</div>
      ${liveBtn}
    </div>
  </a>`;
}

async function loadGithubRepos() {
  const grid = document.getElementById('githubGrid');
  if (!grid) return;

  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=12`
    );
    if (!res.ok) throw new Error('GitHub API error');

    const repos = await res.json();
    const filtered = repos.filter(r => !SKIP_REPOS.has(r.name) && !r.fork);

    if (filtered.length === 0) {
      grid.innerHTML = '<p class="gh-error">Belum ada project yang ditampilkan.</p>';
      return;
    }

    grid.innerHTML = filtered
      .slice(0, 6)
      .map((repo, i) => buildRepoCard(repo, i))
      .join('');

    // Trigger reveal for the new cards
    grid.querySelectorAll('.repo-card').forEach(el => revealObserver.observe(el));

  } catch {
    grid.innerHTML = `
      <div class="gh-error">
        <p>Tidak dapat memuat portfolio saat ini.</p>
        <a href="https://github.com/${GITHUB_USER}" target="_blank" rel="noopener"
           class="btn btn--outline" style="margin-top:16px;display:inline-flex">
          Lihat di GitHub →
        </a>
      </div>`;
  }
}

// Load repos when portfolio section enters viewport
const portfolioSection = document.getElementById('portfolio');
if (portfolioSection) {
  const portfolioObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        loadGithubRepos();
        portfolioObserver.disconnect();
      }
    },
    { threshold: 0.1 }
  );
  portfolioObserver.observe(portfolioSection);
}

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
