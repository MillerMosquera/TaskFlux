import { calculateProgress } from "@/app/goal-tracking/delivery/goals/utils/goalHelper"
import { Goal, Target } from "@/app/goal-tracking/delivery/goals/utils/types"

export function useTargetManagement(
    goal: Goal | null,
    dispatch: (action: any) => void
) {
    const handleAddTarget = (title: string, dueDate?: Date) => {
        if (!goal) return

        const newTarget: Target = {
            id: `target-${Date.now()}`,
            title,
            completed: false,
            dueDate: dueDate?.toISOString().split("T")[0],
        }

        dispatch({
            type: "UPDATE_GOAL",
            payload: {
                id: goal.id,
                updates: {
                    targets: [...goal.targets, newTarget],
                },
            },
        })
    }

    const handleToggleTarget = (targetId: string) => {
        if (!goal) return

        const updatedTargets = goal.targets.map((target) =>
            target.id === targetId ? { ...target, completed: !target.completed } : target,
        )

        const newProgress = calculateProgress(updatedTargets)

        // Determine new status based on progress
        let newStatus = goal.status
        if (newProgress === 100) {
            newStatus = "completado"
        } else if (goal.status === "completado") {
            // If goal was completed but now progress is not 100%, change to "en-progreso"
            newStatus = "en-progreso"
        } else if (goal.status === "no-iniciado" && newProgress > 0) {
            // If goal was not started but now has progress, change to "en-progreso"
            newStatus = "en-progreso"
        }

        dispatch({
            type: "UPDATE_GOAL",
            payload: {
                id: goal.id,
                updates: {
                    targets: updatedTargets,
                    progress: newProgress,
                    status: newStatus,
                },
            },
        })
    }

    const handleDeleteTarget = (targetId: string) => {
        if (!goal) return

        const updatedTargets = goal.targets.filter((target) => target.id !== targetId)
        const newProgress = calculateProgress(updatedTargets)

        // Determine new status based on progress
        let newStatus = goal.status
        if (newProgress === 100) {
            newStatus = "completado"
        } else if (goal.status === "completado") {
            // If goal was completed but now progress is not 100%, change to "en-progreso"
            newStatus = "en-progreso"
        } else if (goal.status === "no-iniciado" && newProgress > 0) {
            // If goal was not started but now has progress, change to "en-progreso"
            newStatus = "en-progreso"
        } else if (newProgress === 0 && updatedTargets.length === 0) {
            // If no targets remain, revert to "no-iniciado"
            newStatus = "no-iniciado"
        }

        dispatch({
            type: "UPDATE_GOAL",
            payload: {
                id: goal.id,
                updates: {
                    targets: updatedTargets,
                    progress: newProgress,
                    status: newStatus,
                },
            },
        })
    }

    return {
        handleAddTarget,
        handleToggleTarget,
        handleDeleteTarget
    }
}
