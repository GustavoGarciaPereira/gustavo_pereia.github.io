// components/navbar.js — Lógica da navbar
import { $ } from '../utils/dom.js';

export function initNavbar() {
  const navbar = $('.navbar');
  if (!navbar) return;

  /* Mobile toggle */
  const toggle = $('.navbar__toggle');
  const links  = $('.navbar__links');
  toggle?.addEventListener('click', () => {
    const open = links.style.display === 'flex';
    links.style.display = open ? 'none' : 'flex';
    links.style.flexDirection = 'column';
  });

  /* Scroll shadow */
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 10
      ? 'var(--shadow-md)'
      : 'none';
  }, { passive: true });
}
