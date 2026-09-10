const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
const topBtn = document.getElementById('toTopBtn');
const downloadBtn = document.getElementById('downloadBtn');
const toast = document.getElementById('toast');

menuBtn?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  document.body.classList.toggle('menu-open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  document.body.classList.remove('menu-open');
  menuBtn.setAttribute('aria-expanded', 'false');
}));

topBtn?.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

downloadBtn?.addEventListener('click', () => {
  toast.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
});

document.querySelectorAll('.release__head').forEach(btn => {
  btn.addEventListener('click', () => {
    const release = btn.closest('.release');
    const open = release.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
    const icon = btn.querySelector('i');
    if (icon) icon.textContent = open ? '−' : '+';
  });
});

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav a')];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
  });
}, {rootMargin:'-35% 0px -55% 0px'});
sections.forEach(section => observer.observe(section));
