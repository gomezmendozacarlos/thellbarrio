# Thell Barrio - Landing Page

Landing page oficial para Thell Barrio, banda mexicana de latin metal. Un sitio web responsive y optimizado que presenta la banda, su música y próximas presentaciones en vivo.

## 🚀 Demo

[Ver sitio en vivo](https://thell-barrio.com) (próximamente)

## 📋 Características

- ✅ Diseño mobile first responsive
- ✅ Optimización SEO completa
- ✅ Menú hamburguesa adaptativo con scroll
- ✅ Sección hero con logo superpuesto
- ✅ Video de YouTube integrado
- ✅ Sistema de fechas de conciertos dinámico
- ✅ Integración con redes sociales
- ✅ Iconografía personalizada de la banda
- ✅ Esquema de colores blanco/naranja

## 🛠️ Tecnologías Utilizadas

**Frontend:**
- HTML5 semántico
- CSS3 con Flexbox y Grid
- Tailwind CSS para estilos utilitarios
- JavaScript vanilla (ES6+) para interactividad

**Assets:**
- Iconografía personalizada en PNG
- Fotografías profesionales de la banda
- Videos de YouTube embebidos

## 🎨 Diseño y Estructura

### Paleta de Colores
- **Principal:** Blanco (#FFFFFF)
- **Secundario:** Naranja (#FF6B35)
- **Acentos:** Grises para texto y sombras

### Secciones del Sitio

#### 🍔 Barra de Menú
- **Mobile:** Menú hamburguesa con iconografía PNG personalizada
- **Desktop:** Menú horizontal con iconografía
- **Scroll Behavior:** Se convierte automáticamente en hamburguesa al hacer scroll hacia abajo

#### 🎸 Hero Section
- Fotografía de la banda a pantalla completa
- Logo de Thell Barrio superpuesto en la parte central inferior
- Diseño optimizado para diferentes resoluciones

#### 🎬 Video Section
- Video de YouTube embebido
- Ocupa el 100% del ancho de pantalla
- Responsive en todas las resoluciones

#### 📖 Biografía
- Sección limpia y minimalista
- Párrafo descriptivo sobre la banda
- Tipografía optimizada para lectura

#### 📅 Fechas de Conciertos
**Layout:**
- **Izquierda:** Fecha (día, día del mes, mes) y venue
- **Derecha:** Ciudad del venue y botón de boletos
- **Funcionalidad:** Botón de boletos se oculta/muestra según disponibilidad

#### 🌐 Redes Sociales
- Enlaces a Facebook, Instagram y YouTube
- Iconos personalizados
- Diseño centrado y accesible

## 📦 Instalación

### Prerrequisitos
- Navegador web moderno
- Editor de código (VS Code recomendado)
- Node.js (para Tailwind CSS)

### Pasos de instalación

1. Clona el repositorio
```bash
git clone https://github.com/tu-usuario/thell-barrio-landing.git
```

2. Navega al directorio del proyecto
```bash
cd thell-barrio-landing
```

3. Instala Tailwind CSS
```bash
npm install -D tailwindcss
npx tailwindcss init
```

4. Configura Tailwind CSS en tu `tailwind.config.js`
```javascript
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'orange-primary': '#FF6B35',
      }
    },
  },
  plugins: [],
}
```

5. Compila los estilos de Tailwind
```bash
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```

6. Abre `index.html` en tu navegador

## 📁 Estructura del Proyecto

```
thell-barrio-landing/
├── assets/
│   ├── images/
│   │   ├── band-photo.jpg
│   │   ├── logo.png
│   │   └── icons/
│   │       ├── hamburger-icon.png
│   │       ├── facebook-icon.png
│   │       ├── instagram-icon.png
│   │       └── youtube-icon.png
├── src/
│   ├── css/
│   │   ├── input.css
│   │   └── custom.css
│   └── js/
│       ├── main.js
│       ├── menu.js
│       └── scroll.js
├── dist/
│   └── output.css
├── index.html
├── tailwind.config.js
├── package.json
└── README.md
```

## 🚦 Scripts Disponibles

```bash
# Compilar Tailwind CSS en modo desarrollo
npm run dev

# Compilar Tailwind CSS para producción
npm run build

# Modo watch para desarrollo
npm run watch
```

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
/* Mobile: 320px - 768px */
/* Tablet: 768px - 1024px */
/* Desktop: 1024px+ */
```

## ⚡ Optimizaciones SEO

- Meta tags optimizados para latin metal y bandas mexicanas
- Estructura HTML semántica
- Alt text descriptivo en imágenes
- Open Graph tags para redes sociales
- Schema markup para eventos musicales
- Optimización de velocidad de carga

## 🎵 Funcionalidades Específicas

### Menú Adaptativo
```javascript
// Detección de scroll para cambiar menú
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    menu.classList.add('hamburger-mode');
  }
});
```

### Sistema de Fechas
- Fechas dinámicas con JavaScript
- Botones condicionales para venta de boletos
- Formato de fecha localizado para México

### Integración de Video
- YouTube API para mejor rendimiento
- Lazy loading del video
- Controles personalizados opcionales

## 🚀 Despliegue

### Netlify
1. Conecta el repositorio en Netlify
2. Build command: `npm run build`
3. Publish directory: `./`

### GitHub Pages
```bash
# Después de compilar Tailwind
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

## 🤝 Contribución

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-seccion`)
3. Commit tus cambios (`git commit -m 'Add nueva sección'`)
4. Push a la rama (`git push origin feature/nueva-seccion`)
5. Abre un Pull Request

## 📝 Roadmap

### Fase 1 - Desarrollo Inicial ✅
- [x] Estructura HTML básica
- [x] Implementación de Tailwind CSS
- [x] Secciones principales

### Fase 2 - Funcionalidades ⏳
- [ ] Menú hamburguesa animado
- [ ] Sistema de fechas dinámico
- [ ] Integración con YouTube API

### Fase 3 - Optimización 📅
- [ ] Optimización de imágenes
- [ ] Implementación de PWA
- [ ] Analytics y tracking

## 📜 Licencia

Este proyecto está bajo la Licencia MIT - ve el archivo [LICENSE](LICENSE) para más detalles.

## 🎸 Sobre Thell Barrio

Thell Barrio es una banda mexicana de latin metal que combina elementos tradicionales latinos con la potencia del metal moderno. Su música refleja la cultura urbana mexicana con un sonido único y energético.

## 👥 Equipo de Desarrollo

- **Desarrollador Frontend** - *Desarrollo inicial* - [tu-usuario](https://github.com/tu-usuario)

## 📧 Contacto

- **Banda:** info@thellbarrio.com
- **Desarrollo:** dev@thellbarrio.com
- **Redes:** [@thellbarrio](https://instagram.com/thellbarrio)

## 🙏 Recursos y Agradecimientos

- Fotografías profesionales por [Fotógrafo]
- Iconografía personalizada por [Diseñador]
- Inspiración en sitios de bandas de metal latino

---

🤘 ¡Apoya a Thell Barrio y el metal mexicano!