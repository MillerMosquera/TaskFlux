// Define the Goal type locally if not exported from goalHelper
export type Goal = {
    id: string;
    title: string;
    description?: string;
    status: GoalStatus;
    dueDate?: string;
    progress: number;
    createdAt: string;
    spaceId: string
    ownerId: string
    targets: GoalTarget[]
};

export interface GoalTarget {
    id: string
    title: string
    completed: boolean
    dueDate?: string        
}

export interface User {
    id: string
    name: string
    initials: string
    avatar?: string
}

export interface Space {
    id: string
    name: string
}


export type SortBy = "fechaVencimiento" | "progreso" | "titulo" | "fechaCreacion";
export type ViewMode = "grid" | "list" | "kanban"
export type GoalStatus = "no-iniciado" | "en-progreso" | "completado" | "en-espera"
