// cms-integration.js
// Integración con Netlify CMS para Agencia Aster

(function() {
    'use strict';

    // Función principal para cargar todos los datos del CMS
    async function loadCMSData() {
        try {
            console.log('🔄 Cargando datos desde Netlify CMS...');
            
            // Cargar datos en paralelo para mejor rendimiento
            await Promise.all([
                loadHeroData(),
                loadContactData(),
                loadServicesData(),
                loadPacksData(),
                loadClientsData()
            ]);
            
            console.log('✅ Datos del CMS cargados exitosamente');
        } catch (error) {
            console.warn('⚠️ No se pudieron cargar datos del CMS, usando contenido por defecto:', error.message);
        }
    }

    // Cargar datos del Hero Section
    async function loadHeroData() {
        try {
            const response = await fetch('/data/hero.json');
            if (!response.ok) throw new Error('Hero data not found');
            
            const data = await response.json();
            const currentLang = window.currentLanguage || 'es';
            
            // Actualizar título principal
            if (data.title) {
                const titleElement = document.getElementById('mainTitle');
                if (titleElement) {
                    titleElement.setAttribute('data-es', data.title.es);
                    titleElement.setAttribute('data-en', data.title.en);
                    titleElement.textContent = data.title[currentLang];
                }
            }
            
            // Actualizar subtítulo
            if (data.subtitle) {
                const subtitleElement = document.getElementById('rotatingText');
                if (subtitleElement) {
                    subtitleElement.textContent = data.subtitle[currentLang];
                }
            }
            
            // Actualizar mensajes rotativos
            if (data.rotating_messages_es && data.rotating_messages_en) {
                window.rotatingMessages = {
                    es: data.rotating_messages_es,
                    en: data.rotating_messages_en
                };
            }
            
            // Actualizar texto del botón CTA
            if (data.cta_text_es && data.cta_text_en) {
                const ctaButton = document.getElementById('ctaButton');
                if (ctaButton) {
                    ctaButton.setAttribute('data-es', data.cta_text_es);
                    ctaButton.setAttribute('data-en', data.cta_text_en);
                    ctaButton.textContent = data[`cta_text_${currentLang}`];
                }
            }
            
            console.log('✓ Hero data loaded');
        } catch (error) {
            console.log('Using default hero content');
        }
    }

    // Cargar datos de contacto
    async function loadContactData() {
        try {
            const response = await fetch('/data/contact.json');
            if (!response.ok) throw new Error('Contact data not found');
            
            const data = await response.json();
            
            // Actualizar WhatsApp
            if (data.whatsapp) {
                const whatsappLink = document.getElementById('whatsappLink');
                if (whatsappLink) {
                    const cleanNumber = data.whatsapp.replace(/\D/g, '');
                    whatsappLink.href = `https://wa.me/${cleanNumber}`;
                    whatsappLink.textContent = data.whatsapp;
                }
            }
            
            // Actualizar Email
            if (data.email) {
                const emailLink = document.getElementById('emailLink');
                if (emailLink) {
                    emailLink.href = `mailto:${data.email}`;
                    emailLink.textContent = data.email;
                }
            }
            
            // Actualizar Instagram
            if (data.instagram) {
                const instagramLink = document.getElementById('instagramLink');
                if (instagramLink) {
                    instagramLink.href = data.instagram;
                    // Extraer username si es una URL completa
                    const username = data.instagram.split('/').pop() || '@agenciaaster.salta';
                    const usernameDisplay = username.startsWith('@') ? username : `@${username}`;
                    instagramLink.textContent = usernameDisplay;
                }
            }
            
            // Actualizar Facebook
            if (data.facebook) {
                const facebookLink = document.getElementById('facebookLink');
                if (facebookLink) {
                    facebookLink.href = data.facebook;
                }
            }
            
            console.log('✓ Contact data loaded');
        } catch (error) {
            console.log('Using default contact content');
        }
    }

    // Cargar datos de servicios
    async function loadServicesData() {
        try {
            // Intentar cargar servicios individuales
            const serviceFiles = ['video', 'fotografia', 'estrategia'];
            const services = [];
            
            for (const file of serviceFiles) {
                try {
                    const response = await fetch(`/data/services/${file}.json`);
                    if (response.ok) {
                        const service = await response.json();
                        services.push(service);
                    }
                } catch (err) {
                    console.log(`Service ${file} not found, skipping`);
                }
            }
            
            if (services.length > 0) {
                updateServicesSection(services);
                console.log('✓ Services data loaded');
            }
        } catch (error) {
            console.log('Using default services content');
        }
    }

    // Actualizar la sección de servicios
    function updateServicesSection(services) {
        const container = document.querySelector('#services .services-grid');
        if (!container || services.length === 0) return;
        
        const currentLang = window.currentLanguage || 'es';
        
        // Ordenar por el campo order
        services.sort((a, b) => (a.order || 0) - (b.order || 0));
        
        // Generar HTML para cada servicio
        const servicesHTML = services.map(service => `
            <div class="service-card">
                <div class="service-icon">
                    <i class="${service.icon || 'fas fa-star'}"></i>
                </div>
                <h3 data-es="${service.title?.es || ''}" data-en="${service.title?.en || ''}">
                    ${service.title?.[currentLang] || service.title?.es || 'Servicio'}
                </h3>
                <p data-es="${service.description?.es || ''}" data-en="${service.description?.en || ''}">
                    ${service.description?.[currentLang] || service.description?.es || ''}
                </p>
            </div>
        `).join('');
        
        container.innerHTML = servicesHTML;
    }

    // Cargar datos de paquetes
    async function loadPacksData() {
        try {
            const packFiles = ['starter', 'growth', 'enterprise'];
            const packs = [];
            
            for (const file of packFiles) {
                try {
                    const response = await fetch(`/data/packs/${file}.json`);
                    if (response.ok) {
                        const pack = await response.json();
                        packs.push(pack);
                    }
                } catch (err) {
                    console.log(`Pack ${file} not found, skipping`);
                }
            }
            
            if (packs.length > 0) {
                updatePacksSection(packs);
                console.log('✓ Packs data loaded');
            }
        } catch (error) {
            console.log('Using default packs content');
        }
    }

    // Actualizar la sección de paquetes
    function updatePacksSection(packs) {
        const container = document.querySelector('#packs .services-grid');
        if (!container || packs.length === 0) return;
        
        const currentLang = window.currentLanguage || 'es';
        
        // Ordenar por el campo order
        packs.sort((a, b) => (a.order || 0) - (b.order || 0));
        
        // Generar HTML para cada paquete
        const packsHTML = packs.map(pack => {
            const featured = pack.featured ? 'style="border: 2px solid #ff359d; transform: scale(1.05);"' : '';
            const featuredBadge = pack.featured ? 
                '<div style="background: #ff359d; color: white; padding: 5px 15px; border-radius: 15px; font-size: 0.8rem; position: absolute; top: -10px; left: 50%; transform: translateX(-50%);">MÁS POPULAR</div>' : '';
            
            const featuresHTML = (pack.features || []).map(feature => `
                <li style="margin: 10px 0;">
                    <i class="fas fa-check" style="color: #ff359d; margin-right: 10px;"></i>
                    <span data-es="${feature.es || ''}" data-en="${feature.en || ''}">
                        ${feature[currentLang] || feature.es || ''}
                    </span>
                </li>
            `).join('');
            
            return `
                <div class="service-card" ${featured}>
                    ${featuredBadge}
                    <h3 data-es="${pack.name?.es || ''}" data-en="${pack.name?.en || ''}">
                        ${pack.name?.[currentLang] || pack.name?.es || 'Paquete'}
                    </h3>
                    <p data-es="${pack.description?.es || ''}" data-en="${pack.description?.en || ''}">
                        ${pack.description?.[currentLang] || pack.description?.es || ''}
                    </p>
                    <div style="font-size: 2rem; font-weight: 700; margin: 20px 0; color: #ff359d;">
                        ${pack.price || '$0'}
                    </div>
                    <ul style="text-align: left; list-style: none; padding: 0;">
                        ${featuresHTML}
                    </ul>
                </div>
            `;
        }).join('');
        
        container.innerHTML = packsHTML;
    }

    // Cargar datos de clientes
    async function loadClientsData() {
        try {
            const clientFiles = ['hotel-casa-blanca', 'el-moro-carnes', 'killary', 'marca-cuatro'];
            const clients = [];
            
            for (const file of clientFiles) {
                try {
                    const response = await fetch(`/data/clients/${file}.json`);
                    if (response.ok) {
                        const client = await response.json();
                        clients.push(client);
                    }
                } catch (err) {
                    console.log(`Client ${file} not found, skipping`);
                }
            }
            
            if (clients.length > 0) {
                updateClientsSection(clients);
                console.log('✓ Clients data loaded');
            }
        } catch (error) {
            console.log('Using default clients content');
        }
    }

    // Actualizar la sección de clientes
    function updateClientsSection(clients) {
        const container = document.querySelector('#clients .services-grid');
        if (!container || clients.length === 0) return;
        
        const currentLang = window.currentLanguage || 'es';
        
        // Ordenar por el campo order
        clients.sort((a, b) => (a.order || 0) - (b.order || 0));
        
        // Generar HTML para cada cliente
        const clientsHTML = clients.map(client => `
            <div class="service-card">
                <img src="${client.logo || ''}" alt="${client.name || ''}" 
                     style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 20px;">
                <h3>${client.name || 'Cliente'}</h3>
                <p style="color: var(--text-secondary); margin-bottom: 20px;" 
                   data-es="${client.category?.es || ''}" data-en="${client.category?.en || ''}">
                    ${client.category?.[currentLang] || client.category?.es || ''}
                </p>
                <a href="${client.url || '#'}" class="cta-button" 
                   style="padding: 10px 20px; font-size: 0.9rem;" 
                   data-es="Visitar" data-en="Visit" target="_blank">
                    ${currentLang === 'es' ? 'Visitar' : 'Visit'}
                </a>
            </div>
        `).join('');
        
        container.innerHTML = clientsHTML;
    }

    // Escuchar cambios de idioma
    function setupLanguageListener() {
        const originalToggleLanguage = window.toggleLanguage;
        if (typeof originalToggleLanguage === 'function') {
            window.toggleLanguage = function() {
                originalToggleLanguage();
                // Recargar datos del CMS con el nuevo idioma
                loadCMSData();
            };
        }
    }

    // Inicialización
    function init() {
        // Esperar a que el DOM y el script principal estén listos
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => {
                    loadCMSData();
                    setupLanguageListener();
                }, 100);
            });
        } else {
            setTimeout(() => {
                loadCMSData();
                setupLanguageListener();
            }, 100);
        }
    }

    // Ejecutar inicialización
    init();

    console.log('📋 CMS Integration loaded - Agencia Aster');
})();
