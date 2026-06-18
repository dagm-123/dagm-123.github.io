// -------------------------------------------------------------
// ESTHEFANY NAIL & CARE - LÓGICA DE INTERACTIVIDAD
// -------------------------------------------------------------

// Configuración Global
const CONFIG = {
    whatsappPhone: "+584169709408", // Número de WhatsApp para recibir citas (Modificable)
};

document.addEventListener("DOMContentLoaded", () => {
    // 1. Inicializar Iconos de Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Efecto Sticky en la Barra de Navegación
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 3. Menú Móvil (Hamburger)
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener("click", () => {
            hamburgerBtn.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // Cerrar menú al hacer clic en un enlace de navegación
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                hamburgerBtn.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    }

    // 4. Enlaces Activos al hacer Scroll (Scrollspy)
    const sections = document.querySelectorAll("section");
    const navLinksArray = Array.from(navLinks);

    window.addEventListener("scroll", () => {
        let currentSection = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Se activa cuando el scroll está aproximadamente en el centro de la sección
            if (window.scrollY >= (sectionTop - 150)) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinksArray.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    });

    // 5. Acordeón de Preguntas Frecuentes (FAQ)
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(question => {
        question.addEventListener("click", () => {
            const faqItem = question.parentElement;
            
            // Cerrar las demás preguntas
            document.querySelectorAll(".faq-item").forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove("active");
                }
            });

            // Alternar estado activo de la actual
            faqItem.classList.toggle("active");
        });
    });

    // 6. Filtro de la Galería
    const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remover clase activa de todos y agregar al actual
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            galleryItems.forEach(item => {
                const category = item.getAttribute("data-category");

                if (filterValue === "all" || category === filterValue) {
                    item.style.display = "block";
                    // Pequeño delay para animación de opacidad
                    setTimeout(() => {
                        item.style.opacity = "1";
                        item.style.transform = "scale(1)";
                    }, 50);
                } else {
                    item.style.opacity = "0";
                    item.style.transform = "scale(0.8)";
                    setTimeout(() => {
                        item.style.display = "none";
                    }, 300); // Coincide con la transición en CSS
                }
            });
        });
    });

    // 7. Lightbox de la Galería (Zoom de Fotos)
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxClose = document.getElementById("lightbox-close");

    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
            const img = item.querySelector(".gallery-img");
            const caption = item.querySelector(".gallery-overlay span");

            if (lightbox && lightboxImg && lightboxCaption) {
                lightbox.style.display = "block";
                lightboxImg.src = img.src;
                lightboxCaption.textContent = caption.textContent;
                document.body.style.overflow = "hidden"; // Desactivar scroll detrás
            }
        });
    });

    if (lightboxClose && lightbox) {
        lightboxClose.addEventListener("click", closeLightbox);
        // Cerrar al hacer clic fuera de la imagen
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    function closeLightbox() {
        if (lightbox) {
            lightbox.style.display = "none";
            document.body.style.overflow = "auto"; // Reactivar scroll
        }
    }

    // 8. Restringir Fechas Pasadas en el Formulario
    const dateInput = document.getElementById("booking-date");
    if (dateInput) {
        const today = new Date().toISOString().split("T")[0];
        dateInput.min = today;
    }

    // 9. Procesar Formulario de Reserva y Enviar a WhatsApp
    const bookingForm = document.getElementById("whatsapp-booking-form");

    if (bookingForm) {
        bookingForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Obtener valores
            const name = document.getElementById("client-name").value.trim();
            const service = document.getElementById("service-select").value;
            const date = document.getElementById("booking-date").value;
            const time = document.getElementById("booking-time").value;
            const notes = document.getElementById("booking-notes").value.trim();

            // Formatear la fecha para hacerla más legible (ej. 18/06/2026)
            const formattedDate = date.split("-").reverse().join("/");

            // Construir el mensaje de WhatsApp de forma profesional
            let message = `¡Hola *Esthefany Nail & Care*! 💅✨\n`;
            message += `Me gustaría agendar una cita para un servicio de uñas.\n\n`;
            message += `📝 *Detalles de la Reserva:*\n`;
            message += `▪️ *Nombre:* ${name}\n`;
            message += `▪️ *Servicio:* ${service}\n`;
            message += `▪️ *Fecha deseada:* ${formattedDate}\n`;
            message += `▪️ *Hora preferida:* ${time} hs\n`;

            if (notes) {
                message += `▪️ *Notas/Diseño:* ${notes}\n`;
            }

            message += `\n¿Tienen disponibilidad para esta fecha y hora? ¡Quedo atenta a su confirmación! 💕`;

            // Codificar el texto para la URL
            const encodedMessage = encodeURIComponent(message);

            // Generar enlace de WhatsApp API
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${CONFIG.whatsappPhone}&text=${encodedMessage}`;

            // Abrir en una pestaña nueva
            window.open(whatsappUrl, "_blank");
        });
    }
});

// Función Global para seleccionar servicio desde las tarjetas y hacer scroll automático
function selectServiceAndScroll(serviceName) {
    const serviceSelect = document.getElementById("service-select");
    const bookingSection = document.getElementById("agendar");

    if (serviceSelect) {
        serviceSelect.value = serviceName;
    }

    if (bookingSection) {
        // Scroll suave hacia la sección de agendamiento
        bookingSection.scrollIntoView({ behavior: "smooth" });
    }
}
