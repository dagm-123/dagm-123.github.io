/* ==========================================================================
   ESSENZA SPA - INTERACTIVE SCRIPTS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- Dynamic Business Hours Status ---
    function updateBusinessStatus() {
        const statusElement = document.querySelector('.status-closed');
        if (!statusElement) return;

        const now = new Date();
        const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
        const hour = now.getHours();
        const minute = now.getMinutes();

        // 9:00 AM is 9 hours. 6:00 PM is 18 hours.
        const isOpenDay = day >= 1 && day <= 6; // Mon-Sat
        const currentMinutes = hour * 60 + minute;
        const openMinutes = 9 * 60;
        const closeMinutes = 18 * 60;

        if (day === 0) {
            statusElement.textContent = 'Cerrado hoy — Abre el lunes a las 9:00 a.m.';
            statusElement.className = 'status-closed';
            statusElement.style.color = '#eb7d7d';
        } else if (currentMinutes < openMinutes) {
            statusElement.textContent = 'Cerrado actualmente — Abre a las 9:00 a.m.';
            statusElement.className = 'status-closed';
            statusElement.style.color = '#eb7d7d';
        } else if (currentMinutes >= closeMinutes) {
            if (day === 6) {
                statusElement.textContent = 'Cerrado actualmente — Abre el lunes a las 9:00 a.m.';
            } else {
                statusElement.textContent = 'Cerrado actualmente — Abre mañana a las 9:00 a.m.';
            }
            statusElement.className = 'status-closed';
            statusElement.style.color = '#eb7d7d';
        } else {
            statusElement.textContent = 'Abierto ahora — Cierra a las 6:00 p.m.';
            statusElement.className = 'status-closed status-open';
            statusElement.style.color = '#51cf66'; // Elegant green
        }
    }
    
    updateBusinessStatus();
    // Refresh every minute
    setInterval(updateBusinessStatus, 60000);


    // --- Sticky Header Scroll Effect ---
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // --- Mobile Menu Toggle Drawer ---
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if (mobileMenuToggle && mobileNavDrawer) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            mobileNavDrawer.classList.toggle('active');
            
            // Animation for hamburger bars
            const bars = mobileMenuToggle.querySelectorAll('.bar');
            if (mobileMenuToggle.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(6px, -7px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
        
        // Close drawer when clicking links
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mobileNavDrawer.classList.remove('active');
                const bars = mobileMenuToggle.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }


    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    const revealOnScroll = () => {
        const triggerBottom = (window.innerHeight / 10) * 9;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('reveal-visible');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger initial check


    // --- Active Nav Link Highlight ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Adjust offset for sticky header
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });


    // --- Services Tabs Filter ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Set active class on buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-tab');
            
            serviceCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95) translateY(10px)';
                
                setTimeout(() => {
                    const cardCategory = card.getAttribute('data-category');
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.classList.remove('hide');
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1) translateY(0)';
                        }, 50);
                    } else {
                        card.classList.add('hide');
                    }
                }, 250);
            });
        });
    });


    // --- Gallery Masonry Filters & Lightbox ---
    const galleryFilters = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    
    // Grid Filter
    galleryFilters.forEach(button => {
        button.addEventListener('click', () => {
            galleryFilters.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.9)';
                
                setTimeout(() => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.classList.remove('hide');
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.classList.add('hide');
                    }
                }, 250);
            });
        });
    });
    
    // Lightbox Open
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const title = item.querySelector('.gallery-title').textContent;
            
            if (img && lightbox && lightboxImg && lightboxCaption) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightboxCaption.textContent = title;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Stop scrolling background
            }
        });
    });
    
    // Lightbox Close
    if (lightboxClose && lightbox) {
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        };
        
        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Escape key close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }


    // --- Booking Modal Operations ---
    const bookingModal = document.getElementById('booking-modal');
    const modalClose = document.getElementById('modal-close');
    const bookingForm = document.getElementById('booking-form');
    const bookingServiceSelect = document.getElementById('booking-service');
    const bookingDateInput = document.getElementById('booking-date');
    const openBookingButtons = document.querySelectorAll('.open-booking-btn');
    
    // Set date input minimum to today
    if (bookingDateInput) {
        const today = new Date().toISOString().split('T')[0];
        bookingDateInput.min = today;
    }
    
    // Open Modal and Pre-select service if clicked from card
    openBookingButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Check if service data exists
            const selectedService = btn.getAttribute('data-service');
            if (selectedService && bookingServiceSelect) {
                bookingServiceSelect.value = selectedService;
            } else if (bookingServiceSelect) {
                // If generic button, set to default placeholder
                bookingServiceSelect.value = "";
            }
            
            if (bookingModal) {
                bookingModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close Modal
    const closeModal = () => {
        if (bookingModal) {
            bookingModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (bookingModal) {
        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal) {
                closeModal();
            }
        });
    }
    
    // Form Submission: Compile WhatsApp Message
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('booking-name').value.trim();
            const service = document.getElementById('booking-service').value;
            const date = document.getElementById('booking-date').value;
            const time = document.getElementById('booking-time').value;
            const comments = document.getElementById('booking-comments').value.trim();
            
            // Reformat Date for friendly reading (e.g. YYYY-MM-DD to DD/MM/YYYY)
            const dateParts = date.split('-');
            const friendlyDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
            
            // WhatsApp template text
            let messageText = `Hola Essenza Spa, me gustaría agendar una cita.\n\n`;
            messageText += `✨ *Nombre:* ${name}\n`;
            messageText += `✨ *Servicio:* ${service}\n`;
            messageText += `✨ *Fecha:* ${friendlyDate}\n`;
            messageText += `✨ *Hora:* ${time}\n`;
            
            if (comments) {
                messageText += `✨ *Nota:* ${comments}\n`;
            }
            
            messageText += `\nQuedo atenta a su confirmación de disponibilidad. ¡Muchas gracias!`;
            
            // Encode URI
            const encodedText = encodeURIComponent(messageText);
            const phoneNumber = '584261643137'; // Táchira, Venezuela number
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
            
            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');
            
            // Close modal & reset form
            closeModal();
            bookingForm.reset();
        });
    }
});
