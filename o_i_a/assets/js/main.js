// main.js — Entry point para Tribute a Isaac Asimov
import { initStarfield } from './utils/starfield.js';
import { initCarousel } from './utils/carousel.js';
import { initReveal, initParallax } from './utils/animations.js';

async function bootstrap() {
  // Inicializar estrelas animadas
  initStarfield();
  
  // Inicializar carousel de citações
  initCarousel();
  
  // Inicializar scroll reveal
  initReveal();
  
  // Inicializar parallax sutil
  initParallax();
  
  // Adicionar classes de reveal para animação
  document.querySelectorAll('.timeline-item, .law-card, .book-card, .legacy-stat').forEach((el, index) => {
    el.classList.add('reveal');
  });
  
  // Smooth scroll para links internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
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
  
  // Adicionar ano atual no footer
  const currentYear = new Date().getFullYear();
  const footerMemorial = document.querySelector('.footer-memorial');
  if (footerMemorial) {
    footerMemorial.innerHTML += ` &copy; ${currentYear}`;
  }
  
  // Adicionar classe para reduzir movimento se preferido
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('reduced-motion');
  }
}

document.addEventListener('DOMContentLoaded', bootstrap);
