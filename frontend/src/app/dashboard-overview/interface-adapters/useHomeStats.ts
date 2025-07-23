import { useApp, useCurrentUser, useTasksBasic } from "@/app/context/app-context"
import { addDays, isThisWeek, isToday } from "date-fns"
import { useMemo } from "react"

export function useHomeStats() {
  const { state } = useApp()
  const currentUser = useCurrentUser()
  const tasksBasic = useTasksBasic()

  const currentSpace = state.spaces.find((s) => s.id === state.currentSpace)
  
  // Filtrar tareas del espacio actual usando las entidades básicas
  const spaceTasks = tasksBasic.filter((task) => {
    const taskList = currentSpace?.folders.flatMap((f) => f.lists).find((l) => l.id === task.listId)
    return !!taskList
  })

  const spaceGoals = state.goals.filter((goal) => goal.spaceId === state.currentSpace)

  const stats = useMemo(() => {
    if (!currentUser) {
      return {
        stats: {
          totalTasks: 0,
          completedTasks: 0,
          overdueTasks: 0,
          todayTasks: 0,
          thisWeekTasks: 0,
          totalGoals: 0,
          completedGoals: 0,
          activeGoals: 0,
          completionRate: 0,
        },
        recentTasks: [],
        recentGoals: [],
        upcomingDeadlines: [],
      }
    }

    // Usar las entidades básicas para obtener tareas del usuario
    const myTasks = spaceTasks.filter((task) => task.assigneeId === currentUser.id)
    const completedTasks = myTasks.filter((task) => task.completed)
    
    // Para fechas de vencimiento, buscar en TaskSchedule
    const overdueTasks = myTasks.filter((task) => {
      const schedule = state.taskSchedules.find(s => s.taskId === task.id)
      const dueDate = schedule?.dueDate
      return dueDate && new Date(dueDate) < new Date() && !task.completed
    })
    
    const todayTasks = myTasks.filter((task) => {
      const schedule = state.taskSchedules.find(s => s.taskId === task.id)
      const dueDate = schedule?.dueDate
      return dueDate && isToday(new Date(dueDate)) && !task.completed
    })
    
    const thisWeekTasks = myTasks.filter((task) => {
      const schedule = state.taskSchedules.find(s => s.taskId === task.id)
      const dueDate = schedule?.dueDate
      return dueDate && isThisWeek(new Date(dueDate)) && !task.completed
    })

    const myGoals = spaceGoals.filter((g) => g.ownerId === currentUser.id)
    const completedGoals = myGoals.filter((g) => g.status === "completado")
    const activeGoals = myGoals.filter((g) => g.status === "en-progreso")

    // Función auxiliar para agregar fechas de schedule a una tarea
    const enrichTaskWithSchedule = (task: typeof myTasks[0]) => {
      const schedule = state.taskSchedules.find(s => s.taskId === task.id)
      return {
        ...task,
        dueDate: schedule?.dueDate,
        startDate: schedule?.startDate,
      }
    }

    return {
      currentSpace,
      spaceTasks: spaceTasks.map(enrichTaskWithSchedule),
      spaceGoals,
      myTasks: myTasks.map(enrichTaskWithSchedule),
      recentTasks: myTasks
        .filter((task) => !task.completed)
        .sort((a, b) => {
          const aSchedule = state.taskSchedules.find(s => s.taskId === a.id)
          const bSchedule = state.taskSchedules.find(s => s.taskId === b.id)
          const aDue = aSchedule?.dueDate
          const bDue = bSchedule?.dueDate
          if (!aDue && !bDue) return 0
          if (!aDue) return 1
          if (!bDue) return -1
          return new Date(aDue).getTime() - new Date(bDue).getTime()
        })
        .slice(0, 5)
        .map(enrichTaskWithSchedule),
      recentGoals: myGoals
        .filter((g) => g.status !== "completado")
        .sort((a, b) => new Date(a.dueDate || 0).getTime() - new Date(b.dueDate || 0).getTime())
        .slice(0, 3),
      upcomingDeadlines: [
        ...myTasks.map(enrichTaskWithSchedule),
        ...spaceGoals
      ]
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
  }, [spaceTasks, spaceGoals, currentUser])

  return stats
}
