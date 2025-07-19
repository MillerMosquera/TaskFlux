// types.ts
export interface GoalDetailModalProps {
  goalId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export interface GoalFormData {
  title: string
  description: string
  status: "no-iniciado" | "en-progreso" | "completado" | "en-espera"
  progress: number
  spaceId: string
  ownerId: string
}

export interface Target {
  id: string
  title: string
  completed: boolean
  dueDate?: string
}

export interface Goal {
  id: string
  title: string
  description?: string
  status: "no-iniciado" | "en-progreso" | "completado" | "en-espera"
  progress: number
  spaceId: string
  ownerId: string
  dueDate?: string
  targets: Target[]
}

export interface User {
  id: string
  name: string
  avatar?: string
  initials: string
}

export interface Space {
  id: string
  name: string
}