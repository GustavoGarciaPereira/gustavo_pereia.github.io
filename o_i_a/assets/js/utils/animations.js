// utils/animations.js — Scroll reveal e animações para Tribute a Isaac Asimov
export function initReveal() {
  // Configuração do Intersection Observer
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  // Observer para elementos com classe .reveal
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Adicionar delay baseado na posição
        const rect = entry.target.getBoundingClientRect();
        const delay = Math.min(rect.top / window.innerHeight, 0.5);
        entry.target.style.transitionDelay = `${delay}s`;
        
        // Não observar mais este elemento
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observer para timeline items (animação sequencial)
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const timelineItems = entry.target.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('visible');
          }, index * 150); // Delay sequencial
        });
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  // Observer para cards (animação em grid)
  const cardsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.law-card, .book-card, .legacy-stat');
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('visible');
          }, index * 100); // Delay em cascata
        });
        cardsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  // Inicializar observadores
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => revealObserver.observe(el));

  const timelineSection = document.querySelector('.timeline-section');
  if (timelineSection) timelineObserver.observe(timelineSection);

  const roboticsSection = document.querySelector('.robotics-section');
  const worksSection = document.querySelector('.works-section');
  const legacySection = document.querySelector('.legacy-section');
  
  if (roboticsSection) cardsObserver.observe(roboticsSection);
  if (worksSection) cardsObserver.observe(worksSection);
  if (legacySection) cardsObserver.observe(legacySection);

  // Animação de entrada para hero
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroQuote = document.querySelector('.hero-quote');

  if (heroTitle && heroSubtitle && heroQuote) {
    setTimeout(() => heroTitle.classList.add('visible'), 300);
    setTimeout(() => heroSubtitle.classList.add('visible'), 600);
    setTimeout(() => heroQuote.classList.add('visible'), 900);
  }

  // Retornar função de limpeza
  return () => {
    revealObserver.disconnect();
    timelineObserver.disconnect();
    cardsObserver.disconnect();
  };
}

// Função para adicionar efeito de parallax sutil
export function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (!parallaxElements.length) return;

  const handleParallax = () => {
    const scrollY = window.scrollY;
    
    parallaxElements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.3;
      const yPos = -(scrollY * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });
  };

  window.addEventListener('scroll', handleParallax);
  
  // Retornar função de limpeza
  return () => {
    window.removeEventListener('scroll', handleParallax);
  };
}
