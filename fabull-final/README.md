# Fabull Transporte (Frontend)

Aplicación frontend de demostración para un portal de servicios logísticos y de transporte, desarrollado con React + Vite.

## 🚀 Qué incluye este proyecto

- Interfaz con enrutamiento de páginas (`Home`, `Nosotros`, `Contacto`, `Servicios`, `Login`)
- Navegación responsive con tema claro/oscuro y transiciones suaves
- Módulo de notificaciones (toast) para mensajes al usuario
- Página de detalle de servicio dinámica (`/servicios/:id`)
- Componentes reusables: Navbar, Footer, Hero, Reviews, Services, Contact, etc.

## 🛠️ Tecnología usada

- React 18
- Vite
- React Router DOM
- Framer Motion
- Lucide React

## ✅ Cómo iniciar en local

1. Abre terminal en la carpeta del proyecto:
   ```bash
    Ejemplo : cd c:fabull-transporte-v2\fabull-project
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Arranca el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Abre el enlace que aparece (normalmente `http://localhost:5173`).

## 📦 Scripts disponibles

- `npm run dev` — arranca la app en modo desarrollo
- `npm run build` — genera build de producción
- `npm run preview` — prueba el build local

## 🧭 Estructura principal de carpetas

- `src/App.jsx` — entrypoint con router y layout global
- `src/main.jsx` — monta React
- `src/components/` — UI compartida y secciones
- `src/pages/` — rutas y vistas (Home, Nosotros, Contacto, detalle, login)
- `src/context/ToastContext.jsx` — contexto de toast global
- `src/services/api.js` — servicios API / llamadas HTTP
- `src/hooks/` — hooks personalizados

## 🎯 Funcionamiento general de la aplicación

La aplicación es un portal corporativo para presentar servicios de transporte y logística:

1. El usuario entra en la página principal y ve los servicios destacados, misión y beneficios.
2. La navegación permite explorar “Nosotros”, “Contacto” y ver detalles de servicios.
3. El sistema usa enrutamiento del lado del cliente para cambio de páginas sin recarga.
4. Mensajes de feedback y errores se muestran con `Toast` para mejor experiencia.

## 🧩 Herramientas y acciones principales

- **Vite** para desarrollo rápido y recarga en caliente.
- **React Router DOM** para rutas declarativas.
- **Framer Motion** para animaciones fluidas y transiciones.
- **Lucide** para iconografía.
- **Context API** para manejar notificaciones globalmente.

## 🏢 Sobre la empresa (Fabull Transporte)

Fabull Transporte es un equipo enfocado en ofrecer soluciones de movilidad y logística con enfoque profesional. El portal apoya la cultura de atención al cliente con claridad de servicios, contacto directo y gestión ordenada de información.

- Misión: facilitar transporte seguro y puntual para empresas y particulares.
- Visión: ser referente digital en servicios logísticos con enfoque en usabilidad y transparencia.
- Acción general: brindar una experiencia web clara, accesible y confiable para conocer y contratar servicios.

---

Si deseas, puedo añadir una sección con checklist de despliegue (Netlify/Vercel) y recomendaciones de QA para producción.