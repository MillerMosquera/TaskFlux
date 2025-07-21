import { useApp } from "@/app/context/app-context"
import { addDays, isThisWeek, isToday } from "date-fns"
import { useMemo } from "react"

export function useHomeStats() {
  const { state } = useApp()

  const currentSpace = state.spaces.find((s) => s.id === state.currentSpace)
  const spaceTasks = state.tasks.filter((task) => {
    const taskList = currentSpace?.folders.flatMap((f) => f.lists).find((l) => l.id === task.listId)
    return !!taskList
  })

  const spaceGoals = state.goals.filter((goal) => goal.spaceId === state.currentSpace)

  const stats = useMemo(() => {
    const myTasks = spaceTasks.filter((t) => t.assigneeId === state.currentUser.id)
    const completedTasks = myTasks.filter((t) => t.completed)
    const overdueTasks = myTasks.filter((t) => t.dueDate && new Date(t.dueDate) < new Date() && !t.completed)
    const todayTasks = myTasks.filter((t) => t.dueDate && isToday(new Date(t.dueDate)) && !t.completed)
    const thisWeekTasks = myTasks.filter((t) => t.dueDate && isThisWeek(new Date(t.dueDate)) && !t.completed)

    const myGoals = spaceGoals.filter((g) => g.ownerId === state.currentUser.id)
    const completedGoals = myGoals.filter((g) => g.status === "completado")
    const activeGoals = myGoals.filter((g) => g.status === "en-progreso")

    return {
      currentSpace,
      spaceTasks,
      spaceGoals,
      myTasks,
      recentTasks: myTasks
        .filter((t) => !t.completed)
        .sort((a, b) => {
          if (!a.dueDate && !b.dueDate) return 0
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        })
        .slice(0, 5),
      recentGoals: myGoals
        .filter((g) => g.status !== "completado")
        .sort((a, b) => new Date(a.dueDate || 0).getTime() - new Date(b.dueDate || 0).getTime())
        .slice(0, 3),
      upcomingDeadlines: [...spaceTasks, ...spaceGoals]
        .filter((item) => {
          const due = item.dueDate && new Date(item.dueDate)
          const now = new Date()
          return (
            due &&
            due >= now &&
            due <= addDays(now, 7) &&
            (
              // If it's a task (has 'completed'), check not completed
              ("completed" in item && !item.completed) ||
              // If it's a goal (has 'status'), check not completed
              ("status" in item && item.status !== "completado")
            )
          )
        })
        .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
        .slice(0, 5),
      stats: {
        totalTasks: myTasks.length,
        completedTasks: completedTasks.length,
        overdueTasks: overdueTasks.length,
        todayTasks: todayTasks.length,
        thisWeekTasks: thisWeekTasks.length,
        totalGoals: myGoals.length,
        completedGoals: completedGoals.length,
        activeGoals: activeGoals.length,
        completionRate: myTasks.length > 0 ? Math.round((completedTasks.length / myTasks.length) * 100) : 0,
      },
    }
  }, [spaceTasks, spaceGoals, state.currentUser.id])

  return stats
}
