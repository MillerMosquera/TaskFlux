export const getTaskPriorityColor = (priority: string) => {
  switch (priority) {
    case "urgent": return "text-red-600 bg-red-100 dark:bg-red-900/20"
    case "high": return "text-orange-600 bg-orange-100 dark:bg-orange-900/20"
    case "medium": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20"
    case "low": return "text-green-600 bg-green-100 dark:bg-green-900/20"
    default: return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
  }
}

import { isToday, isTomorrow, format } from "date-fns"

export const getDateLabel = (date: string) => {
  const d = new Date(date)
  if (isToday(d)) return "Today"
  if (isTomorrow(d)) return "Tomorrow"
  return format(d, "MMM d")
}