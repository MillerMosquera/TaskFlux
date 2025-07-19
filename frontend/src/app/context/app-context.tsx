
import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"

export interface User {
    timezone: string;
    department: string;
    jobTitle: string;
    bio: string;
    location: string;
    phone: string;
    createdAt: any;
    skills: any;
    id: string
    name: string
    email: string
    avatar?: string
    initials: string
    role: "administrador" | "miembro" | "espectador"
    status: "activo" | "inactivo"
    joinedAt: string
}

export interface Task {
    id: string
    title: string
    description?: string
    status: "todo" | "en-progreso" | "revisión" | "hecho"
    priority: "bajo" | "medio" | "alto" | "urgente"
    assigneeId?: string
    createdBy: string
    dueDate?: string
    startDate?: string
    estimatedTime?: number
    actualTime?: number
    tags: string[]
    comments: Comment[]
    attachments: Attachment[]
    subtasks: Subtask[]
    listId: string
    completed: boolean
    createdAt: string
    updatedAt: string
    timeTracking?: TimeEntry[]
}

export interface Comment {
    id: string
    text: string
    authorId: string
    createdAt: string
    updatedAt?: string
    mentions?: string[]
}

export interface Attachment {
    id: string
    name: string
    url: string
    type: string
    size: number
    uploadedBy: string
    uploadedAt: string
}

export interface Subtask {
    id: string
    title: string
    completed: boolean
    assigneeId?: string
    createdAt: string
}

export interface TimeEntry {
    id: string
    startTime: string
    endTime?: string
    duration?: number
    description?: string
    userId: string
}

export interface List {
    id: string
    name: string
    color?: string
    folderId: string
    taskCount: number
    createdAt: string
    position: number
}

export interface Folder {
    id: string
    name: string
    spaceId: string
    lists: List[]
    createdAt: string
    position: number
}

export interface Space {
    id: string
    name: string
    description?: string
    color: string
    members: string[]
    folders: Folder[]
    createdAt: string
    createdBy: string
}

export interface Goal {
    completed: boolean;
    assigneeId: string;
    id: string
    title: string
    description?: string
    progress: number
    dueDate?: string
    status: "no-iniciado" | "en-progreso" | "completado" | "en-espera"
    ownerId: string
    spaceId: string
    createdAt: string
    updatedAt: string
    targets: GoalTarget[]
}

export interface GoalTarget {
    id: string
    title: string
    completed: boolean
    dueDate?: string
}

export interface Notification {
    id: string
    type: "task_asignada" | "task_completado" | "comentario_agregado" | "se_acerca_fecha_limite" | "mencion"
    title: string
    message: string
    userId: string
    read: boolean
    createdAt: string
    relatedId?: string
}

interface AppState {
    users: User[]
    spaces: Space[]
    tasks: Task[]
    goals: Goal[]
    notifications: Notification[]
    currentUser: User
    currentSpace: string
    currentList?: string
    currentView: "inicio" | "metas" | "calendario" | "equipo" | "tablero" | "tareas"
    filters: {
        assignee?: string
        priority?: string
        status?: string
        search?: string
    }
}

type AppAction =
    | { type: "ADD_TASK"; payload: Omit<Task, "id" | "createdAt" | "updatedAt"> }
    | { type: "UPDATE_TASK"; payload: { id: string; updates: Partial<Task> } }
    | { type: "DELETE_TASK"; payload: string }
    | { type: "ADD_SPACE"; payload: Omit<Space, "id" | "createdAt"> }
    | { type: "UPDATE_SPACE"; payload: { id: string; updates: Partial<Space> } }
    | { type: "DELETE_SPACE"; payload: string }
    | { type: "ADD_FOLDER"; payload: Omit<Folder, "id" | "createdAt" | "position"> }
    | { type: "ADD_LIST"; payload: Omit<List, "id" | "createdAt" | "taskCount" | "position"> }
    | { type: "ADD_GOAL"; payload: Omit<Goal, "id" | "createdAt" | "updatedAt"> }
    | { type: "UPDATE_GOAL"; payload: { id: string; updates: Partial<Goal> } }
    | { type: "DELETE_GOAL"; payload: string }
    | { type: "ADD_USER"; payload: Omit<User, "id"> }
    | { type: "SET_CURRENT_SPACE"; payload: string }
    | { type: "SET_CURRENT_LIST"; payload: string }
    | { type: "SET_CURRENT_VIEW"; payload: AppState["currentView"] }
    | { type: "SET_FILTERS"; payload: Partial<AppState["filters"]> }
    | { type: "ADD_COMMENT"; payload: { taskId: string; comment: Omit<Comment, "id" | "createdAt"> } }
    | { type: "ADD_NOTIFICATION"; payload: Omit<Notification, "id" | "createdAt"> }
    | { type: "MARK_NOTIFICATION_READ"; payload: string }
    | { type: "REORDER_TASKS"; payload: { sourceStatus: string; destinationStatus: string; taskId: string } }

// @ts-ignore
const initialState: AppState = {
    currentUser: {
        id: "user-1",
        name: "John Doe",
        email: "john@company.com",
        initials: "JD",
        role: "administrador",
        status: "activo",
        joinedAt: "2024-01-01T00:00:00Z",
        skills: undefined,
        createdAt: undefined,
        timezone: "",
        department: "",
        jobTitle: "",
        bio: "",
        location: "",
        phone: ""
    },
    users: [
        {
            id: "user-1",
            name: "John Doe",
            email: "john@company.com",
            initials: "JD",
            role: "administrador",
            status: "activo",
            joinedAt: "2024-01-01T00:00:00Z",
            skills: undefined,
            createdAt: undefined,
            timezone: "",
            department: "",
            jobTitle: "",
            bio: "",
            location: "",
            phone: ""
        },
        {
            id: "user-2",
            name: "Alice Johnson",
            email: "alice@company.com",
            initials: "AJ",
            role: "miembro",
            status: "activo",
            joinedAt: "2024-01-02T00:00:00Z",
            skills: undefined,
            createdAt: undefined,
            timezone: "",
            department: "",
            jobTitle: "",
            bio: "",
            location: "",
            phone: ""
        },
        {
            id: "user-3",
            name: "Bob Smith",
            email: "bob@company.com",
            initials: "BS",
            role: "miembro",
            status: "activo",
            joinedAt: "2024-01-03T00:00:00Z",
            skills: undefined,
            createdAt: undefined,
            timezone: "",
            department: "",
            jobTitle: "",
            bio: "",
            location: "",
            phone: ""
        },
        {
            id: "user-4",
            name: "Carol Davis",
            email: "carol@company.com",
            initials: "CD",
            role: "miembro",
            status: "activo",
            joinedAt: "2024-01-04T00:00:00Z",
            skills: undefined,
            createdAt: undefined,
            timezone: "",
            department: "",
            jobTitle: "",
            bio: "",
            location: "",
            phone: ""
        },
        {
            id: "user-5",
            name: "David Wilson",
            email: "david@company.com",
            initials: "DW",
            role: "espectador",
            status: "activo",
            joinedAt: "2024-01-05T00:00:00Z",
            skills: undefined,
            createdAt: undefined,
            timezone: "",
            department: "",
            jobTitle: "",
            bio: "",
            location: "",
            phone: ""
        },
    ],
    spaces: [
        {
            id: "space-1",
            name: "Work Space",
            description: "Main workspace for company projects",
            color: "bg-blue-500",
            members: ["user-1", "user-2", "user-3", "user-4", "user-5"],
            createdAt: "2024-01-01T00:00:00Z",
            createdBy: "user-1",
            folders: [
                {
                    id: "folder-1",
                    name: "Marketing",
                    spaceId: "space-1",
                    createdAt: "2024-01-01T00:00:00Z",
                    position: 0,
                    lists: [
                        {
                            id: "list-1",
                            name: "Campaigns",
                            folderId: "folder-1",
                            taskCount: 0,
                            createdAt: "2024-01-01T00:00:00Z",
                            position: 0,
                            color: "bg-red-500",
                        },
                        {
                            id: "list-2",
                            name: "Content",
                            folderId: "folder-1",
                            taskCount: 0,
                            createdAt: "2024-01-01T00:00:00Z",
                            position: 1,
                            color: "bg-green-500",
                        },
                    ],
                },
                {
                    id: "folder-2",
                    name: "Development",
                    spaceId: "space-1",
                    createdAt: "2024-01-01T00:00:00Z",
                    position: 1,
                    lists: [
                        {
                            id: "list-3",
                            name: "Frontend",
                            folderId: "folder-2",
                            taskCount: 0,
                            createdAt: "2024-01-01T00:00:00Z",
                            position: 0,
                            color: "bg-purple-500",
                        },
                        {
                            id: "list-4",
                            name: "Backend",
                            folderId: "folder-2",
                            taskCount: 0,
                            createdAt: "2024-01-01T00:00:00Z",
                            position: 1,
                            color: "bg-yellow-500",
                        },
                    ],
                },
            ],
        },
        {
            id: "space-2",
            name: "Personal",
            description: "Personal projects and goals",
            color: "bg-green-500",
            members: ["user-1"],
            createdAt: "2024-01-01T00:00:00Z",
            createdBy: "user-1",
            folders: [
                {
                    id: "folder-3",
                    name: "Goals",
                    spaceId: "space-2",
                    createdAt: "2024-01-01T00:00:00Z",
                    position: 0,
                    lists: [
                        {
                            id: "list-5",
                            name: "Fitness",
                            folderId: "folder-3",
                            taskCount: 0,
                            createdAt: "2024-01-01T00:00:00Z",
                            position: 0,
                            color: "bg-orange-500",
                        },
                    ],
                },
            ],
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
            dueDate: "2024-02-15",
            estimatedTime: 16,
            tags: ["Design", "Frontend", "UX"],
            comments: [],
            attachments: [],
            subtasks: [
                {
                    id: "subtask-1",
                    title: "Create wireframes",
                    completed: true,
                    assigneeId: "user-2",
                    createdAt: "2024-01-01T00:00:00Z",
                },
                {
                    id: "subtask-2",
                    title: "Design mockups",
                    completed: false,
                    assigneeId: "user-2",
                    createdAt: "2024-01-01T00:00:00Z",
                },
            ],
            listId: "list-1",
            completed: false,
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z",
        },
        {
            id: "task-2",
            title: "Implement user authentication",
            description: "Set up JWT-based authentication system with role-based access control",
            status: "en-progreso",
            priority: "alto",
            assigneeId: "user-3",
            createdBy: "user-1",
            dueDate: "2024-02-20",
            estimatedTime: 24,
            actualTime: 8,
            tags: ["Backend", "Security", "Authentication"],
            comments: [
                {
                    id: "comment-1",
                    text: "Started working on the JWT implementation",
                    authorId: "user-3",
                    createdAt: "2024-01-02T10:00:00Z",
                },
            ],
            attachments: [],
            subtasks: [],
            listId: "list-4",
            completed: false,
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-02T10:00:00Z",
        },
        {
            id: "task-3",
            title: "Write API documentation",
            description: "Document all REST API endpoints with examples and response schemas",
            status: "revisión",
            priority: "medio",
            assigneeId: "user-4",
            createdBy: "user-1",
            dueDate: "2024-02-25",
            estimatedTime: 12,
            tags: ["Documentation", "API"],
            comments: [],
            attachments: [],
            subtasks: [],
            listId: "list-4",
            completed: false,
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z",
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
                {id: "target-1", title: "Complete MVP", completed: true, dueDate: "2024-02-15"},
                {id: "target-2", title: "Beta testing", completed: false, dueDate: "2024-03-01"},
                {id: "target-3", title: "Launch marketing campaign", completed: false, dueDate: "2024-03-15"},
            ],
            completed: false,
            assigneeId: ""
        },
        {
            id: "goal-2",
            title: "Improve Team Productivity",
            description: "Increase team velocity by 25% through better processes",
            progress: 60,
            dueDate: "2024-04-30",
            status: "en-progreso",
            ownerId: "user-1",
            spaceId: "space-1",
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-15T00:00:00Z",
            targets: [
                {id: "target-4", title: "Implement new tools", completed: true, dueDate: "2024-02-01"},
                {id: "target-5", title: "Team training", completed: false, dueDate: "2024-03-01"},
            ],
            completed: false,
            assigneeId: ""
        },
    ],
    notifications: [
        {
            id: "notif-1",
            type: "task_asignada",
            title: "Nueva Tarea Asignada",
            message: "Has sido asignado a 'Diseñar nueva página de inicio'",
            userId: "user-2",
            read: false,
            createdAt: "2024-01-15T10:00:00Z",
            relatedId: "task-1",
        },
    ],
    currentSpace: "space-1",
    currentView: "inicio",
    filters: {},
}

function appReducer(state: AppState, action: AppAction): AppState {
    switch (action.type) {
        case "ADD_TASK": {
            const newTask: Task = {
                ...action.payload,
                id: `task-${Date.now()}`,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }
            return {
                ...state,
                tasks: [...state.tasks, newTask],
            }
        }

        case "UPDATE_TASK": {
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.id
                        ? { ...task, ...action.payload.updates, updatedAt: new Date().toISOString() }
                        : task,
                ),
            }
        }

        case "DELETE_TASK": {
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload),
            }
        }

        case "ADD_SPACE": {
            const newSpace: Space = {
                ...action.payload,
                id: `space-${Date.now()}`,
                createdAt: new Date().toISOString(),
            }
            return {
                ...state,
                spaces: [...state.spaces, newSpace],
            }
        }

        case "UPDATE_SPACE": {
            return {
                ...state,
                spaces: state.spaces.map((space) =>
                    space.id === action.payload.id ? { ...space, ...action.payload.updates } : space,
                ),
            }
        }

        case "DELETE_SPACE": {
            return {
                ...state,
                spaces: state.spaces.filter((space) => space.id !== action.payload),
                currentSpace: state.currentSpace === action.payload ? state.spaces[0]?.id || "" : state.currentSpace,
            }
        }

        case "ADD_FOLDER": {
            const newFolder: Folder = {
                ...action.payload,
                id: `folder-${Date.now()}`,
                createdAt: new Date().toISOString(),
                position: 0,
            }
            return {
                ...state,
                spaces: state.spaces.map((space) =>
                    space.id === action.payload.spaceId ? { ...space, folders: [...space.folders, newFolder] } : space,
                ),
            }
        }

        case "ADD_LIST": {
            const newList: List = {
                ...action.payload,
                id: `list-${Date.now()}`,
                taskCount: 0,
                createdAt: new Date().toISOString(),
                position: 0,
            }
            return {
                ...state,
                spaces: state.spaces.map((space) => ({
                    ...space,
                    folders: space.folders.map((folder) =>
                        folder.id === action.payload.folderId ? { ...folder, lists: [...folder.lists, newList] } : folder,
                    ),
                })),
            }
        }

        case "ADD_GOAL": {
            const newGoal: Goal = {
                ...action.payload,
                id: `goal-${Date.now()}`,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }
            return {
                ...state,
                goals: [...state.goals, newGoal],
            }
        }

        case "UPDATE_GOAL": {
            return {
                ...state,
                goals: state.goals.map((goal) =>
                    goal.id === action.payload.id
                        ? { ...goal, ...action.payload.updates, updatedAt: new Date().toISOString() }
                        : goal,
                ),
            }
        }

        case "DELETE_GOAL": {
            return {
                ...state,
                goals: state.goals.filter((goal) => goal.id !== action.payload),
            }
        }

        case "ADD_USER": {
            const newUser: User = {
                ...action.payload,
                id: `user-${Date.now()}`,
            }
            return {
                ...state,
                users: [...state.users, newUser],
            }
        }

        case "SET_CURRENT_SPACE": {
            return {
                ...state,
                currentSpace: action.payload,
            }
        }

        case "SET_CURRENT_LIST": {
            return {
                ...state,
                currentList: action.payload,
            }
        }

        case "SET_CURRENT_VIEW": {
            return {
                ...state,
                currentView: action.payload,
            }
        }

        case "SET_FILTERS": {
            return {
                ...state,
                filters: { ...state.filters, ...action.payload },
            }
        }

        case "ADD_COMMENT": {
            const newComment: Comment = {
                ...action.payload.comment,
                id: `comment-${Date.now()}`,
                createdAt: new Date().toISOString(),
            }
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.taskId ? { ...task, comments: [...task.comments, newComment] } : task,
                ),
            }
        }

        case "ADD_NOTIFICATION": {
            const newNotification: Notification = {
                ...action.payload,
                id: `notif-${Date.now()}`,
                createdAt: new Date().toISOString(),
            }
            return {
                ...state,
                notifications: [...state.notifications, newNotification],
            }
        }

        case "MARK_NOTIFICATION_READ": {
            return {
                ...state,
                notifications: state.notifications.map((notif) =>
                    notif.id === action.payload ? { ...notif, read: true } : notif,
                ),
            }
        }

        case "REORDER_TASKS": {
            const {destinationStatus, taskId } = action.payload
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === taskId
                        ? {
                            ...task,
                            status: destinationStatus as Task["status"],
                            completed: destinationStatus === "done",
                            updatedAt: new Date().toISOString(),
                        }
                        : task,
                ),
            }
        }

        default:
            return state
    }
}

const AppContext = createContext<{
    state: AppState
    dispatch: React.Dispatch<AppAction>
} | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(appReducer, initialState)

    return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useApp() {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error("useApp must be used within an AppProvider")
    }
    return context
}
