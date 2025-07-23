// NOTA: Para colores de prioridades, usar config/ui-config.ts con getPriorityConfig()
// Esto evita duplicación y mantiene consistencia visual

import { format, isToday, isTomorrow } from "date-fns"

export const getDateLabel = (date: string) => {
  const d = new Date(date)
  if (isToday(d)) return "Today"
  if (isTomorrow(d)) return "Tomorrow"
  return format(d, "MMM d")
}
