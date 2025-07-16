import { Goal, SortBy } from "@/features/dashboard/goals/utils/GoalType"
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

    if (filter !== "all") {
      filtered = filtered.filter((goal) => goal.status === filter)
    }

    filtered.sort((a, b) => {
      switch (sort) {
        case "dueDate":
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        case "progress":
          return b.progress - a.progress
        case "title":
          return a.title.localeCompare(b.title)
        case "createdAt":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [goals, query, filter, sort])
}
