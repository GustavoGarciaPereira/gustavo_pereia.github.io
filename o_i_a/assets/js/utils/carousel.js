// carousel.js — Carousel de citações de Isaac Asimov
export function initCarousel() {
  const carousel = document.querySelector('.quotes-carousel');
  if (!carousel) return;

  let currentSlide = 0;
  let autoPlayInterval = null;
  const slideInterval = 5000; // 5 segundos

  // Consultas vivas: sempre refletem o DOM atual (slides/dots adicionados depois)
  const getSlides = () => carousel.querySelectorAll('.quote-slide');
  const getDots = () => carousel.querySelectorAll('.dot');

  // Mostrar slide específico
  function showSlide(index) {
    const slides = getSlides();
    const dots = getDots();
    if (!slides.length) return;

    // Validar índice (loop infinito)
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    // Esconder todos os slides
    slides.forEach(slide => {
      slide.classList.remove('active');
      slide.style.animation = 'none';
      void slide.offsetWidth; // Trigger reflow
    });

    // Remover classe active de todos os dots
    dots.forEach(dot => dot.classList.remove('active'));

    // Mostrar slide atual
    slides[index].classList.add('active');
    slides[index].style.animation = 'fadeIn 0.5s ease';

    // Atualizar dot atual
    if (dots[index]) dots[index].classList.add('active');

    currentSlide = index;

    // Disparar evento personalizado
    carousel.dispatchEvent(new CustomEvent('slideChange', {
      detail: { currentSlide: index }
    }));
  }

  function showPrevSlide() {
    showSlide(currentSlide - 1);
    resetAutoPlay();
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
    resetAutoPlay();
  }

  // Iniciar autoplay (nunca para quem prefere menos movimento —
  // cobre também resetAutoPlay() e mouseleave)
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function startAutoPlay() {
    if (reduceMotion) return;
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(() => {
      showNextSlide();
    }, slideInterval);
  }

  // Pausar autoplay
  function pauseAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  }

  // Resetar autoplay
  function resetAutoPlay() {
    pauseAutoPlay();
    startAutoPlay();
  }

  // Navegação por teclado (dots são <button>, já ativados por Enter/Espaço nativamente)
  function handleKeyboardNavigation(e) {
    if (!carousel.matches(':hover') && !carousel.contains(document.activeElement)) {
      return;
    }

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        showPrevSlide();
        break;
      case 'ArrowRight':
        e.preventDefault();
        showNextSlide();
        break;
      case 'Home':
        e.preventDefault();
        showSlide(0);
        break;
      case 'End':
        e.preventDefault();
        showSlide(slidesLastIndex());
        break;
    }
  }

  function slidesLastIndex() {
    return getSlides().length - 1;
  }

  // Adicionar uma nova citação (API pública)
  function addQuote(quote, source) {
    const newSlide = document.createElement('div');
    newSlide.className = 'quote-slide';
    newSlide.innerHTML = `
      <blockquote>${quote}</blockquote>
      <cite>— ${source}</cite>
    `;

    carousel.insertBefore(newSlide, carousel.querySelector('.carousel-controls'));

    // Atualizar dots
    const newDot = document.createElement('button');
    newDot.type = 'button';
    newDot.className = 'dot';
    newDot.setAttribute('aria-label', `Citação ${getSlides().length}`);

    const dotsContainer = carousel.querySelector('.carousel-dots');
    if (dotsContainer) {
      dotsContainer.appendChild(newDot);
    }

    // Ligar o dot ao novo slide (sem re-registrar os listeners globais)
    const newIndex = getSlides().length - 1;
    newDot.addEventListener('click', () => showSlide(newIndex));
  }

  // Registro único de listeners
  const prevBtn = carousel.querySelector('.carousel-btn.prev');
  const nextBtn = carousel.querySelector('.carousel-btn.next');
  prevBtn?.addEventListener('click', showPrevSlide);
  nextBtn?.addEventListener('click', showNextSlide);

  getDots().forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });

  carousel.addEventListener('mouseenter', pauseAutoPlay);
  carousel.addEventListener('mouseleave', startAutoPlay);
  document.addEventListener('keydown', handleKeyboardNavigation);

  showSlide(0);
  startAutoPlay();

  // Retornar API pública
  return {
    showSlide,
    showPrevSlide,
    showNextSlide,
    addQuote,
    pauseAutoPlay,
    startAutoPlay,
    getCurrentSlide: () => currentSlide,
    getTotalSlides: () => getSlides().length
  };
}
