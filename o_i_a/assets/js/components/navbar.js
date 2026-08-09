// components/navbar.js — Lógica da navbar
import { $ } from '../utils/dom.js';

export function initNavbar() {
  const navbar = $('.navbar');
  if (!navbar) return;

  /* Mobile toggle */
  const toggle = $('.navbar__toggle');
  toggle?.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.textContent = isOpen ? '✕' : '☰';
    toggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });

  /* Fechar menu mobile ao navegar (sincroniza estado ARIA) */
  navbar.addEventListener('click', (e) => {
    if (!e.target.closest('a')) return;
    navbar.classList.remove('open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
      toggle.setAttribute('aria-label', 'Abrir menu');
    }
  });

  /* Scroll shadow */
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 10
      ? 'var(--shadow-md)'
      : 'none';
  }, { passive: true });
}
