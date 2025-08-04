# TaskFlux 

![TaskFlux Logo](./frontend/public/logo.png)

Un sistema moderno de gestión de tareas y proyectos construido con React, TypeScript y Spring Boot.

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [API Documentation](#api-documentation)
- [Contribución](#contribución)
- [Licencia](#licencia)

## 📖 Descripción

TaskFlux es una plataforma integral de gestión de proyectos que permite a los equipos organizar, colaborar y realizar un seguimiento del progreso de sus tareas de manera eficiente. La aplicación está diseñada con una arquitectura moderna que separa el frontend y backend, proporcionando una experiencia de usuario fluida y una API robusta.

### Características Principales

- **Gestión de Espacios de Trabajo**: Organiza proyectos en espacios temáticos
- **Administración de Proyectos**: Crea, edita y gestiona proyectos con vistas de lista y tablero
- **Sistema de Tareas**: Seguimiento completo del estado y progreso de tareas
- **Colaboración en Equipo**: Gestión de miembros y permisos por proyecto
- **Gestión de Tiempo**: Calendario integrado y seguimiento de fechas
- **Interfaz Moderna**: UI/UX responsive con tema oscuro/claro
- **Animaciones Fluidas**: Experiencia interactiva con Framer Motion

## 🚀 Tecnologías

### Frontend
- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **React Router Dom** - Navegación
- **Framer Motion** - Animaciones
- **Tailwind CSS** - Estilos utilitarios
- **shadcn/ui** - Componentes UI
- **Radix UI** - Componentes primitivos accesibles
- **Lucide React** - Iconografía

### Backend
- **Spring Boot 3.5.3** - Framework de aplicación
- **Java 17** - Lenguaje de programación
- **Spring Data JPA** - Persistencia de datos
- **Maven** - Gestión de dependencias
- **SpringDoc OpenAPI** - Documentación de API

### Herramientas de Desarrollo
- **ESLint** - Linting de código
- **Prettier** - Formateo de código
- **TypeScript** - Verificación de tipos
- **Git** - Control de versiones

## 🏗️ Estructura del Proyecto

```
TaskFlux/
├── frontend/                          # Aplicación React
│   ├── src/
│   │   ├── app/                       # Módulos de la aplicación
│   │   │   ├── collaboration-tools/   # Herramientas de colaboración
│   │   │   ├── context/              # Contextos de React
│   │   │   ├── dashboard-overview/   # Vista general del dashboard
│   │   │   ├── goal-tracking/        # Seguimiento de objetivos
│   │   │   ├── layout/               # Componentes de layout
│   │   │   ├── project-management/   # Gestión de proyectos
│   │   │   ├── task-management/      # Gestión de tareas
│   │   │   ├── team-collaboration/   # Colaboración de equipo
│   │   │   ├── time-management/      # Gestión de tiempo
│   │   │   ├── user-management/      # Gestión de usuarios
│   │   │   └── workspace-management/ # Gestión de espacios
│   │   ├── components/               # Componentes globales
│   │   ├── shared/                   # Código compartido
│   │   │   ├── config/              # Configuraciones
│   │   │   ├── hooks/               # Hooks personalizados
│   │   │   ├── types/               # Tipos TypeScript
│   │   │   ├── ui/                  # Componentes UI reutilizables
│   │   │   └── utils/               # Utilidades
│   │   └── assets/                  # Recursos estáticos
│   ├── public/                      # Archivos públicos
│   └── package.json                 # Dependencias del frontend
├── backend/                         # Aplicación Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/                # Código fuente Java
│   │   │   └── resources/           # Recursos de la aplicación
│   │   └── test/                    # Tests
│   └── pom.xml                      # Dependencias del backend
└── README.md                        # Documentación principal
```

### Arquitectura del Frontend

El frontend sigue una arquitectura modular con separación clara de responsabilidades:

- **Delivery Layer**: Componentes de UI y vistas
- **Interface Adapters**: Adaptadores y contextos
- **Data Layer**: Gestión de datos y tipos
- **Common**: Componentes y utilidades compartidas

## ⚙️ Instalación

### Prerrequisitos

- **Node.js** 18+ 
- **Java** 17+
- **Maven** 3.6+
- **Git**

### Clonar el Repositorio

```bash
git clone https://github.com/MillerMosquera/TaskFlux.git
cd TaskFlux
```

### Configuración del Frontend

```bash
cd frontend
npm install
```

### Configuración del Backend

```bash
cd backend/backend
./mvnw clean install
# O en Windows
mvnw.cmd clean install
```

## 🔧 Configuración

### Variables de Entorno (Frontend)

Crea un archivo `.env` en la carpeta `frontend/`:

```env
VITE_API_URL=http://localhost:8080/api
VITE_APP_NAME=TaskFlux
```

### Configuración del Backend

Configura la base de datos en `backend/backend/src/main/resources/application.properties`:

```properties
# Configuración de la base de datos
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# Configuración JPA
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Puerto del servidor
server.port=8080
```

## 🚀 Uso

### Ejecutar el Desarrollo

#### Frontend
```bash
cd frontend
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`

#### Backend
```bash
cd backend/backend
./mvnw spring-boot:run
# O en Windows
mvnw.cmd spring-boot:run
```
El servidor estará disponible en `http://localhost:8080`

### Scripts Disponibles (Frontend)

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta ESLint
- `npm run lint:fix` - Ejecuta ESLint con auto-fix
- `npm run type-check` - Verifica tipos TypeScript
- `npm run format` - Formatea el código con Prettier

### Funcionalidades Principales

#### 1. Gestión de Espacios de Trabajo
- Crear y administrar espacios de trabajo
- Organizar proyectos por temáticas
- Gestión de miembros del espacio

#### 2. Administración de Proyectos
- **Vista de Lista**: Tabla detallada con filtros y ordenamiento
- **Vista de Tablero**: Cards visuales con información resumida
- Seguimiento de progreso y estadísticas
- Gestión de archivos y documentos

#### 3. Sistema de Tareas
- Crear, editar y eliminar tareas
- Estados: Pendiente, En Progreso, Completada
- Asignación de prioridades y fechas límite
- Seguimiento de progreso

#### 4. Colaboración
- Invitar miembros a proyectos
- Roles y permisos diferenciados
- Actividad reciente y notificaciones

#### 5. Gestión de Tiempo
- Calendario integrado
- Fechas de entrega y plazos
- Seguimiento de tiempo dedicado

## 📚 Componentes UI Principales

### Layouts
- **Dashboard**: Layout principal con sidebar
- **Header**: Barra de navegación superior
- **Sidebar**: Navegación lateral

### Project Management
- **ProjectViewContainer**: Contenedor de vistas de proyecto
- **ProjectListView**: Vista de lista de proyectos
- **ProjectBoardView**: Vista de tablero de proyectos
- **ProjectView**: Vista detallada de proyecto individual

## 🔗 API Documentation

El backend incluye documentación automática de la API con SpringDoc OpenAPI.

Una vez que el servidor esté ejecutándose, puedes acceder a:
- **Swagger UI**: `http://localhost:8080/swagger-ui.html`
- **OpenAPI JSON**: `http://localhost:8080/v3/api-docs`

## 🏗️ Build y Deployment

### Build del Frontend
```bash
cd frontend
npm run build
```
Los archivos de producción se generarán en `frontend/dist/`

### Build del Backend
```bash
cd backend/backend
./mvnw clean package
```
El JAR ejecutable se generará en `backend/backend/target/`

### Docker (Próximamente)
Se planea agregar soporte para Docker para facilitar el deployment.

## 🤝 Contribución

Las contribuciones son bienvenidas:

1. Fork el proyecto
2. Crea una branch para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Estándares de Código

- Usa TypeScript para el frontend
- Sigue las convenciones de ESLint configuradas
- Escribe tests para nuevas funcionalidades
- Documenta las funciones complejas

## 🧪 Testing

### Frontend
```bash
cd frontend
npm run test
```

### Backend
```bash
cd backend/backend
./mvnw test
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

*Última actualización: Agosto 2025*
