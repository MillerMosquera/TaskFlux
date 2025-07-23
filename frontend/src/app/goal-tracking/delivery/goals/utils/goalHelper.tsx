// NOTA: Para colores y etiquetas de estados, usar config/ui-config.ts
// con getGoalStatusConfig() - esto evita duplicación y mantiene consistencia

export const calculateProgress = (targets: { completed: boolean }[]): number => {
  if (targets.length === 0) return 0
  const completedCount = targets.filter(t => t.completed).length
  return Math.round((completedCount / targets.length) * 100)
}

export const isGoalOverdue = (dueDate?: string, status?: string): boolean => {
  return !!(dueDate && new Date(dueDate) < new Date() && status !== "completado")
}
