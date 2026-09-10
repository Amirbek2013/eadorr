const header = document.querySelector('.site-header');
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('mainNav');
const toast = document.getElementById('toast');

function showToast(message){
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 18);
});

menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  document.body.classList.toggle('menu-open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
});

nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  document.body.classList.remove('menu-open');
  menuBtn.setAttribute('aria-expanded', 'false');
}));

document.getElementById('toTopBtn').addEventListener('click', () => {
  window.scrollTo({top: 0, behavior: 'smooth'});
});

document.getElementById('downloadBtn').addEventListener('click', () => {
  showToast('Файл игры ещё не прикреплён — нужно вставить ссылку на актуальную сборку.');
});

document.getElementById('vkBtn').addEventListener('click', (e) => {
  e.preventDefault();
  showToast('Нужно вставить ссылку на VK-группу заказчика.');
});

document.querySelectorAll('.release-head').forEach(btn => {
  btn.addEventListener('click', () => {
    const release = btn.closest('.release');
    const isOpen = release.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
    release.querySelector('.release-toggle').textContent = isOpen ? '−' : '+';
  });
});

const reveal = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.animate(
      [{opacity:0, transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],
      {duration:560,easing:'cubic-bezier(.2,.7,.2,1)',fill:'both'}
    );
    reveal.unobserve(entry.target);
  });
},{threshold:.1});

document.querySelectorAll('.download-card,.feature,.media-frame,.lobby-frame,.news-card,.news-mini,.release,.community-card').forEach(el => reveal.observe(el));
