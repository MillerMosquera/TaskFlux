// =================================================================
// TIPOS DE BASE DE DATOS - TASKFLUX
// =================================================================
// Entidades que reflejan exactamente la estructura de la base de datos
// Sin incluir lógica de UI o colores

// =================================================================
// TIPOS ENUM PARA LA BASE DE DATOS
// =================================================================

export type TaskStatus = "todo" | "en-progreso" | "revisión" | "hecho"
export type TaskPriority = "bajo" | "medio" | "alto" | "urgente"
export type UserStatus = "activo" | "inactivo"
export type UserRole = "administrador" | "miembro" | "espectador"
export type ProficiencyLevel = "beginner" | "intermediate" | "advanced" | "expert"
export type NotificationType = "task_asignada" | "task_completado" | "comentario_agregado" | "se_acerca_fecha_limite" | "mencion"
export type GoalStatus = "no-iniciado" | "en-progreso" | "completado" | "en-espera"
export type ThemeType = "light" | "dark" | "system"
export type TimeFormat = "12h" | "24h"
export type EntityType = "task" | "comment" | "user" | "space" | "goal"
export type ChangeType = "status" | "assignee" | "priority" | "title" | "description" | "schedule"
export type DependencyType = "finish-to-start" | "start-to-start" | "finish-to-finish" | "start-to-finish"

// =================================================================
// ENTIDADES DE BASE DE DATOS - SOLO DATOS
// =================================================================

// Usuario básico
export interface User {
    id: string
    email: string
    name: string
    initials: string
    avatar?: string
    status: UserStatus
    createdAt: string
    updatedAt: string
}

// Perfil de usuario
export interface UserProfile {
    id: string
    userId: string
    bio?: string
    timezone: string
    location: string
    phone: string
    department: string
    jobTitle: string
    joinedAt: string
    updatedAt: string
}

// Habilidades de usuario
export interface UserSkill {
    id: string
    userId: string
    skillName: string
    level: ProficiencyLevel
    verified: boolean
    addedAt: string
}

// Roles de usuario por espacio
export interface UserRoleEntity {
    id: string
    userId: string
    spaceId: string
    role: UserRole
    assignedAt: string
    assignedBy: string
}

// Configuraciones de usuario
export interface UserSettings {
    id: string
    userId: string
    theme: ThemeType
    language: string
    emailNotifications: boolean
    pushNotifications: boolean
    weekStartsOn: number
    dateFormat: string
    timeFormat: TimeFormat
    updatedAt: string
}

// Espacio de trabajo
export interface Space {
    id: string
    name: string
    description?: string
    createdAt: string
    updatedAt: string
    createdBy: string
}

// Carpeta
export interface Folder {
    id: string
    name: string
    spaceId: string
    position: number
    createdAt: string
}

// Lista
export interface List {
    id: string
    name: string
    folderId: string
    position: number
    taskCount: number
    createdAt: string
    updatedAt: string
}

// Meta/Objetivo
export interface Goal {
    id: string
    title: string
    description?: string
    progress: number
    dueDate?: string
    status: GoalStatus
    ownerId: string
    spaceId: string
    completed: boolean
    assigneeId?: string
    createdAt: string
    updatedAt: string
}

// Target de meta
export interface GoalTarget {
    id: string
    goalId: string
    title: string
    completed: boolean
    dueDate?: string
    createdAt: string
}

// Tarea básica
export interface Task {
    id: string
    title: string
    description?: string
    status: TaskStatus
    priority: TaskPriority
    listId: string
    assigneeId?: string
    createdBy: string
    completed: boolean
    createdAt: string
    updatedAt: string
}

// Cronograma de tarea
export interface TaskSchedule {
    id: string
    taskId: string
    startDate?: string
    dueDate?: string
    estimatedTime?: number
    actualTime?: number
    updatedAt: string
}

// Etiqueta
export interface Tag {
    id: string
    name: string
    color: string
    spaceId: string
    createdAt: string
    usageCount: number
}

// Relación tarea-etiqueta
export interface TaskTag {
    id: string
    taskId: string
    tagId: string
    addedAt: string
}

// Comentario de tarea
export interface TaskComment {
    id: string
    taskId: string
    text: string
    authorId: string
    parentCommentId?: string
    createdAt: string
    updatedAt?: string
    isEdited: boolean
}

// Mención en comentario
export interface CommentMention {
    id: string
    commentId: string
    mentionedUserId: string
    createdAt: string
}

// Archivo adjunto
export interface TaskAttachment {
    id: string
    taskId: string
    name: string
    url: string
    type: string
    size: number
    uploadedBy: string
    uploadedAt: string
}

// Subtarea
export interface Subtask {
    id: string
    parentTaskId: string
    title: string
    completed: boolean
    assigneeId?: string
    createdAt: string
    updatedAt: string
    position: number
}

// Entrada de tiempo
export interface TimeEntry {
    id: string
    taskId: string
    userId: string
    startTime: string
    endTime?: string
    duration?: number
    description?: string
    isManual: boolean
    createdAt: string
}

// Historial de tarea
export interface TaskHistory {
    id: string
    taskId: string
    changedBy: string
    changeType: ChangeType
    oldValue?: string
    newValue?: string
    changeDescription: string
    changedAt: string
}

// Dependencia de tarea
export interface TaskDependency {
    id: string
    predecessorTaskId: string
    successorTaskId: string
    dependencyType: DependencyType
    createdAt: string
    createdBy: string
}

// Notificación
export interface Notification {
    id: string
    type: NotificationType
    title: string
    message: string
    userId: string
    read: boolean
    readAt?: string
    createdAt: string
    expiresAt?: string
}

// Referencia de notificación
export interface NotificationReference {
    id: string
    notificationId: string
    entityType: EntityType
    entityId: string
    actionUrl?: string
}

// =================================================================
// TIPOS COMPUESTOS PARA CONSULTAS COMPLEJAS
// =================================================================

// Usuario con detalles completos
export interface UserWithDetails {
    user: User
    profile?: UserProfile
    skills: UserSkill[]
    roles: UserRoleEntity[]
    settings?: UserSettings
}

// Tarea con detalles completos
export interface TaskWithDetails {
    task: Task
    schedule?: TaskSchedule
    tags: (TaskTag & { tag: Tag })[]
    comments: (TaskComment & { author: User })[]
    attachments: TaskAttachment[]
    subtasks: Subtask[]
    timeEntries: TimeEntry[]
    dependencies: {
        predecessors: (TaskDependency & { predecessor: Task })[]
        successors: (TaskDependency & { successor: Task })[]
    }
}

// Espacio con estructura completa
export interface SpaceWithStructure {
    space: Space
    folders: (Folder & {
        lists: (List & {
            tasks: Task[]
        })[]
    })[]
    members: UserRoleEntity[]
    tags: Tag[]
    goals: Goal[]
}

// Meta con targets
export interface GoalWithTargets {
    goal: Goal
    targets: GoalTarget[]
    owner: User
    assignee?: User
}

// Comentario con autor y menciones
export interface CommentWithDetails {
    comment: TaskComment
    author: User
    mentions: (CommentMention & { mentionedUser: User })[]
    replies?: CommentWithDetails[]
}

// =================================================================
// TIPOS PARA OPERACIONES DE BASE DE DATOS
// =================================================================

// Tipos para crear entidades (sin campos generados)
export type CreateUser = Omit<User, "id" | "createdAt" | "updatedAt">
export type CreateUserProfile = Omit<UserProfile, "id" | "joinedAt" | "updatedAt">
export type CreateUserSkill = Omit<UserSkill, "id" | "addedAt">
export type CreateUserRole = Omit<UserRoleEntity, "id" | "assignedAt">
export type CreateUserSettings = Omit<UserSettings, "id" | "updatedAt">
export type CreateSpace = Omit<Space, "id" | "createdAt" | "updatedAt">
export type CreateFolder = Omit<Folder, "id" | "createdAt">
export type CreateList = Omit<List, "id" | "createdAt" | "updatedAt" | "taskCount">
export type CreateGoal = Omit<Goal, "id" | "createdAt" | "updatedAt">
export type CreateGoalTarget = Omit<GoalTarget, "id" | "createdAt">
export type CreateTask = Omit<Task, "id" | "createdAt" | "updatedAt">
export type CreateTaskSchedule = Omit<TaskSchedule, "id" | "updatedAt">
export type CreateTag = Omit<Tag, "id" | "createdAt" | "usageCount">
export type CreateTaskTag = Omit<TaskTag, "id" | "addedAt">
export type CreateTaskComment = Omit<TaskComment, "id" | "createdAt" | "updatedAt" | "isEdited">
export type CreateCommentMention = Omit<CommentMention, "id" | "createdAt">
export type CreateTaskAttachment = Omit<TaskAttachment, "id" | "uploadedAt">
export type CreateSubtask = Omit<Subtask, "id" | "createdAt" | "updatedAt">
export type CreateTimeEntry = Omit<TimeEntry, "id" | "createdAt">
export type CreateTaskHistory = Omit<TaskHistory, "id" | "changedAt">
export type CreateTaskDependency = Omit<TaskDependency, "id" | "createdAt">
export type CreateNotification = Omit<Notification, "id" | "createdAt">
export type CreateNotificationReference = Omit<NotificationReference, "id">

// Tipos para actualizar entidades
export type UpdateUser = Partial<Omit<User, "id" | "createdAt" | "updatedAt">>
export type UpdateUserProfile = Partial<Omit<UserProfile, "id" | "userId" | "joinedAt" | "updatedAt">>
export type UpdateUserSettings = Partial<Omit<UserSettings, "id" | "userId" | "updatedAt">>
export type UpdateSpace = Partial<Omit<Space, "id" | "createdBy" | "createdAt" | "updatedAt">>
export type UpdateList = Partial<Omit<List, "id" | "folderId" | "createdAt" | "updatedAt">>
export type UpdateGoal = Partial<Omit<Goal, "id" | "createdAt" | "updatedAt">>
export type UpdateTask = Partial<Omit<Task, "id" | "createdBy" | "createdAt" | "updatedAt">>
export type UpdateTaskSchedule = Partial<Omit<TaskSchedule, "id" | "taskId" | "updatedAt">>
export type UpdateTag = Partial<Omit<Tag, "id" | "spaceId" | "createdAt">>
export type UpdateTaskComment = Partial<Omit<TaskComment, "id" | "taskId" | "authorId" | "createdAt">>
export type UpdateSubtask = Partial<Omit<Subtask, "id" | "parentTaskId" | "createdAt" | "updatedAt">>
export type UpdateTimeEntry = Partial<Omit<TimeEntry, "id" | "taskId" | "userId" | "createdAt">>
export type UpdateNotification = Partial<Omit<Notification, "id" | "userId" | "createdAt">>
