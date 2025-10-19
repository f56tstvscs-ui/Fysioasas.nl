// === Include partials (header/footer) & active nav highlight ===
(async () => {
  const inject = async (selector, url) => {
    const el = document.querySelector(selector);
    if (!el) return;
    const html = await fetch(url, {cache:"no-store"}).then(r=>r.text());
    el.outerHTML = html;
  };
  await inject('[data-include="header"]', '/partials/header.html');
  await inject('[data-include="footer"]', '/partials/footer.html');

  // highlight current nav
  const path = location.pathname.replace(/\/index\.html$/,'/') || '/';
  document.querySelectorAll('header .nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if ((path === '/' && href === '/') || (href !== '/' && path.startsWith(href))) {
      a.style.color = 'var(--gold)';
      a.style.fontWeight = '700';
    }
  });

  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

// === Form submission demo ===
function handleSubmit(e){
  e.preventDefault();
  document.getElementById('status').textContent = 'Verstuurd! (demo)';
  e.target.reset();
  return false;
}

// === Intersection observer for golden pulse ===
(() => {
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=> e.target.classList.toggle('inview', e.isIntersecting));
  }, {threshold: 0.35});
  document.querySelectorAll('.section-title, .hero h1, .hero').forEach(el=> io.observe(el));
})();

