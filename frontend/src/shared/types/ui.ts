// =================================================================
// TIPOS DE INTERFAZ DE USUARIO - TASKFLUX
// =================================================================
// Tipos específicos para la UI que extienden las entidades de base de datos
// con propiedades de presentación como colores, estados visuales, etc.

import type {
    Folder,
    Goal,
    GoalStatus,
    List,
    Space,
    Tag,
    Task,
    TaskPriority,
    TaskStatus,
    User
} from './database'

// =================================================================
// TIPOS DE COLORES Y TEMAS
// =================================================================

export type ColorVariant = 
    | "bg-red-500" 
    | "bg-green-500" 
    | "bg-blue-500" 
    | "bg-yellow-500" 
    | "bg-purple-500" 
    | "bg-orange-500" 
    | "bg-pink-500" 
    | "bg-indigo-500" 
    | "bg-teal-500" 
    | "bg-gray-500"

export type StatusColor = {
    [K in TaskStatus]: string
}

export type PriorityColor = {
    [K in TaskPriority]: string
}

export type GoalStatusColor = {
    [K in GoalStatus]: string
}

// =================================================================
// ENTIDADES CON PROPIEDADES DE UI
// =================================================================

// Espacio con propiedades de UI
export interface UISpace extends Space {
    color: ColorVariant
    members: string[] // IDs de usuarios
    folders: UIFolder[]
}

// Carpeta con propiedades de UI
export interface UIFolder extends Folder {
    lists: UIList[]
}

// Lista con propiedades de UI
export interface UIList extends List {
    color: ColorVariant
}

// Tarea con propiedades de UI
export interface UITask extends Task {
    // Las tareas no necesitan propiedades adicionales de UI
    // Los colores se manejan por status/priority
}

// Meta con propiedades de UI
export interface UIGoal extends Goal {
    targets: UIGoalTarget[]
}

// Target de meta con propiedades de UI
export interface UIGoalTarget {
    id: string
    title: string
    completed: boolean
    dueDate?: string
}

// Etiqueta con validación de color
export interface UITag extends Tag {
    color: string // Hex color code validado
}

// =================================================================
// TIPOS PARA ESTADOS DE LA APLICACIÓN
// =================================================================

export type CurrentView = 
    | "inicio" 
    | "calendario" 
    | "metas" 
    | "equipo" 
    | "proyectos"
    | "tareas"

export interface AppFilters {
    status?: TaskStatus[]
    priority?: TaskPriority[]
    assignee?: string[]
    tags?: string[]
    dateRange?: {
        start?: string
        end?: string
    }
}

export interface AppState {
    // Datos de entidades (sin propiedades de UI)
    users: User[]
    spaces: UISpace[]
    goals: UIGoal[]
    tasks: UITask[]
    tags: UITag[]
    
    // Estado de navegación y UI
    currentUserId: string
    currentSpace: string
    currentView: CurrentView
    filters: AppFilters
}

// =================================================================
// TIPOS PARA ACCIONES DE LA APLICACIÓN
// =================================================================

export type AppAction =
    // Acciones de navegación
    | { type: "SET_CURRENT_SPACE"; payload: string }
    | { type: "SET_CURRENT_VIEW"; payload: CurrentView }
    | { type: "SET_FILTERS"; payload: Partial<AppFilters> }
    
    // Acciones de espacios
    | { type: "ADD_SPACE"; payload: Omit<UISpace, "id" | "createdAt"> }
    | { type: "UPDATE_SPACE"; payload: { id: string; updates: Partial<UISpace> } }
    | { type: "DELETE_SPACE"; payload: string }
    
    // Acciones de carpetas y listas
    | { type: "ADD_FOLDER"; payload: Omit<UIFolder, "id" | "createdAt" | "position"> }
    | { type: "ADD_LIST"; payload: Omit<UIList, "id" | "createdAt" | "taskCount" | "position"> }
    
    // Acciones de tareas
    | { type: "ADD_TASK"; payload: Omit<UITask, "id" | "createdAt" | "updatedAt"> }
    | { type: "UPDATE_TASK"; payload: { id: string; updates: Partial<UITask> } }
    | { type: "DELETE_TASK"; payload: string }
    | { type: "REORDER_TASKS"; payload: { sourceStatus: string; destinationStatus: string; taskId: string } }
    
    // Acciones de metas
    | { type: "ADD_GOAL"; payload: Omit<UIGoal, "id" | "createdAt" | "updatedAt"> }
    | { type: "UPDATE_GOAL"; payload: { id: string; updates: Partial<UIGoal> } }
    | { type: "DELETE_GOAL"; payload: string }
    
    // Acciones de etiquetas
    | { type: "CREATE_TAG"; payload: Omit<UITag, "id" | "createdAt" | "usageCount"> }
    | { type: "UPDATE_TAG"; payload: { id: string; updates: Partial<UITag> } }
    | { type: "DELETE_TAG"; payload: string }
    
    // Acciones de usuarios
    | { type: "ADD_USER"; payload: Omit<User, "id"> }

// =================================================================
// TIPOS PARA COMPONENTES
// =================================================================

export interface TaskCardProps {
    task: UITask
    showAssignee?: boolean
    showDueDate?: boolean
    showTags?: boolean
    showProgress?: boolean
    compact?: boolean
}

export interface GoalCardProps {
    goal: UIGoal
    showProgress?: boolean
    showTargets?: boolean
    showAssignee?: boolean
}

export interface SpaceCardProps {
    space: UISpace
    showMembers?: boolean
    showStats?: boolean
}

export interface TagBadgeProps {
    tag: UITag
    size?: "sm" | "md" | "lg"
    removable?: boolean
    onRemove?: () => void
}

// =================================================================
// TIPOS PARA HOOKS PERSONALIZADOS
// =================================================================

export interface UseTasksOptions {
    spaceId?: string
    listId?: string
    assigneeId?: string
    status?: TaskStatus[]
    priority?: TaskPriority[]
    tags?: string[]
    includeCompleted?: boolean
}

export interface UseGoalsOptions {
    spaceId?: string
    ownerId?: string
    assigneeId?: string
    status?: GoalStatus[]
    includeCompleted?: boolean
}

export interface UseSpaceStatsResult {
    totalTasks: number
    completedTasks: number
    inProgressTasks: number
    overdueTasks: number
    totalGoals: number
    completedGoals: number
    activeMembers: number
}

export interface UseUserStatsResult {
    assignedTasks: number
    completedTasks: number
    overdueTasks: number
    totalTimeSpent: number
    goalsOwned: number
    goalsAssigned: number
}
