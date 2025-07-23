import React, { createContext, ReactNode, useContext, useReducer } from "react"

// Importar tipos de base de datos (sin UI)
import type {
    CommentMention,
    CreateNotification,
    CreateSubtask,
    CreateTag,
    CreateTask,
    CreateTaskAttachment,
    CreateTaskComment,
    CreateTaskTag,
    CreateTimeEntry,
    Notification,
    NotificationReference,
    Subtask,
    Tag,
    Task,
    TaskAttachment,
    TaskComment,
    TaskSchedule,
    TaskTag,
    TimeEntry,
    UpdateSubtask,
    UpdateTag,
    UpdateTask,
    UpdateTaskComment,
    UpdateTaskSchedule,
    User,
    UserProfile,
    UserRoleEntity,
    UserSettings,
    UserSkill,
} from "@/shared/types/database"

// Importar tipos de UI
import type {
    AppFilters,
    ColorVariant,
    CurrentView,
    UIFolder,
    UIGoal,
    UIList,
    UISpace
} from "@/shared/types/ui"

// =================================================================
// ESTADO DE LA APLICACIÓN REFACTORIZADO
// =================================================================

interface AppDataState {
    // Entidades de usuario
    users: User[]
    userProfiles: UserProfile[]
    userRoles: UserRoleEntity[]
    userSettings: UserSettings[]
    userSkills: UserSkill[]
    
    // Entidades de tareas
    tasks: Task[]
    taskSchedules: TaskSchedule[]
    tags: Tag[]
    taskTags: TaskTag[]
    taskComments: TaskComment[]
    commentMentions: CommentMention[]
    taskAttachments: TaskAttachment[]
    subtasks: Subtask[]
    timeEntries: TimeEntry[]
    
    // Entidades de notificaciones
    notifications: Notification[]
    notificationReferences: NotificationReference[]
    
    // Entidades de espacios y metas (con propiedades de UI)
    spaces: UISpace[]
    goals: UIGoal[]
    
    // Estado de navegación
    currentUserId: string
    currentSpace: string
    currentView: CurrentView
    filters: AppFilters
}

// =================================================================
// ACCIONES DE LA APLICACIÓN REFACTORIZADAS
// =================================================================

type AppDataAction =
    // Acciones de usuario
    | { type: "UPDATE_USER"; payload: { id: string; updates: Partial<User> } }
    | { type: "UPDATE_USER_PROFILE"; payload: { userId: string; updates: Partial<UserProfile> } }
    | { type: "ADD_USER_SKILL"; payload: Omit<UserSkill, "id" | "addedAt"> }
    | { type: "REMOVE_USER_SKILL"; payload: string }
    | { type: "UPDATE_USER_ROLE"; payload: { userId: string; spaceId: string; role: UserRoleEntity["role"] } }
    | { type: "UPDATE_USER_SETTINGS"; payload: { userId: string; updates: Partial<UserSettings> } }
    
    // Acciones de tareas
    | { type: "ADD_TASK"; payload: CreateTask }
    | { type: "UPDATE_TASK"; payload: { id: string; updates: UpdateTask } }
    | { type: "DELETE_TASK"; payload: string }
    | { type: "UPDATE_TASK_SCHEDULE"; payload: { taskId: string; updates: UpdateTaskSchedule } }
    | { type: "ADD_TASK_TAG"; payload: CreateTaskTag }
    | { type: "REMOVE_TASK_TAG"; payload: { taskId: string; tagId: string } }
    | { type: "ADD_TASK_COMMENT"; payload: CreateTaskComment }
    | { type: "UPDATE_TASK_COMMENT"; payload: { id: string; updates: UpdateTaskComment } }
    | { type: "DELETE_TASK_COMMENT"; payload: string }
    | { type: "ADD_TASK_ATTACHMENT"; payload: CreateTaskAttachment }
    | { type: "REMOVE_TASK_ATTACHMENT"; payload: string }
    | { type: "ADD_SUBTASK"; payload: CreateSubtask }
    | { type: "UPDATE_SUBTASK"; payload: { id: string; updates: UpdateSubtask } }
    | { type: "DELETE_SUBTASK"; payload: string }
    | { type: "ADD_TIME_ENTRY"; payload: CreateTimeEntry }
    
    // Acciones de etiquetas
    | { type: "CREATE_TAG"; payload: CreateTag }
    | { type: "UPDATE_TAG"; payload: { id: string; updates: UpdateTag } }
    | { type: "DELETE_TAG"; payload: string }
    
    // Acciones de espacios
    | { type: "ADD_SPACE"; payload: Omit<UISpace, "id" | "createdAt"> }
    | { type: "UPDATE_SPACE"; payload: { id: string; updates: Partial<UISpace> } }
    | { type: "DELETE_SPACE"; payload: string }
    
    // Acciones de carpetas y listas  
    | { type: "ADD_FOLDER"; payload: Omit<UIFolder, "id" | "createdAt" | "position"> }
    | { type: "ADD_LIST"; payload: Omit<UIList, "id" | "createdAt" | "taskCount" | "position"> }
    
    // Acciones de metas
    | { type: "ADD_GOAL"; payload: Omit<UIGoal, "id" | "createdAt" | "updatedAt"> }
    | { type: "UPDATE_GOAL"; payload: { id: string; updates: Partial<UIGoal> } }
    | { type: "DELETE_GOAL"; payload: string }
    
    // Acciones de notificaciones
    | { type: "ADD_NOTIFICATION"; payload: CreateNotification }
    | { type: "MARK_NOTIFICATION_READ"; payload: string }
    
    // Acciones de navegación
    | { type: "SET_CURRENT_SPACE"; payload: string }
    | { type: "SET_CURRENT_VIEW"; payload: CurrentView }
    | { type: "SET_FILTERS"; payload: Partial<AppFilters> }
    | { type: "REORDER_TASKS"; payload: { sourceStatus: string; destinationStatus: string; taskId: string } }
    
    // Acciones generales
    | { type: "ADD_USER"; payload: Omit<User, "id"> }

// =================================================================
// ESTADO INICIAL CON DATOS DE MUESTRA
// =================================================================

const initialState: AppDataState = {
    users: [
        {
            id: "user-1",
            name: "John Doe",
            email: "john@company.com",
            initials: "JD",
            status: "activo",
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z",
        },
        {
            id: "user-2",
            name: "Alice Johnson",
            email: "alice@company.com",
            initials: "AJ",
            status: "activo",
            createdAt: "2024-01-02T00:00:00Z",
            updatedAt: "2024-01-02T00:00:00Z",
        },
        {
            id: "user-3",
            name: "Bob Smith",
            email: "bob@company.com",
            initials: "BS",
            status: "activo",
            createdAt: "2024-01-03T00:00:00Z",
            updatedAt: "2024-01-03T00:00:00Z",
        },
    ],
    userProfiles: [
        {
            id: "profile-1",
            userId: "user-1",
            bio: "Administrador del sistema con experiencia en gestión de proyectos",
            timezone: "America/New_York",
            location: "New York, USA",
            phone: "+1-555-0123",
            department: "Technology",
            jobTitle: "Project Manager",
            joinedAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z",
        },
    ],
    userRoles: [
        {
            id: "role-1",
            userId: "user-1",
            spaceId: "space-1",
            role: "administrador",
            assignedAt: "2024-01-01T00:00:00Z",
            assignedBy: "user-1",
        },
        {
            id: "role-2",
            userId: "user-2",
            spaceId: "space-1",
            role: "miembro",
            assignedAt: "2024-01-02T00:00:00Z",
            assignedBy: "user-1",
        },
        {
            id: "role-3",
            userId: "user-3",
            spaceId: "space-1",
            role: "espectador",
            assignedAt: "2024-01-03T00:00:00Z",
            assignedBy: "user-1",
        },
    ],
    userSettings: [
        {
            id: "settings-1",
            userId: "user-1",
            theme: "system",
            language: "es",
            emailNotifications: true,
            pushNotifications: true,
            weekStartsOn: 1,
            dateFormat: "dd/MM/yyyy",
            timeFormat: "24h",
            updatedAt: "2024-01-01T00:00:00Z",
        },
    ],
    userSkills: [
        {
            id: "skill-1",
            userId: "user-1",
            skillName: "Project Management",
            level: "expert",
            verified: true,
            addedAt: "2024-01-01T00:00:00Z",
        },
    ],
    tasks: [
        {
            id: "task-1",
            title: "Design new landing page",
            description: "Create a modern, responsive landing page design with improved UX",
            status: "todo",
            priority: "alto",
            assigneeId: "user-2",
            createdBy: "user-1",
            listId: "list-1",
            completed: false,
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z",
        },
    ],
    taskSchedules: [],
    tags: [
        {
            id: "tag-1",
            name: "Design",
            color: "#3B82F6",
            spaceId: "space-1",
            createdAt: "2024-01-01T00:00:00Z",
            usageCount: 1,
        },
    ],
    taskTags: [],
    taskComments: [],
    commentMentions: [],
    taskAttachments: [],
    subtasks: [],
    timeEntries: [],
    notifications: [],
    notificationReferences: [],
    spaces: [
        {
            id: "space-1",
            name: "Work Space",
            description: "Main workspace for company projects",
            color: "bg-blue-500" as ColorVariant,
            members: ["user-1", "user-2", "user-3"],
            createdAt: "2024-01-01T00:00:00Z",
            createdBy: "user-1",
            updatedAt: "2024-01-01T00:00:00Z",
            folders: [
                {
                    id: "folder-1",
                    name: "Development",
                    spaceId: "space-1",
                    createdAt: "2024-01-01T00:00:00Z",
                    position: 0,
                    lists: [
                        {
                            id: "list-1",
                            name: "Frontend",
                            folderId: "folder-1",
                            taskCount: 1,
                            createdAt: "2024-01-01T00:00:00Z",
                            updatedAt: "2024-01-01T00:00:00Z",
                            position: 0,
                            color: "bg-purple-500" as ColorVariant,
                        },
                    ],
                },
            ],
        },
    ],
    goals: [
        {
            id: "goal-1",
            title: "Complete Q1 Product Launch",
            description: "Launch the new product features and reach 1000 users",
            progress: 75,
            dueDate: "2024-03-31",
            status: "en-progreso",
            ownerId: "user-1",
            spaceId: "space-1",
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-15T00:00:00Z",
            targets: [
                { id: "target-1", title: "Complete MVP", completed: true, dueDate: "2024-02-15" },
                { id: "target-2", title: "Beta testing", completed: false, dueDate: "2024-03-01" },
            ],
            completed: false,
            assigneeId: "user-1",
        },
    ],
    currentUserId: "user-1",
    currentSpace: "space-1",
    currentView: "inicio",
    filters: {},
}

// =================================================================
// REDUCER DE LA APLICACIÓN REFACTORIZADO
// =================================================================

function appReducer(state: AppDataState, action: AppDataAction): AppDataState {
    switch (action.type) {
        // Acciones de navegación
        case "SET_CURRENT_SPACE":
            return { ...state, currentSpace: action.payload }
            
        case "SET_CURRENT_VIEW":
            return { ...state, currentView: action.payload }
            
        case "SET_FILTERS":
            return { ...state, filters: { ...state.filters, ...action.payload } }
            
        // Acciones de tareas
        case "ADD_TASK":
            const newTask: Task = {
                ...action.payload,
                id: `task-${Date.now()}`,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }
            return { ...state, tasks: [...state.tasks, newTask] }
            
        case "UPDATE_TASK":
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload.id
                        ? { ...task, ...action.payload.updates, updatedAt: new Date().toISOString() }
                        : task
                )
            }
            
        case "DELETE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            }
            
        // Acciones de espacios
        case "ADD_SPACE":
            const newSpace: UISpace = {
                ...action.payload,
                id: `space-${Date.now()}`,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }
            return { ...state, spaces: [...state.spaces, newSpace] }
            
        case "UPDATE_SPACE":
            return {
                ...state,
                spaces: state.spaces.map(space =>
                    space.id === action.payload.id
                        ? { ...space, ...action.payload.updates, updatedAt: new Date().toISOString() }
                        : space
                )
            }
            
        // Acciones de metas
        case "ADD_GOAL":
            const newGoal: UIGoal = {
                ...action.payload,
                id: `goal-${Date.now()}`,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }
            return { ...state, goals: [...state.goals, newGoal] }
            
        case "UPDATE_GOAL":
            return {
                ...state,
                goals: state.goals.map(goal =>
                    goal.id === action.payload.id
                        ? { ...goal, ...action.payload.updates, updatedAt: new Date().toISOString() }
                        : goal
                )
            }
            
        // Acciones de etiquetas
        case "CREATE_TAG":
            const newTag: Tag = {
                ...action.payload,
                id: `tag-${Date.now()}`,
                createdAt: new Date().toISOString(),
                usageCount: 0,
            }
            return { ...state, tags: [...state.tags, newTag] }
            
        // Acciones de usuarios
        case "ADD_USER":
            const newUser: User = {
                ...action.payload,
                id: `user-${Date.now()}`,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }
            return { ...state, users: [...state.users, newUser] }
            
        default:
            return state
    }
}

// =================================================================
// CONTEXTO Y PROVIDER
// =================================================================

const AppContext = createContext<{
    state: AppDataState
    dispatch: React.Dispatch<AppDataAction>
} | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(appReducer, initialState)

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}

export function useApp() {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error("useApp must be used within an AppProvider")
    }
    return context
}

// =================================================================
// HOOKS PERSONALIZADOS REFACTORIZADOS
// =================================================================

// Hook para obtener usuario completo
export const useUserWithDetails = (userId: string) => {
    const { state } = useApp()
    const user = state.users.find(u => u.id === userId)
    const profile = state.userProfiles.find(p => p.userId === userId)
    const roles = state.userRoles.filter(r => r.userId === userId)
    const settings = state.userSettings.find(s => s.userId === userId)
    const skills = state.userSkills.filter(s => s.userId === userId)
    
    return user ? { user, profile, roles, settings, skills } : null
}

// Hook para obtener usuario básico
export const useUserBasic = (userId: string) => {
    const { state } = useApp()
    return state.users.find(u => u.id === userId)
}

// Hook para obtener perfil de usuario
export const useUserProfile = (userId: string) => {
    const { state } = useApp()
    return state.userProfiles.find(p => p.userId === userId)
}

// Hook para obtener habilidades de usuario
export const useUserSkills = (userId: string) => {
    const { state } = useApp()
    return state.userSkills.filter(s => s.userId === userId)
}

// Hook para obtener rol de usuario en un espacio
export const useUserRoleInSpace = (userId: string, spaceId: string) => {
    const { state } = useApp()
    return state.userRoles.find(r => r.userId === userId && r.spaceId === spaceId)
}

// Hook para obtener configuraciones de usuario
export const useUserSettings = (userId: string) => {
    const { state } = useApp()
    return state.userSettings.find(s => s.userId === userId)
}

// Hook para obtener todas las tareas
export const useTasksBasic = () => {
    const { state } = useApp()
    return state.tasks
}

// Hook para obtener usuario actual
export const useCurrentUser = () => {
    const { state } = useApp()
    return state.users.find(u => u.id === state.currentUserId)
}

// Hook para obtener todos los usuarios
export const useAllUsers = () => {
    const { state } = useApp()
    return state.users
}

// Hook para obtener estadísticas de usuario
export const useUserStats = (userId: string) => {
    const { state } = useApp()
    const userTasks = state.tasks.filter(t => t.assigneeId === userId)
    const completedTasks = userTasks.filter(t => t.completed).length
    const totalTasks = userTasks.length
    
    return {
        totalTasks,
        completedTasks,
        inProgressTasks: userTasks.filter(t => t.status === "en-progreso").length,
        pendingTasks: totalTasks - completedTasks,
    }
}

// Hook para obtener estadísticas del equipo
export const useTeamStats = () => {
    const { state } = useApp()
    const totalTasks = state.tasks.length
    const completedTasks = state.tasks.filter(t => t.completed).length
    
    return {
        totalTasks,
        completedTasks,
        activeUsers: state.users.filter(u => u.status === "activo").length,
        totalSpaces: state.spaces.length,
        totalGoals: state.goals.length,
        completedGoals: state.goals.filter(g => g.completed).length,
    }
}

// Exportar tipos principales para uso en otros archivos
export type { AppDataAction, AppDataState }

