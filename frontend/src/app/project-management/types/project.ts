// Tipos para proyectos
export interface Project {
  id: string
  name: string
  description?: string
  health: 'no-update' | 'at-risk' | 'off-track' | 'on-track'
  priority: 'urgent' | 'high' | 'medium' | 'low' | 'none'
  lead?: {
    id: string
    name: string
    avatar?: string
  }
  targetDate: string
  status: 'backlog' | 'todo' | 'in-progress' | 'technical-review' | 'completed' | 'paused'
  progress?: number // Porcentaje de progreso
  createdAt: string
  updatedAt: string
  teamId?: string
}
