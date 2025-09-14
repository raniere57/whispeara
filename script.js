// Whispeara Review - JavaScript Mínimo
// Foco em funcionalidades essenciais para SEO e UX

document.addEventListener('DOMContentLoaded', function() {
    
    // Modal functionality
    const modal = document.getElementById('welcomeModal');
    const modalClose = document.getElementById('modalClose');
    const stayReviewBtn = document.getElementById('stayReview');
    const goOfficialBtn = document.getElementById('goOfficial');
    
    // Show modal when page loads (with small delay for better UX)
    setTimeout(() => {
        modal.classList.add('show');
    }, 500);
    
    // Close modal function
    function closeModal() {
        modal.classList.remove('show');
        // Remove modal from DOM after animation
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
    
    // Close modal when clicking X button
    modalClose.addEventListener('click', closeModal);
    
    // Close modal when clicking outside (overlay)
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Stay on review page (close modal)
    stayReviewBtn.addEventListener('click', closeModal);
    
    // Go to official page
    goOfficialBtn.addEventListener('click', function() {
        // Close modal when clicking the official page link
        closeModal();
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    
    // Smooth scroll para links internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Lazy loading para imagens (fallback para browsers mais antigos)
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Se a imagem já foi carregada
        if (img.complete) {
            img.style.opacity = '1';
        }
    });

    // Tracking de cliques nos botões CTA (para analytics)
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Aqui você pode adicionar tracking de eventos
            // Exemplo: gtag('event', 'click', { 'event_category': 'CTA', 'event_label': 'Buy Button' });
            
            console.log('CTA clicked:', this.textContent);
        });
    });

    // Highlight da seção ativa no TOC (scroll spy simples)
    const sections = document.querySelectorAll('.content-section');
    const tocLinks = document.querySelectorAll('.toc a');
    
    function updateActiveSection() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // Throttled scroll event para performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(updateActiveSection, 10);
    });

    // Inicializar highlight ativo
    updateActiveSection();

    // Adicionar classe CSS para link ativo
    const style = document.createElement('style');
    style.textContent = `
        .toc a.active {
            background: #667eea;
            color: white;
            transform: translateX(5px);
        }
    `;
    document.head.appendChild(style);

    // Melhorar acessibilidade - foco visível
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Adicionar estilos para navegação por teclado
    const keyboardStyle = document.createElement('style');
    keyboardStyle.textContent = `
        .keyboard-navigation *:focus {
            outline: 2px solid #667eea !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(keyboardStyle);

    // Performance: Preload de imagens críticas
    function preloadCriticalImages() {
        const criticalImages = [
            'images/Whispeara1.webp',
            'images/woman-using-product.webp'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    preloadCriticalImages();

    // Adicionar meta tags dinâmicas para SEO (se necessário)
    function updateMetaTags() {
        // Você pode adicionar meta tags dinâmicas aqui se necessário
        const currentTime = new Date().toISOString();
        
        // Exemplo: atualizar timestamp da página
        const metaUpdated = document.querySelector('meta[name="updated"]');
        if (!metaUpdated) {
            const meta = document.createElement('meta');
            meta.name = 'updated';
            meta.content = currentTime;
            document.head.appendChild(meta);
        }
    }

    updateMetaTags();

    // Console log for debug (remove in production)
    console.log('Whispeara Review Page loaded successfully');
    console.log('Ready for affiliate link integration');
});

// All affiliate links are now directly embedded in the HTML
