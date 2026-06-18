# Esthefany Nail & Care | Sitio Web de Reservas 💅✨

Este es un sitio web premium, elegante y minimalista diseñado para el salón de belleza de manicura y pedicura de **Esthefany**. La página está optimizada para captar clientes y facilitar el agendamiento de citas de forma interactiva mediante un formulario directo a **WhatsApp**.

El sitio es completamente estático, responsivo y cuenta con animaciones fluidas, por lo que es ideal para ser alojado de forma gratuita en **GitHub Pages**.

---

## 🚀 Características del Sitio

- **Diseño Premium**: Paleta de colores minimalista en tonos nude y rosa pastel con acentos en dorado.
- **Formulario Inteligente**: Genera un mensaje estructurado y listo para enviar por WhatsApp con los datos del cliente (nombre, servicio, fecha y hora).
- **Catálogo Interactivo**: Permite al cliente reservar directamente un servicio desde su tarjeta descriptiva.
- **Portafolio Dinámico**: Galería con filtros por categoría (Manicura, Pedicura, Nail Art) y visor a pantalla completa (Lightbox).
- **Sección FAQ**: Acordeón interactivo para resolver las dudas más comunes.
- **Optimización SEO**: Estructura semántica en HTML5, etiquetas meta descriptivas y carga rápida de recursos.

---

## 🛠️ Tecnologías Utilizadas

- **HTML5** (Semántica y Accesibilidad)
- **CSS3** (Variables de diseño, Flexbox, Grid y Animaciones)
- **Vanilla JavaScript** (Interactividad y validaciones)
- **Lucide Icons** (Iconografía vectorial moderna)
- **Imágenes generadas por IA** (Recursos visuales premium en alta definición)

---

## 🌐 ¿Cómo desplegar en GitHub Pages?

Para subir y mostrar este sitio web de forma gratuita en GitHub Pages, sigue estos pasos:

### Paso 1: Inicializar Git y subir a tu repositorio de GitHub
1. Abre tu terminal de comandos en la carpeta del proyecto y ejecuta:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Esthefany Nail Salon"
   ```
2. Crea un repositorio nuevo y vacío en tu cuenta de GitHub (por ejemplo, con el nombre `esthefany-nail-salon`).
3. Copia la URL del repositorio remoto y vincula tu proyecto ejecutando:
   ```bash
   git remote add origin https://github.com/TU_USUARIO/esthefany-nail-salon.git
   git branch -M main
   git push -u origin main
   ```
   *(Reemplaza `TU_USUARIO` por tu nombre de usuario real en GitHub).*

### Paso 2: Activar GitHub Pages en el repositorio
1. Entra a tu repositorio en la web de GitHub.
2. Dirígete a la pestaña **Settings** (Configuración) en la barra superior.
3. En la barra lateral izquierda, haz clic en la sección **Pages** (Páginas).
4. Bajo la sección **Build and deployment**:
   - En **Source**, asegúrate de que esté seleccionado `Deploy from a branch`.
   - En **Branch**, selecciona la rama `main` (o `master`) y el directorio `/ (root)`.
   - Haz clic en **Save** (Guardar).
5. GitHub tardará entre 1 y 2 minutos en compilar tu sitio. Aparecerá un recuadro verde con el enlace listo, por ejemplo:
   `https://TU_USUARIO.github.io/esthefany-nail-salon/`

---

## 📝 Personalización

Si en el futuro deseas cambiar el número de teléfono o los servicios, puedes hacerlo fácilmente editando los siguientes archivos:
- **Número de WhatsApp**: Se configura en la variable `whatsappPhone` al inicio de [`app.js`](app.js).
- **Servicios y Precios**: Puedes editarlos directamente en las tarjetas de la sección `<section class="services">` en el archivo [`index.html`](index.html).
- **Ubicación y Horarios**: Se configuran en la sección de contacto dentro del archivo [`index.html`](index.html).
