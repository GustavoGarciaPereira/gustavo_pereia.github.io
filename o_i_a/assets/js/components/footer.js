// components/footer.js — Lógica do footer
export function initFooter() {
  // Adiciona o ano atual ao memorial (idempotente, evita duplicar)
  const memorial = document.querySelector('.footer-memorial');
  if (memorial && !memorial.dataset.yearDone) {
    memorial.dataset.yearDone = 'true';
    memorial.innerHTML += ` &copy; ${new Date().getFullYear()}`;
  }
}
