
        // Language Toggle
        const languageToggle = document.getElementById('languageToggle');
        let currentLanguage = 'es';
        
        languageToggle.addEventListener('click', () => {
            currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
            updateLanguage();
        });
        
        function updateLanguage() {
            const elements = document.querySelectorAll('[data-es], [data-en]');
            
            elements.forEach(element => {
                if (currentLanguage === 'es') {
                    element.textContent = element.getAttribute('data-es') || element.textContent;
                } else {
                    element.textContent = element.getAttribute('data-en') || element.textContent;
                }
            });
            
            // Update button text
            languageToggle.textContent = currentLanguage === 'es' ? 'English' : 'Español';
            
            // Update document language
            document.documentElement.lang = currentLanguage;
        }

        // Mobile Menu Toggle
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        const servicesDropdown = document.getElementById('servicesDropdown');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on links
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Services dropdown for mobile
        servicesDropdown.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.stopPropagation();
                servicesDropdown.classList.toggle('active');
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!servicesDropdown.contains(e.target)) {
                servicesDropdown.classList.remove('active');
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    let currentMessageIndex = 0;
let currentLanguage = 'es';

function rotateHeroMessages() {
    const titleElement = document.querySelector('.hero-title');
    const subtitleElement = document.querySelector('.hero-subtitle');
    
    // Agregar clase de fade out
    titleElement.classList.add('fade-out');
    subtitleElement.classList.add('fade-out');
    
    setTimeout(() => {
        currentMessageIndex = (currentMessageIndex + 1) % heroMessages[currentLanguage].length;
        
        const currentMessages = heroMessages[currentLanguage][currentMessageIndex];
        
        titleElement.textContent = currentMessages.title;
        subtitleElement.textContent = currentMessages.subtitle;
        
        // Remover clase de fade out y agregar fade in
        titleElement.classList.remove('fade-out');
        subtitleElement.classList.remove('fade-out');
    }, 500);
}

const rotatingMessages = {
    es: [
        "Cautivamos a tu audiencia y generamos resultados",
        "Permitimos contar la historia de tu marca"
    ],
    en: [
        "We captivate your audience and generate results",
        "We allow you to tell your brand's story"
    ]
};
let currentMessageIndex = 0;
let currentLanguage = 'es';

function rotateMessages() {
    const textElement = document.getElementById('rotatingText');
    
    // Agregar clase de animación
    textElement.classList.add('changing');
    
    setTimeout(() => {
        // Cambiar el texto
        currentMessageIndex = (currentMessageIndex + 1) % rotatingMessages[currentLanguage].length;
        textElement.textContent = rotatingMessages[currentLanguage][currentMessageIndex];
        
        // Remover clase de animación
        textElement.classList.remove('changing');
    }, 750);
}

// Actualizar función de idioma para incluir mensajes rotativos
function updateLanguage() {
    currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
    
    const elements = document.querySelectorAll('[data-es], [data-en]');
    
    elements.forEach(element => {
        if (element.id !== 'rotatingText') { // Excluir el texto rotativo
            if (currentLanguage === 'es') {
                element.textContent = element.getAttribute('data-es') || element.textContent;
            } else {
                element.textContent = element.getAttribute('data-en') || element.textContent;
            }
        }
    });
    
    // Actualizar mensajes rotativos
    const rotatingTextElement = document.getElementById('rotatingText');
    currentMessageIndex = 0; // Resetear al primer mensaje
    rotatingTextElement.textContent = rotatingMessages[currentLanguage][currentMessageIndex];
    
    // Update button text
    languageToggle.textContent = currentLanguage === 'es' ? 'English' : 'Español';
    
    // Update document language
    document.documentElement.lang = currentLanguage;
}

// Iniciar rotación de mensajes cada 4 segundos
setInterval(rotateMessages, 4000);

// Asegurarse de que el botón de idioma actualice los mensajes
const languageToggle = document.getElementById('languageToggle');
languageToggle.addEventListener('click', updateLanguage);