// carousel.js — Carousel de citações de Isaac Asimov
export function initCarousel() {
  const carousel = document.querySelector('.quotes-carousel');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.quote-slide');
  const dots = carousel.querySelectorAll('.dot');
  const prevBtn = carousel.querySelector('.carousel-btn.prev');
  const nextBtn = carousel.querySelector('.carousel-btn.next');
  
  let currentSlide = 0;
  let autoPlayInterval = null;
  const slideInterval = 5000; // 5 segundos

  // Inicializar
  function init() {
    if (slides.length === 0) return;
    
    // Mostrar primeiro slide
    showSlide(0);
    
    // Configurar autoplay
    startAutoPlay();
    
    // Adicionar event listeners
    if (prevBtn) prevBtn.addEventListener('click', showPrevSlide);
    if (nextBtn) nextBtn.addEventListener('click', showNextSlide);
    
    // Adicionar event listeners para dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => showSlide(index));
    });
    
    // Pausar autoplay no hover
    carousel.addEventListener('mouseenter', pauseAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    // Suporte a teclado
    document.addEventListener('keydown', handleKeyboardNavigation);
  }

  // Mostrar slide específico
  function showSlide(index) {
    // Validar índice
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
    if (dots[index]) {
      dots[index].classList.add('active');
    }
    
    currentSlide = index;
    
    // Disparar evento personalizado
    carousel.dispatchEvent(new CustomEvent('slideChange', {
      detail: { currentSlide: index }
    }));
  }

  // Mostrar slide anterior
  function showPrevSlide() {
    showSlide(currentSlide - 1);
    resetAutoPlay();
  }

  // Mostrar próximo slide
  function showNextSlide() {
    showSlide(currentSlide + 1);
    resetAutoPlay();
  }

  // Iniciar autoplay
  function startAutoPlay() {
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

  // Navegação por teclado
  function handleKeyboardNavigation(e) {
    if (!carousel.matches(':hover') && !carousel.contains(document.activeElement)) {
      return;
    }
    
    switch(e.key) {
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
        showSlide(slides.length - 1);
        break;
    }
  }

  // Função para adicionar uma nova citação
  function addQuote(quote, source) {
    const newSlide = document.createElement('div');
    newSlide.className = 'quote-slide';
    newSlide.innerHTML = `
      <blockquote>${quote}</blockquote>
      <cite>— ${source}</cite>
    `;
    
    carousel.insertBefore(newSlide, carousel.querySelector('.carousel-controls'));
    
    // Atualizar dots
    const newDot = document.createElement('span');
    newDot.className = 'dot';
    newDot.setAttribute('aria-label', `Citação ${slides.length + 1}`);
    
    const dotsContainer = carousel.querySelector('.carousel-dots');
    if (dotsContainer) {
      dotsContainer.insertBefore(newDot, dotsContainer.lastElementChild);
    }
    
    // Re-inicializar carousel
    init();
  }

  // Inicializar carousel
  init();

  // Retornar API pública
  return {
    showSlide,
    showPrevSlide,
    showNextSlide,
    addQuote,
    pauseAutoPlay,
    startAutoPlay,
    getCurrentSlide: () => currentSlide,
    getTotalSlides: () => slides.length
  };
}