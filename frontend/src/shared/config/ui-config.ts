// =================================================================
// CONFIGURACIÓN DE UI Y COLORES - TASKFLUX
// =================================================================
// Este archivo contiene toda la lógica relacionada con colores, temas
// y configuración visual que anteriormente estaba mezclada con los datos

import type {
    GoalStatus,
    TaskPriority,
    TaskStatus
} from "@/shared/types/database"

import type {
    ColorVariant
} from "@/shared/types/ui"

// =================================================================
// CONFIGURACIÓN DE COLORES POR ESTADO Y PRIORIDAD
// =================================================================

export const STATUS_CONFIG = {
    "todo": {
        color: "#6B7280",
        bgColor: "bg-gray-100",
        textColor: "text-gray-800",
        label: "Por hacer"
    },
    "en-progreso": {
        color: "#3B82F6",
        bgColor: "bg-blue-100", 
        textColor: "text-blue-800",
        label: "En progreso"
    },
    "revisión": {
        color: "#F59E0B",
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-800", 
        label: "En revisión"
    },
    "hecho": {
        color: "#10B981",
        bgColor: "bg-green-100",
        textColor: "text-green-800",
        label: "Completado"
    }
} as const

export const PRIORITY_CONFIG = {
    "bajo": {
        color: "#6B7280",
        bgColor: "bg-gray-100",
        textColor: "text-gray-800",
        label: "Baja",
        order: 1
    },
    "medio": {
        color: "#3B82F6", 
        bgColor: "bg-blue-100",
        textColor: "text-blue-800",
        label: "Media",
        order: 2
    },
    "alto": {
        color: "#F59E0B",
        bgColor: "bg-yellow-100", 
        textColor: "text-yellow-800",
        label: "Alta",
        order: 3
    },
    "urgente": {
        color: "#EF4444",
        bgColor: "bg-red-100",
        textColor: "text-red-800", 
        label: "Urgente",
        order: 4
    }
} as const

export const GOAL_STATUS_CONFIG = {
    "no-iniciado": {
        color: "#6B7280",
        bgColor: "bg-gray-100",
        textColor: "text-gray-800",
        label: "No iniciado"
    },
    "en-progreso": {
        color: "#3B82F6",
        bgColor: "bg-blue-100",
        textColor: "text-blue-800", 
        label: "En progreso"
    },
    "completado": {
        color: "#10B981",
        bgColor: "bg-green-100",
        textColor: "text-green-800",
        label: "Completado"
    },
    "en-espera": {
        color: "#F59E0B",
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-800",
        label: "En espera"
    }
} as const

// =================================================================
// COLORES DISPONIBLES PARA ESPACIOS Y LISTAS
// =================================================================

export const COLOR_PALETTE = {
    "bg-red-500": {
        value: "#EF4444",
        name: "Rojo",
        light: "bg-red-100",
        dark: "bg-red-900"
    },
    "bg-green-500": {
        value: "#10B981", 
        name: "Verde",
        light: "bg-green-100",
        dark: "bg-green-900"
    },
    "bg-blue-500": {
        value: "#3B82F6",
        name: "Azul", 
        light: "bg-blue-100",
        dark: "bg-blue-900"
    },
    "bg-yellow-500": {
        value: "#F59E0B",
        name: "Amarillo",
        light: "bg-yellow-100", 
        dark: "bg-yellow-900"
    },
    "bg-purple-500": {
        value: "#8B5CF6",
        name: "Morado",
        light: "bg-purple-100",
        dark: "bg-purple-900"
    },
    "bg-orange-500": {
        value: "#F97316", 
        name: "Naranja",
        light: "bg-orange-100",
        dark: "bg-orange-900"
    },
    "bg-pink-500": {
        value: "#EC4899",
        name: "Rosa",
        light: "bg-pink-100",
        dark: "bg-pink-900"
    },
    "bg-indigo-500": {
        value: "#6366F1",
        name: "Índigo", 
        light: "bg-indigo-100",
        dark: "bg-indigo-900"
    },
    "bg-teal-500": {
        value: "#14B8A6",
        name: "Verde azulado",
        light: "bg-teal-100",
        dark: "bg-teal-900"
    },
    "bg-gray-500": {
        value: "#6B7280",
        name: "Gris",
        light: "bg-gray-100", 
        dark: "bg-gray-900"
    }
} as const

// =================================================================
// UTILIDADES PARA COLORES
// =================================================================

export const getStatusConfig = (status: TaskStatus) => STATUS_CONFIG[status]
export const getPriorityConfig = (priority: TaskPriority) => PRIORITY_CONFIG[priority]
export const getGoalStatusConfig = (status: GoalStatus) => GOAL_STATUS_CONFIG[status]
export const getColorConfig = (color: ColorVariant) => COLOR_PALETTE[color]

export const isValidColorVariant = (color: string): color is ColorVariant => {
    return color in COLOR_PALETTE
}

export const isValidHexColor = (color: string): boolean => {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)
}

export const getContrastColor = (hexColor: string): string => {
    // Convertir hex a RGB
    const r = parseInt(hexColor.slice(1, 3), 16)
    const g = parseInt(hexColor.slice(3, 5), 16) 
    const b = parseInt(hexColor.slice(5, 7), 16)
    
    // Calcular luminancia
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    
    // Retornar color de contraste
    return luminance > 0.5 ? "#000000" : "#FFFFFF"
}

// =================================================================
// CONFIGURACIÓN DE TEMAS
// =================================================================

export const THEME_CONFIG = {
    light: {
        background: "bg-white",
        surface: "bg-gray-50", 
        primary: "bg-blue-600",
        text: "text-gray-900",
        textSecondary: "text-gray-600",
        border: "border-gray-200"
    },
    dark: {
        background: "bg-gray-900",
        surface: "bg-gray-800",
        primary: "bg-blue-500", 
        text: "text-white",
        textSecondary: "text-gray-300",
        border: "border-gray-700"
    }
} as const

// =================================================================
// CONFIGURACIÓN DE ICONOS POR ESTADO
// =================================================================

export const STATUS_ICONS = {
    "todo": "circle",
    "en-progreso": "clock", 
    "revisión": "eye",
    "hecho": "check-circle"
} as const

export const PRIORITY_ICONS = {
    "bajo": "arrow-down",
    "medio": "minus",
    "alto": "arrow-up", 
    "urgente": "alert-triangle"
} as const

// =================================================================
// CONFIGURACIÓN DE ANIMACIONES
// =================================================================

export const ANIMATIONS = {
    fadeIn: "animate-fadeIn",
    slideUp: "animate-slideUp",
    bounce: "animate-bounce",
    pulse: "animate-pulse",
    spin: "animate-spin"
} as const

// =================================================================
// UTILIDADES PARA UI
// =================================================================

export const generateRandomColor = (): ColorVariant => {
    const colors = Object.keys(COLOR_PALETTE) as ColorVariant[]
    return colors[Math.floor(Math.random() * colors.length)]
}

export const getInitials = (name: string): string => {
    return name
        .split(" ")
        .map(word => word.charAt(0).toUpperCase())
        .join("")
        .slice(0, 2)
}

export const formatDate = (date: string, format: string = "dd/MM/yyyy"): string => {
    const d = new Date(date)
    
    switch (format) {
        case "dd/MM/yyyy":
            return d.toLocaleDateString("es-ES")
        case "MM/dd/yyyy": 
            return d.toLocaleDateString("en-US")
        case "yyyy-MM-dd":
            return d.toISOString().split("T")[0]
        default:
            return d.toLocaleDateString()
    }
}

export const getRelativeTime = (date: string): string => {
    const now = new Date()
    const past = new Date(date)
    const diffMs = now.getTime() - past.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return "Hoy"
    if (diffDays === 1) return "Ayer"
    if (diffDays < 7) return `Hace ${diffDays} días`
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`
    if (diffDays < 365) return `Hace ${Math.floor(diffDays / 30)} meses`
    return `Hace ${Math.floor(diffDays / 365)} años`
}

// =================================================================
// CONSTANTES DE DISEÑO
// =================================================================

export const DESIGN_TOKENS = {
    spacing: {
        xs: "0.25rem",
        sm: "0.5rem", 
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem"
    },
    borderRadius: {
        sm: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem", 
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px"
    },
    fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem", 
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem"
    },
    shadows: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)"
    }
} as const
