// Script principal para o site de homenagem a Carlos Chagas

document.addEventListener('DOMContentLoaded', function() {
    console.log('Site Carlos Chagas: A Tríplice Descoberta carregado com sucesso! 🔬');

    // Configuração inicial do menu mobile
    initMobileMenu();

    // Configuração do Intersection Observer para animações de fade-in
    initScrollAnimations();

    // Configuração de eventos para os cards interativos
    initDiscoveryCards();

    // Configuração do smooth scroll para links internos
    initSmoothScroll();
});

/**
 * Inicializa o menu mobile (toggle)
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const menuItems = document.getElementById('menu-items');

    if (menuToggle && menuItems) {
        menuToggle.addEventListener('click', function() {
            menuItems.classList.toggle('hidden');
            menuItems.classList.toggle('flex');
            menuItems.classList.toggle('flex-col');
            menuItems.classList.toggle('space-y-4');
        });

        // Fechar menu ao clicar em um link (mobile)
        const navLinks = menuItems.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 768) {
                    menuItems.classList.add('hidden');
                    menuItems.classList.remove('flex', 'flex-col', 'space-y-4');
                }
            });
        });
    }
}

/**
 * Configura animações de fade-in com Intersection Observer
 */
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');

    if (fadeElements.length === 0 || !('IntersectionObserver' in window)) {
        // Fallback: mostrar todos os elementos se não hsuporte
        fadeElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Aplicar o atraso de animação se definido no estilo
                const delay = entry.target.style.animationDelay || '0s';
                entry.target.style.animationDelay = delay;
                entry.target.classList.add('fade-in');

                // Depois da animação, remover a classe para não animar novamente
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, parseFloat(delay) * 1000 + 800);

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * Adiciona interatividade aos cards de descoberta
 */
function initDiscoveryCards() {
    const discoveryCards = document.querySelectorAll('.discovery-card');

    discoveryCards.forEach((card, index) => {
        // Adicionar efeito de foco com teclado
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Card ${index + 1}: ${card.querySelector('h3')?.textContent || 'Descoberta'}`);

        // Efeito de hover com keyboard navigation
        card.addEventListener('focus', function() {
            this.classList.add('ring-2', 'ring-nobel-gold', 'ring-opacity-50');
        });

        card.addEventListener('blur', function() {
            this.classList.remove('ring-2', 'ring-nobel-gold', 'ring-opacity-50');
        });

        // Click/tap para expandir informações
        card.addEventListener('click', function(e) {
            // Não ativar se o clique foi em um link interno
            if (e.target.tagName === 'A') return;

            const title = this.querySelector('h3');
            const content = this.querySelector('p');

            if (title && content) {
                // Efeito visual de clique
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);

                // Aqui poderíamos expandir para mostrar mais informações
                console.log(`Card clicado: ${title.textContent}`);
            }
        });

        // Suporte a tecla Enter/Space
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

/**
 * Configura scroll suave para links internos
 */
function initSmoothScroll() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Pular links vazios ou que não são para IDs
            if (href === '#' || href === '') return;

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();

                // Calcular posição considerando o header fixo
                const headerHeight = document.querySelector('nav')?.offsetHeight || 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Atualizar URL sem recarregar a página
                history.pushState(null, null, href);
            }
        });
    });
}

/**
 * Função auxiliar para debounce (evitar chamadas excessivas)
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced resize handler para melhor performance
const handleResize = debounce(function() {
    const menuItems = document.getElementById('menu-items');
    const menuToggle = document.getElementById('menu-toggle');

    // Em telas maiores, garantir que o menu está visível
    if (window.innerWidth >= 768 && menuItems && menuToggle) {
        menuItems.classList.remove('hidden', 'flex-col', 'space-y-4');
        menuItems.classList.add('flex', 'md:space-x-8');
    }
}, 250);

// Adicionar listener de resize
window.addEventListener('resize', handleResize);

// Inicializar algumas variáveis de estado
let lastScrollTop = 0;
const nav = document.querySelector('nav');

// Opcional: efeito de nav transparente no topo
if (nav) {
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Adicionar sombra quando scrollar para baixo
        if (scrollTop > 50) {
            nav.classList.add('shadow-lg');
            nav.classList.remove('shadow-sm');
        } else {
            nav.classList.remove('shadow-lg');
            nav.classList.add('shadow-sm');
        }

        lastScrollTop = scrollTop;
    });
}

// Easter egg: log especial para a tríplice descoberta
console.log(`
    ╔══════════════════════════════════════════╗
    ║  CARLOS CHAGAS: A TRÍPLICE DESCOBERTA    ║
    ║                                          ║
    ║  1. 🦠 Trypanosoma cruzi (Parasita)      ║
    ║  2. 🦟 Barbeiro (Vetor)                  ║
    ║  3. ❤️  Doença de Chagas (Enfermidade)   ║
    ║                                          ║
    ║  "Um feito único na história da medicina"║
    ╚══════════════════════════════════════════╝
`);