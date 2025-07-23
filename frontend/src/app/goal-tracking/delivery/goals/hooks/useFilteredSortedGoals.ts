import { Goal, SortBy } from "@/app/goal-tracking/delivery/goals/utils/goalType"
import { useMemo } from "react"

export const useFilteredSortedGoals = ({
  goals,
  query,
  filter,
  sort,
}: {
  goals: Goal[],
  query: string,
  filter: string,
  sort: SortBy
}) => {
  return useMemo(() => {
    let filtered = goals

    if (query) {
      filtered = filtered.filter((goal) =>
        goal.title.toLowerCase().includes(query.toLowerCase()) ||
        goal.description?.toLowerCase().includes(query.toLowerCase()),
      )
    }

    if (filter !== "todos") {
      filtered = filtered.filter((goal) => goal.status === filter)
    }

    filtered.sort((a, b) => {
      switch (sort) {
        case "fechaVencimiento":
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        case "progreso":
          return b.progress - a.progress
        case "titulo":
          return a.title.localeCompare(b.title)
        case "fechaCreacion":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [goals, query, filter, sort])
}
