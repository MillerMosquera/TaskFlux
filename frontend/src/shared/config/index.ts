// Constantes de la aplicación
export const APP_CONFIG = {
  name: 'TaskFlux',
  version: '1.0.0',
  description: 'Sistema de gestión de tareas y proyectos',
} as const

// Constantes de UI
export const UI_CONSTANTS = {
  ANIMATION_DURATION: 300,
  DEBOUNCE_TIME: 300,
  PAGINATION_SIZE: 20,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  TOAST_DURATION: 5000,
} as const

// Constantes de fecha
export const DATE_FORMATS = {
  DISPLAY: 'dd/MM/yyyy',
  DISPLAY_WITH_TIME: 'dd/MM/yyyy HH:mm',
  API: 'yyyy-MM-dd',
  ISO: 'yyyy-MM-dd\'T\'HH:mm:ss.SSSxxx',
} as const

// Estados de tareas
export const TASK_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'en-progreso',
  REVIEW: 'revisión',
  DONE: 'hecho',
} as const

// Prioridades de tareas
export const TASK_PRIORITY = {
  LOW: 'bajo',
  MEDIUM: 'medio',
  HIGH: 'alto',
  URGENT: 'urgente',
} as const

// Estados de objetivos
export const GOAL_STATUS = {
  NOT_STARTED: 'no-iniciado',
  IN_PROGRESS: 'en-progreso',
  COMPLETED: 'completado',
  ON_HOLD: 'en-espera',
} as const

// Roles de usuario
export const USER_ROLES = {
  ADMIN: 'administrador',
  MEMBER: 'miembro',
  VIEWER: 'espectador',
} as const

// NOTA: Para configuración de colores, usar config/ui-config.ts
// Esto evita duplicación y centraliza la configuración visual

// Mensajes de validación
export const VALIDATION_MESSAGES = {
  REQUIRED: 'Este campo es requerido',
  MIN_LENGTH: (min: number) => `Debe tener al menos ${min} caracteres`,
  MAX_LENGTH: (max: number) => `No puede exceder ${max} caracteres`,
  INVALID_EMAIL: 'Email inválido',
  INVALID_DATE: 'Fecha inválida',
  FILE_TOO_LARGE: `El archivo es demasiado grande. Máximo ${UI_CONSTANTS.MAX_FILE_SIZE / (1024 * 1024)}MB`,
} as const

// Configuración de animaciones
export const ANIMATION_PRESETS = {
  FADE_IN: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  SLIDE_UP: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  SLIDE_IN_LEFT: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  SCALE_IN: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  STAGGER_CONTAINER: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
} as const

// Configuración de transiciones
export const TRANSITION_PRESETS = {
  SPRING: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 24,
  },
  SMOOTH: {
    type: 'tween' as const,
    duration: 0.3,
    ease: 'easeInOut' as const,
  },
  BOUNCY: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 10,
  },
} as const
