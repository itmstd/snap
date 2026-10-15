// shared.js — tiny helpers used by every page

export const $ = (id) => document.getElementById(id);

let toastTimer;
export function toast(msg) {
  const t = $('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}

export function initLightbox() {
  const lb = $('lightbox');
  if (!lb) return () => {};
  lb.addEventListener('click', () => lb.classList.remove('open'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') lb.classList.remove('open');
  });
  return (url) => {
    $('lightboxImg').src = url;
    lb.classList.add('open');
  };
}
