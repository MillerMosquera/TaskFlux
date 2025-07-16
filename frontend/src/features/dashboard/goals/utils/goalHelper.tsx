export const getStatusColor = (status: string) => {
  switch (status) {
    case "completed": return "bg-green-500"
    case "in-progress": return "bg-blue-500"
    case "on-hold": return "bg-yellow-500"
    case "not-started": return "bg-gray-500"
    default: return "bg-gray-500"
  }
}

export const getStatusLabel = (status: string) => {
  switch (status) {
    case "not-started": return "Not Started"
    case "in-progress": return "In Progress"
    case "completed": return "Completed"
    case "on-hold": return "On Hold"
    default: return status
  }
}

export const calculateProgress = (targets: { completed: boolean }[]): number => {
  if (targets.length === 0) return 0
  const completedCount = targets.filter(t => t.completed).length
  return Math.round((completedCount / targets.length) * 100)
}

export const isGoalOverdue = (dueDate?: string, status?: string): boolean => {
  return !!(dueDate && new Date(dueDate) < new Date() && status !== "completed")
}