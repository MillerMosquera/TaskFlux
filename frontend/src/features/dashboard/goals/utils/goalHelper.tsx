export const getStatusColor = (status: string) => {
  switch (status) {
    case "completado": return "bg-green-500"
    case "en-progreso": return "bg-blue-500"
    case "en-espera": return "bg-yellow-500"
    case "no-iniciado": return "bg-gray-500"
    default: return "bg-gray-500"
  }
}

export const getStatusLabel = (status: string) => {
  switch (status) {
    case "no-iniciado": return "No Iniciado"
    case "en-progreso": return "En Progreso"
    case "completado": return "Completado"
    case "en-espera": return "En Espera"
    default: return status
  }
}

export const calculateProgress = (targets: { completed: boolean }[]): number => {
  if (targets.length === 0) return 0
  const completedCount = targets.filter(t => t.completed).length
  return Math.round((completedCount / targets.length) * 100)
}

export const isGoalOverdue = (dueDate?: string, status?: string): boolean => {
  return !!(dueDate && new Date(dueDate) < new Date() && status !== "completado")
}