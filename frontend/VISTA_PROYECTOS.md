# Funcionalidad de Vista Lista/Tablero para Proyectos

## Descripción

Esta implementación agrega la funcionalidad de ver los proyectos de un espacio en dos vistas diferentes:

1. **Vista de Lista**: Similar a una tabla con columnas que muestran información detallada de cada proyecto
2. **Vista de Tablero (Board)**: Vista de tarjetas con información visual de cada proyecto

La funcionalidad está inspirada en la aplicación [Circle](https://github.com/ln-dev7/circle) que mencionaste.

## Archivos Creados/Modificados

### Archivos Nuevos:

1. **`src/shared/hooks/use-view-store.ts`**
   - Store de Zustand para manejar el estado de la vista (lista vs tablero)

2. **`src/app/project-management/delivery/components/ProjectHeaderOptions.tsx`**
   - Componente con los botones de filtro y toggle de vista (Display)

3. **`src/app/project-management/delivery/components/ProjectBoardView.tsx`**
   - Vista de tablero con tarjetas de proyectos

4. **`src/app/project-management/delivery/components/ProjectListView.tsx`**
   - Vista de lista estilo tabla con columnas informativas

5. **`src/app/project-management/delivery/components/ProjectViewContainer.tsx`**
   - Contenedor principal que integra ambas vistas

6. **`src/app/project-management/delivery/views/SpaceProjectsView.tsx`**
   - Vista completa para mostrar todos los proyectos de un espacio específico

### Archivos Modificados:

1. **`src/App.tsx`**
   - Se agregó la ruta: `/dashboard/space/:spaceId/projects`

2. **`src/app/layout/components/nav-spaces.tsx`**
   - Se agregó la opción "Ver todos los proyectos" en el menú contextual de cada espacio

## Cómo Usar

### 1. Acceder a la Vista de Proyectos

- Ve al dashboard (`/dashboard`)
- En la barra lateral izquierda, encuentra la sección "Espacios"
- Haz clic en el menú de tres puntos (⋯) de cualquier espacio
- Selecciona "Ver todos los proyectos"

### 2. Alternar entre Vistas

Una vez en la vista de proyectos del espacio:
- Usa el botón "Display" en la esquina superior derecha
- Selecciona entre "List" (lista) o "Board" (tablero)
- La vista seleccionada se mantendrá gracias al store de Zustand

### 3. Vista de Lista

Muestra los proyectos en formato de tabla con las siguientes columnas:
- **Proyecto**: Nombre y descripción
- **Estado**: Badge con el estado actual
- **Prioridad**: Badge con el nivel de prioridad
- **Progreso**: Barra de progreso visual
- **Tareas**: Número de tareas completadas/total
- **Fecha límite**: Fecha de vencimiento
- **Miembros**: Avatares de los miembros del proyecto
- **Acciones**: Menú contextual con opciones

### 4. Vista de Tablero

Muestra los proyectos como tarjetas con:
- Información del proyecto (nombre, descripción, icono)
- Badges de estado y prioridad
- Barra de progreso
- Contador de tareas
- Fecha límite
- Avatares de miembros
- Menú de acciones

## Características Técnicas

### Estado Global
- Utiliza Zustand para manejar el estado de la vista
- El estado se persiste durante la sesión

### Responsive Design
- La vista de lista se adapta ocultando columnas en pantallas pequeñas
- La vista de tablero usa un grid responsive

### Datos Simulados
- Los datos adicionales (progreso, prioridad, etc.) están simulados
- En una implementación real, estos datos vendrían de tu API/store

### Navegación
- Navegación con React Router
- Breadcrumbs para fácil navegación
- Botón de regreso

## Próximos Pasos

Para completar la implementación podrías:

1. **Conectar con datos reales**: Reemplazar los datos simulados con datos de tu API
2. **Filtros**: Implementar la funcionalidad del botón "Filter"
3. **Drag & Drop**: Agregar funcionalidad de arrastrar y soltar en la vista de tablero
4. **Persistencia**: Persistir la preferencia de vista en localStorage
5. **Search**: Agregar funcionalidad de búsqueda
6. **Sorteo**: Permitir ordenamiento en la vista de lista

## Rutas Disponibles

- `/dashboard/space/:spaceId/projects` - Vista de proyectos de un espacio específico

## Dependencias Agregadas

- `zustand` - Para manejo de estado global

¡La funcionalidad está lista para usar! Navega a cualquier espacio y utiliza la opción "Ver todos los proyectos" para probar las nuevas vistas.
