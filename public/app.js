(() => {
  const dialog = document.getElementById('privacy');
  document.getElementById('privacy-open')?.addEventListener('click', () => dialog.showModal());
  dialog?.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } });
  const links = Array.from(document.querySelectorAll('.contents nav a'));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) links.forEach(link => { const active = link.getAttribute('href') === '#' + entry.target.id; link.classList.toggle('active', active); if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); }); });
    }, { rootMargin: '-10% 0px -65% 0px' });
    links.forEach(link => { const section = document.querySelector(link.getAttribute('href')); if (section) observer.observe(section); });
  }
})();
