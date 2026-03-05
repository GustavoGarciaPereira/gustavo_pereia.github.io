// router.js — Roteamento SPA simples (opcional)
const routes = {
  '/':               '/index.html',
  '/about':          '/pages/about.html',
  '/contact':        '/pages/contact.html',
};

export function getRoute(path) {
  return routes[path] ?? null;
}

export function initRouter() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-link]');
    if (!link) return;
    e.preventDefault();
    const path = new URL(link.href).pathname;
    history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
  });
}
