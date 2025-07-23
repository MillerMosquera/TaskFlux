import { useApp } from "@/app/context/app-context"
import { useMemo } from "react"

export function useGoal() {

    const { state } = useApp()
    const spaceGoals = state.goals.filter((goal) => goal.spaceId === state.currentSpace)

    const stats = useMemo(() => {
        const total = spaceGoals.length
        const completed = spaceGoals.filter((g) => g.status === "completado").length
        const inProgress = spaceGoals.filter((g) => g.status === "en-progreso").length
        const overdue = spaceGoals.filter(
            (g) => g.dueDate && new Date(g.dueDate) < new Date() && g.status !== "completado",
        ).length
        const avgProgress = total > 0 ? Math.round(spaceGoals.reduce((sum, g) => sum + g.progress, 0) / total) : 0

        return { total, completed, inProgress, overdue, avgProgress }
    }, [spaceGoals])

    return stats;
}
