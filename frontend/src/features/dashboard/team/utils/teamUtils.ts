import { Activity, CheckCircle, Users } from "lucide-react"

export const getRoleColor = (role: string) => {
    switch (role) {
        case "admin":
            return "bg-red-500"
        case "member":
            return "bg-blue-500"
        case "viewer":
            return "bg-gray-500"
        default:
            return "bg-gray-500"
    }
}

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

export interface TeamStatsProps {
  stats: {
    totalMembers: number
    activeMembers: number
    admins: number
    avgCompletion: number
  }
}


export const statCards = (stats: TeamStatsProps["stats"]) => [
    {
        title: "Total de Miembros",
        value: `${stats.totalMembers}`,
        icon: Users,
        color: "",
        bgColor: "",
    },
    {
        title: "Miembros Activos",
        value: `${stats.activeMembers}`,
        icon: Activity,
        color: "text-green-600",
        bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
        title: "Administradores",
        value: `${stats.admins}`,
        icon: Users,
        color: "text-blue-600",
        bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
        title: "Promedio de Finalización",
        value: `${stats.avgCompletion}%`,
        icon: CheckCircle,
        color: "text-red-600",
        bgColor: "bg-red-100 dark:bg-red-900/20",
    },
]

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  initials: string
  role: string
  joinedAt: string
  status: string
}

interface UserStats {
  totalTasks: number
  completedTasks: number
  overdueTasks: number
  completionRate: number
}

export interface TeamMemberCardProps {
  user: User
  stats: UserStats
}

