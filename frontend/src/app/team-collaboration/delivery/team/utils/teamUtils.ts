import { Activity, CheckCircle, Users } from "lucide-react"

// NOTA: Para colores de roles, usar config/ui-config.ts con getRoleConfig()
// Esto evita duplicación y mantiene consistencia visual

export const getUserStats = (userId: string, state: any) => {
    const userTasks = state.tasks.filter((task: any) => task.assigneeId === userId)
    const completedTasks = userTasks.filter((task: any) => task.completed)
    const overdueTasks = userTasks.filter((task: any) => {
        if (!task.dueDate) return false
        return new Date(task.dueDate) < new Date() && !task.completed
    })
    return {
        totalTasks: userTasks.length,
        completedTasks: completedTasks.length,
        overdueTasks: overdueTasks.length,
        completionRate: userTasks.length > 0 ? Math.round((completedTasks.length / userTasks.length) * 100) : 0,
    }
}

export const getRoleIcon = (role: string) => {
    switch (role) {
        case "admin":
            return Activity
        case "member":
            return CheckCircle
        default:
            return Users
    }
}

export interface TeamStatsProps {
  stats: {
    totalMembers: number
    activeMembers: number
    admins: number
    avgCompletion: number
  }
}

// Interfaz para los datos del usuario con información adicional del equipo
export interface TeamMemberData {
  id: string
  name: string
  email: string
  avatar?: string
  initials: string
  role: string
  joinedAt: string
  status: string
}

// Props para el TeamMemberCard
export interface TeamMemberCardProps {
  user: TeamMemberData
  stats: {
    totalTasks: number
    completedTasks: number
    overdueTasks: number
    completionRate: number
  }
}

