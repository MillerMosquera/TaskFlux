import { useState, useEffect } from "react"
import { Goal, GoalFormData } from "@/features/dashboard/goals/utils/types"

export function useGoalForm(goal: Goal | null) {
    const [formData, setFormData] = useState<GoalFormData>({
        title: "",
        description: "",
        status: "no-iniciado",
        progress: 0,
        spaceId: "",
        ownerId: "",
    })
    const [dueDate, setDueDate] = useState<Date | undefined>()

    useEffect(() => {
        if (goal) {
            setFormData({
                title: goal.title,
                description: goal.description || "",
                status: goal.status,
                progress: goal.progress,
                spaceId: goal.spaceId,
                ownerId: goal.ownerId,
            })
            setDueDate(goal.dueDate ? new Date(goal.dueDate) : undefined)
        }
    }, [goal])

    const updateFormData = (updates: Partial<GoalFormData>) => {
        setFormData(prev => ({ ...prev, ...updates }))
    }

    return {
        formData,
        dueDate,
        updateFormData,
        setDueDate
    }
}