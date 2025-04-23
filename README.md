# Instrucciones para ejecutar el proyecto

Para ejecutar el proyecto de CineMania, sigue estos pasos:

## Requisitos previos
- Node.js (versión 20 o superior)
- npm (normalmente viene con Node.js)

## Pasos para instalar y ejecutar

1. Clona o descarga el proyecto a tu computador

2. Abre una terminal o línea de comandos en el directorio del proyecto

3. Instala las dependencias:
```bash
npm install
```

4. Inicia el servidor de desarrollo:
```bash
npm run dev
```

5. Abre tu navegador y navega a la dirección mostrada en la terminal (generalmente http://localhost:5173)

## Estructura de archivos

El proyecto sigue una estructura estándar de Vue 3 con Composition API y TypeScript:

- `src/components/`: Componentes reutilizables
- `src/views/`: Páginas de la aplicación
- `src/services/`: Servicios para manejar la lógica de negocio
- `src/interfaces/`: Interfaces de TypeScript para tipado
- `src/router/`: Configuración de rutas

## Características implementadas

- Listado de películas con diseño responsivo
- Filtrado por género, año y término de búsqueda
- Ordenamiento por fecha, calificación o título
- Vista detallada de cada película
- Sistema de comentarios para películas
- Diseño responsivo que se adapta a dispositivos móviles, tablets y escritorio
- Uso de Bootstrap para el framework CSS