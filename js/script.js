   // Global Variables
        let currentLanguage = 'es';
        let isAuthenticated = false;
        let currentMessageIndex = 0;
        let verificationCode = '';

        // Rotating Messages
        const rotatingMessages = {
            es: [
                "Cautivamos a tu audiencia y generamos resultados",
                "Permitimos contar la historia de tu marca",
                "Creamos experiencias visuales únicas",
                "Transformamos ideas en contenido viral"
            ],
            en: [
                "We captivate your audience and generate results",
                "We allow you to tell your brand's story", 
                "We create unique visual experiences",
                "We transform ideas into viral content"
            ]
        };

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            createBackgroundParticles();
            showLoadingScreen();
            initializeEventListeners();
            startMessageRotation();
        });

        // Create animated background particles and hexagons
        function createBackgroundParticles() {
            const bgAnimation = document.getElementById('bgAnimation');
            
            // Create floating particles
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 8 + 's';
                particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
                bgAnimation.appendChild(particle);
            }

            // Create hexagon elements
            for (let i = 0; i < 15; i++) {
                const hexagon = document.createElement('div');
                hexagon.classList.add('hexagon');
                hexagon.style.left = Math.random() * 100 + '%';
                hexagon.style.top = Math.random() * 100 + '%';
                hexagon.style.animationDelay = Math.random() * 4 + 's';
                hexagon.style.animationDuration = (Math.random() * 2 + 3) + 's';
                hexagon.style.opacity = Math.random() * 0.5 + 0.2;
                bgAnimation.appendChild(hexagon);
            }
        }

        // Show loading screen with logo animation
        function showLoadingScreen() {
            setTimeout(() => {
                document.getElementById('loadingScreen').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('loadingScreen').style.display = 'none';
                    document.getElementById('mainContent').classList.add('active');
                }, 1000);
            }, 3000);
        }

        // Initialize all event listeners
        function initializeEventListeners() {
            // Language toggle
            document.getElementById('languageToggle').addEventListener('click', toggleLanguage);
            
            // Admin button
            document.getElementById('adminButton').addEventListener('click', showAuthModal);
            
            // Login form
            document.getElementById('loginButton').addEventListener('click', handleLogin);
            document.getElementById('verifyButton').addEventListener('click', handleVerification);
            
            // Mobile menu
            document.getElementById('hamburger').addEventListener('click', toggleMobileMenu);
            
            // Close mobile menu when clicking links
            document.querySelectorAll('.mobile-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    document.getElementById('mobileMenu').classList.remove('active');
                    document.getElementById('hamburger').classList.remove('active');
                });
            });
            
            // Smooth scrolling
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

            // Header scroll effect
            window.addEventListener('scroll', () => {
                const header = document.getElementById('header');
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });

            // Close admin panel when clicking outside
            document.addEventListener('click', (e) => {
                const adminPanel = document.getElementById('adminPanel');
                const adminButton = document.getElementById('adminButton');
                if (!adminPanel.contains(e.target) && !adminButton.contains(e.target)) {
                    adminPanel.classList.remove('active');
                }
            });

            // Close auth modal when clicking outside
            document.addEventListener('click', (e) => {
                const authModal = document.getElementById('authModal');
                const authContainer = document.querySelector('.auth-container');
                if (authModal.classList.contains('active') && !authContainer.contains(e.target)) {
                    authModal.classList.remove('active');
                }
            });
        }

        // Mobile menu functionality
        function toggleMobileMenu() {
            const hamburger = document.getElementById('hamburger');
            const mobileMenu = document.getElementById('mobileMenu');
            
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        }

        // Language toggle functionality
        function toggleLanguage() {
            currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
            updateLanguage();
        }

        function updateLanguage() {
            const elements = document.querySelectorAll('[data-es], [data-en]');
            
            elements.forEach(element => {
                if (element.id !== 'rotatingText') {
                    if (currentLanguage === 'es') {
                        element.textContent = element.getAttribute('data-es') || element.textContent;
                    } else {
                        element.textContent = element.getAttribute('data-en') || element.textContent;
                    }
                }
            });
            
            // Update rotating text
            const rotatingTextElement = document.getElementById('rotatingText');
            currentMessageIndex = 0;
            rotatingTextElement.textContent = rotatingMessages[currentLanguage][currentMessageIndex];
            
            // Update language toggle button
            document.getElementById('languageToggle').textContent = currentLanguage === 'es' ? 'English' : 'Español';
            
            // Update document language
            document.documentElement.lang = currentLanguage;
        }

        // Message rotation functionality
        function startMessageRotation() {
            setInterval(rotateMessages, 4000);
        }

        function rotateMessages() {
            const textElement = document.getElementById('rotatingText');
            
            textElement.style.opacity = '0';
            textElement.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                currentMessageIndex = (currentMessageIndex + 1) % rotatingMessages[currentLanguage].length;
                textElement.textContent = rotatingMessages[currentLanguage][currentMessageIndex];
                
                textElement.style.opacity = '1';
                textElement.style.transform = 'translateY(0)';
            }, 300);
        }

        // Authentication functionality
        function showAuthModal() {
            if (isAuthenticated) {
                toggleAdminPanel();
            } else {
                document.getElementById('authModal').classList.add('active');
            }
        }

        function handleLogin() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username === 'ASTER' && password === 'agencia100') {
                // Show two-factor authentication
                generateVerificationCode();
                document.getElementById('loginForm').style.display = 'none';
                document.getElementById('twoFactorContainer').style.display = 'block';
            } else {
                showMessage('error', 'Usuario o contraseña incorrectos');
            }
        }

        function generateVerificationCode() {
            verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
            document.getElementById('verificationCode').textContent = verificationCode;
        }

        function handleVerification() {
            const inputCode = document.getElementById('verificationInput').value;
            
            if (inputCode === verificationCode) {
                isAuthenticated = true;
                document.getElementById('authModal').classList.remove('active');
                toggleAdminPanel();
                showMessage('success', 'Acceso autorizado');
                
                // Reset form
                document.getElementById('loginForm').style.display = 'block';
                document.getElementById('twoFactorContainer').style.display = 'none';
                document.getElementById('username').value = '';
                document.getElementById('password').value = '';
                document.getElementById('verificationInput').value = '';
            } else {
                showMessage('error', 'Código de verificación incorrecto');
            }
        }

        function showMessage(type, message) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${type}`;
            messageDiv.textContent = message;
            
            const authMessage = document.getElementById('authMessage');
            authMessage.appendChild(messageDiv);
            
            setTimeout(() => {
                messageDiv.remove();
            }, 3000);
        }

        function toggleAdminPanel() {
            const adminPanel = document.getElementById('adminPanel');
            adminPanel.classList.toggle('active');
            updateAdminButtonAppearance();
            
            if (adminPanel.classList.contains('active')) {
                loadCurrentContent();
            }
        }

        function loadCurrentContent() {
            // Load current content into admin inputs
            const heroTitle = document.getElementById('mainTitle').getAttribute('data-es');
            const heroSubtitle = rotatingMessages.es[0];
            
            document.getElementById('heroTitle').value = heroTitle || '';
            document.getElementById('heroSubtitle').value = heroSubtitle || '';
            
            // Load contact info
            const whatsappLink = document.getElementById('whatsappLink');
            const emailLink = document.getElementById('emailLink');
            const instagramLink = document.getElementById('instagramLink');
            const facebookLink = document.getElementById('facebookLink');
            
            document.getElementById('whatsappNumber').value = whatsappLink.textContent;
            document.getElementById('emailAddress').value = emailLink.textContent;
            document.getElementById('instagramUrl').value = instagramLink.href;
            document.getElementById('facebookUrl').value = facebookLink.href;
        }

        // Admin panel functions
        function updateHeroContent() {
            const newTitle = document.getElementById('heroTitle').value;
            const newSubtitle = document.getElementById('heroSubtitle').value;
            
            if (newTitle) {
                document.getElementById('mainTitle').setAttribute('data-es', newTitle);
                document.getElementById('mainTitle').setAttribute('data-en', newTitle);
                if (currentLanguage === 'es') {
                    document.getElementById('mainTitle').textContent = newTitle;
                }
            }
            
            if (newSubtitle) {
                rotatingMessages.es[0] = newSubtitle;
                rotatingMessages.en[0] = newSubtitle;
                if (currentMessageIndex === 0) {
                    document.getElementById('rotatingText').textContent = newSubtitle;
                }
            }
            
            showAdminMessage('success', 'Contenido del hero actualizado');
        }

        function updateContactInfo() {
            const whatsapp = document.getElementById('whatsappNumber').value;
            const email = document.getElementById('emailAddress').value;
            
            if (whatsapp) {
                const whatsappLink = document.getElementById('whatsappLink');
                whatsappLink.href = `https://wa.me/${whatsapp.replace(/\D/g, '')}`;
                whatsappLink.textContent = whatsapp;
            }
            
            if (email) {
                const emailLink = document.getElementById('emailLink');
                emailLink.href = `mailto:${email}`;
                emailLink.textContent = email;
            }
            
            showAdminMessage('success', 'Información de contacto actualizada');
        }

        function updateSocialMedia() {
            const instagram = document.getElementById('instagramUrl').value;
            const facebook = document.getElementById('facebookUrl').value;
            
            if (instagram) {
                document.getElementById('instagramLink').href = instagram;
            }
            
            if (facebook) {
                document.getElementById('facebookLink').href = facebook;
            }
            
            showAdminMessage('success', 'Redes sociales actualizadas');
        }

        function showAdminMessage(type, message) {
            // Create a temporary notification
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'success' ? '#ff6b35' : '#e74c3c'};
                color: white;
                padding: 15px 20px;
                border-radius: 5px;
                z-index: 10001;
                font-weight: 500;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                animation: slideInRight 0.3s ease;
            `;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 2500);
        }

        function logout() {
            isAuthenticated = false;
            document.getElementById('adminPanel').classList.remove('active');
            updateAdminButtonAppearance();
            showAdminMessage('success', 'Sesión cerrada');
        }

        // Update admin button appearance when authenticated
        function updateAdminButtonAppearance() {
            const adminButton = document.getElementById('adminButton');
            if (isAuthenticated) {
                adminButton.classList.add('authenticated');
                adminButton.textContent = 'Panel';
            } else {
                adminButton.classList.remove('authenticated');
                adminButton.textContent = 'Admin';
            }
        }

        // Add keyboard support for forms
        document.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                if (document.getElementById('authModal').classList.contains('active')) {
                    if (document.getElementById('loginForm').style.display !== 'none') {
                        handleLogin();
                    } else {
                        handleVerification();
                    }
                }
            }
        });

        // Add pulse effect to CTA button
        setInterval(() => {
            const ctaButton = document.getElementById('ctaButton');
            if (ctaButton) {
                ctaButton.classList.add('pulse');
                setTimeout(() => {
                    ctaButton.classList.remove('pulse');
                }, 2000);
            }
        }, 8000);

        // Initialize admin button appearance
        updateAdminButtonAppearance();

        console.log('🚀 Agencia Aster - Sitio web cargado exitosamente con diseño hexagonal!');
        console.log('🎨 Interfaz futurista con patrones hexagonales activada');
        console.log('🟠 Esquema de colores naranja y azul implementado');
        console.log('🔐 Sistema de autenticación: Usuario "ASTER", Contraseña "agencia100"');

