// main.js — Entry point para Tribute a Isaac Asimov
import { initStarfield } from './utils/starfield.js';
import { initCarousel } from './utils/carousel.js';
import { initReveal, initParallax } from './utils/animations.js';
import { loadComponent } from './utils/dom.js';
import { initNavbar } from './components/navbar.js';
import { initFooter } from './components/footer.js';

async function bootstrap() {
  // 1. Componentes compartilhados (navbar/footer)
  //    Caminho relativo resolve contra o <base href> de cada página.
  await Promise.all([
    loadComponent('#navbar-slot', 'navbar.html'),
    loadComponent('#footer-slot', 'footer.html'),
  ]);

  // 2. Inicializar componentes
  initNavbar();
  initFooter();

  // 3. Efeitos de fundo e carousel
  initStarfield();
  initCarousel();

  // 4. Scroll reveal — adicionar classes ANTES de inicializar os observers
  document.querySelectorAll('.timeline-item, .law-card, .book-card, .legacy-stat')
    .forEach((el) => el.classList.add('reveal'));
  initReveal();
  initParallax();

  // 5. Smooth scroll para links internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // 6. Marcar preferência por menos movimento (o starfield também respeita)
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('reduced-motion');
  }
}

document.addEventListener('DOMContentLoaded', bootstrap);
