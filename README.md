# 🎬 PRELUDE - Plataforma de Trailers

Puedes ver el proyecto desplegado en: [Enlace a GitHub Pages](https://gustavo-corpus.github.io/final_project)

## Proyecto Front-End

Aplicación web para explorar trailers de películas y series utilizando la API de TMDB.

---

## ✅ Cumplimiento de Requisitos del Proyecto

### Etiquetado y JSX

- ✅ **Responsive Design**: Adaptado a todas las resoluciones desde 320px sin scroll horizontal
- ✅ **Navegación funcional**: Todos los enlaces funcionan correctamente
- ✅ **Nomenclatura BEM**: Todas las clases siguen la metodología BEM
- ✅ **HTML Semántico**: Uso correcto de etiquetas semánticas (section, main, header, button, form)
- ✅ **Posicionamiento correcto**: Uso de flexbox y grid para layouts
- ✅ **Estructura de proyecto**: 
  - ✅ Carpeta `components` con archivos JS y CSS
  - ✅ Carpeta `fonts` (opcional, usando fuentes del sistema)
- ✅ **Sin advertencias** en la consola

### React y API Third-Party

- ✅ **Hooks correctamente utilizados**: 
  - No se usan dentro de condicionales
  - Se llaman en la función principal del componente
- ✅ **Solicitudes asíncronas**:
  - ✅ Uso de Fetch API (sin librerías third-party)
  - ✅ Solicitudes en archivo separado (`MoviesApi.js`)
  - ✅ Cadena de promises termina con `.catch()`
  - ✅ Primer `then()` devuelve `res.json()`
- ✅ **Estilo de código**:
  - ✅ Hooks personalizados no utilizados (no requeridos)
  - ✅ Sin librerías third-party innecesarias

### Búsqueda de Datos

- ✅ **Preloader visible**: Spinner animado durante las solicitudes
- ✅ **Resultados de búsqueda**: Se muestra bloque con resultados
- ✅ **Mensaje "No se ha encontrado nada"**: Cuando no hay resultados
- ✅ **Paginación**: Se muestran 3 elementos inicialmente
- ✅ **Botón "Mostrar más"**: Agrega 3 elementos adicionales por click

### Mejores Procedimientos

- ✅ **Componentes reutilizables**: Diseño modular
- ✅ **Fuentes**: Conectadas con `@font-face` y fuentes del sistema como fallback
- ✅ **Iconos SVG**: Todos los iconos en formato SVG
- ✅ **Focus en formularios**: Campos resaltados al enfocar
- ✅ **Formularios con placeholders**: Todos los campos tienen placeholder y required
- ✅ **Sin reset.css**: No se utiliza
- ✅ **Estado inicial correcto**: Variables de estado con tipos de datos correctos
- ✅ **Solicitudes en App**: Descritas dentro del componente principal
- ✅ **Manejo de errores**: 
  - ✅ Usuario recibe mensajes visuales en caso de error
  - ✅ No solo en consola
- ✅ **Constantes en mayúsculas**: Archivo `constants.js` separado
- ✅ **Modal funcional**: Se cierra con ESC, click en overlay o botón X

### Recomendaciones

- ✅ **Fuentes del sistema**: Como alternativas
- ✅ **Atributo alt**: Todas las imágenes tienen alt descriptivo
- ✅ **Imágenes optimizadas**: Uso de CDN de TMDB con tamaños apropiados
- ✅ **React Router**: Uso de componentes de react-router para navegación
- ✅ **Bloques semánticos**: Sin divs innecesarios
- ✅ **Código limpio**:
  - Legible y estructurado
  - Sin código redundante
  - Mismo formato e indentación

---

## 🚀 Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar en desarrollo
npm run dev

# 3. Abrir en navegador
http://localhost:5173
```

## 🏗️ Build para Producción

```bash
npm run build
npm run preview
```

---

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── App/              # Componente principal
│   ├── Header/           # Barra de navegación
│   ├── Hero/             # Carrusel con autoplay
│   ├── Main/             # Contenedor de categorías
│   ├── MovieRow/         # Filas de contenido
│   ├── SearchResults/    # Resultados (3 en 3)
│   ├── TrailerModal/     # Modal de trailers
│   └── Preloader/        # Indicador de carga
├── utils/
│   ├── MoviesApi.js      # Cliente API de TMDB
│   └── constants.js      # Constantes en MAYÚSCULAS
├── index.css             # Estilos globales
└── main.jsx              # Punto de entrada
```

---

## 🔑 Características Clave

- ✅ Paginación de 3 en 3 elementos
- ✅ Manejo visual de errores
- ✅ Preloader durante cargas
- ✅ Constantes en archivo separado
- ✅ HTML semántico
- ✅ BEM para clases CSS
- ✅ Responsive completo
- ✅ Formularios con required y placeholder
- ✅ Alt descriptivos en imágenes

---