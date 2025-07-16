import { calculateProgress } from "../utils/goalHelper"
import { Target, Goal } from "@/features/dashboard/goals/utils/types"

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

        dispatch({
            type: "UPDATE_GOAL",
            payload: {
                id: goal.id,
                updates: {
                    targets: updatedTargets,
                    progress: newProgress,
                    status: newProgress === 100 ? "completed" : goal.status === "not-started" ? "in-progress" : goal.status,
                },
            },
        })
    }

    const handleDeleteTarget = (targetId: string) => {
        if (!goal) return

        const updatedTargets = goal.targets.filter((target) => target.id !== targetId)
        const newProgress = calculateProgress(updatedTargets)

        dispatch({
            type: "UPDATE_GOAL",
            payload: {
                id: goal.id,
                updates: {
                    targets: updatedTargets,
                    progress: newProgress,
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