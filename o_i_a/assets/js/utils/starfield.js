// starfield.js — Canvas animado com estrelas e partículas
export function initStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let stars = [];
  let particles = [];
  let animationId = null;

  // Configurações
  const config = {
    starCount: 200,
    particleCount: 20,
    starSpeed: 0.2,
    particleSpeed: 0.5,
    connectionDistance: 150,
    starColors: ['#ffffff', '#00d4ff', '#f5a623'],
    particleColors: ['#00d4ff', '#f5a623', '#6366f1']
  };

  // Classe Star
  class Star {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.5;
      this.speed = Math.random() * config.starSpeed + 0.1;
      this.color = config.starColors[Math.floor(Math.random() * config.starColors.length)];
      this.opacity = Math.random() * 0.5 + 0.3;
      this.direction = Math.random() * Math.PI * 2;
    }

    update() {
      // Movimento suave
      this.x += Math.cos(this.direction) * this.speed;
      this.y += Math.sin(this.direction) * this.speed;

      // Wrap around edges
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;

      // Pulsação sutil
      this.opacity = 0.3 + Math.sin(Date.now() * 0.001 + this.x) * 0.2;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  // Classe Particle
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speed = Math.random() * config.particleSpeed + 0.2;
      this.color = config.particleColors[Math.floor(Math.random() * config.particleColors.length)];
      this.opacity = Math.random() * 0.3 + 0.1;
      this.direction = Math.random() * Math.PI * 2;
      this.wobble = Math.random() * 0.02;
    }

    update() {
      // Movimento com wobble
      this.x += Math.cos(this.direction) * this.speed + Math.sin(Date.now() * this.wobble) * 0.5;
      this.y += Math.sin(this.direction) * this.speed + Math.cos(Date.now() * this.wobble) * 0.5;

      // Wrap around edges
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;

      // Opacidade variável
      this.opacity = 0.1 + Math.sin(Date.now() * 0.002 + this.x * 0.01) * 0.2;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  // Inicializar estrelas e partículas
  function init() {
    resizeCanvas();
    stars = [];
    particles = [];

    for (let i = 0; i < config.starCount; i++) {
      stars.push(new Star());
    }

    for (let i = 0; i < config.particleCount; i++) {
      particles.push(new Particle());
    }
  }

  // Redimensionar canvas
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // Desenhar conexões entre estrelas próximas
  function drawConnections() {
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.connectionDistance) {
          const opacity = 1 - (distance / config.connectionDistance);
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[j].x, stars[j].y);
          ctx.strokeStyle = `rgba(0, 212, 255, ${opacity * 0.1})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  // Loop de animação
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Atualizar e desenhar estrelas
    stars.forEach(star => {
      star.update();
      star.draw();
    });

    // Atualizar e desenhar partículas
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    // Desenhar conexões
    drawConnections();

    animationId = requestAnimationFrame(animate);
  }

  // Inicializar e começar animação
  init();
  animate();

  // Redimensionar quando a janela mudar de tamanho
  window.addEventListener('resize', () => {
    resizeCanvas();
    init();
  });

  // Limpar animação quando a página for descarregada
  window.addEventListener('beforeunload', () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  });

  // Retornar função de limpeza
  return () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    window.removeEventListener('resize', resizeCanvas);
  };
}