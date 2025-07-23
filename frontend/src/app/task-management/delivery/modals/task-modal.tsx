import { useApp, useCurrentUser } from "@/app/context/app-context"
import { formVariants } from "@/app/team-collaboration/delivery/team/utils/variants"
import { type Task } from "@/shared/types/database"
import {
    Dialog,
    DialogContent,
} from "@/shared/ui/dialog"
import { motion } from "framer-motion"
import type React from "react"
import { useState } from "react"
import { TaskAssigneeAndDate } from "./task/TaskAssigneeAndDate"
import { TaskBasicFields } from "./task/TaskBasicFields"
import { TaskFormActions } from "./task/TaskFormActions"
import { TaskFormHeader } from "./task/TaskFormHeader"
import { TaskPriorityAndStatus } from "./task/TaskPriorityAndStatus"
import { TaskTags } from "./task/TaskTags"
import { TaskTimeEstimate } from "./task/TaskTimeEstimate"

interface TaskModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    task?: Task
    listId?: string
    currentView?: "list" | "board" | "calendar"
}

export function TaskModal({ open, onOpenChange, task, listId }: TaskModalProps) {
    const { state, dispatch } = useApp()
    const currentUser = useCurrentUser()

    // Función para obtener detalles de la tarea desde el state
    const getTaskDetails = (taskId: string) => {
        const taskSchedule = state.taskSchedules.find(s => s.taskId === taskId)
        const taskTags = state.taskTags.filter(tt => tt.taskId === taskId)
        return {
            schedule: taskSchedule,
            tags: taskTags
        }
    }

    const taskDetails = task ? getTaskDetails(task.id) : null
    const [loading, setLoading] = useState(false)

    // Estado del formulario usando las nuevas entidades
    const [formData, setFormData] = useState({
        title: task?.title || "",
        description: task?.description || "",
        priority: task?.priority || "bajo",
        assigneeId: task?.assigneeId || "",
        estimatedTime: taskDetails?.schedule?.estimatedTime || 0,
        tags: taskDetails?.tags?.map(taskTag => {
            const tag = state.tags.find(t => t.id === taskTag.tagId)
            return tag?.name || ''
        }).filter(Boolean) || [],
        status: task?.status || "todo",
    })

    const [dueDate, setDueDate] = useState<Date | undefined>(
        taskDetails?.schedule?.dueDate ? new Date(taskDetails.schedule.dueDate) : undefined
    )

    const currentSpace = state.spaces.find((s) => s.id === state.currentSpace)
    const availableLists = currentSpace?.folders.flatMap((f: any) => f.lists) || []
    const selectedList = listId || task?.listId || availableLists[0]?.id

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.title.trim() || !currentUser) return

        setLoading(true)

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 800))

        if (task) {
            // Actualizar tarea existente
            dispatch({
                type: "UPDATE_TASK",
                payload: {
                    id: task.id,
                    updates: {
                        title: formData.title,
                        description: formData.description,
                        priority: formData.priority as any,
                        assigneeId: formData.assigneeId,
                        status: formData.status as any,
                    },
                },
            })

            // Actualizar horario si existe
            if (taskDetails?.schedule) {
                dispatch({
                    type: "UPDATE_TASK_SCHEDULE",
                    payload: {
                        taskId: task.id,
                        updates: {
                            dueDate: dueDate?.toISOString().split("T")[0],
                            estimatedTime: formData.estimatedTime,
                        }
                    },
                })
            }

        } else {
            // Crear nueva tarea
            dispatch({
                type: "ADD_TASK",
                payload: {
                    title: formData.title,
                    description: formData.description,
                    priority: formData.priority as any,
                    assigneeId: formData.assigneeId,
                    status: formData.status as any,
                    listId: selectedList,
                    createdBy: currentUser.id,
                    completed: false,
                },
            })
        }

        setLoading(false)
        onOpenChange(false)
        resetForm()
    }

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            priority: "bajo",
            assigneeId: "",
            estimatedTime: 0,
            tags: [],
            status: "todo",
        })
        setDueDate(undefined)
    }



    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
                <div className="max-h-[calc(90vh-2rem)] overflow-y-auto scrollbar-hide px-1">
                    <TaskFormHeader isEditing={!!task} />

                    <motion.form
                        onSubmit={handleSubmit}
                        className="space-y-6 pb-6"
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <TaskBasicFields
                            title={formData.title}
                            description={formData.description}
                            onTitleChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
                            onDescriptionChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
                        />

                        <TaskPriorityAndStatus
                            priority={formData.priority}
                            status={formData.status}
                            onPriorityChange={(value) => setFormData(prev => ({ ...prev, priority: value as any }))}
                            onStatusChange={(value) => setFormData(prev => ({ ...prev, status: value as any }))}
                        />

                        <TaskAssigneeAndDate
                            assigneeId={formData.assigneeId}
                            dueDate={dueDate}
                            users={state.users}
                            onAssigneeChange={(value) => setFormData(prev => ({ ...prev, assigneeId: value }))}
                            onDateChange={setDueDate}
                        />

                        <TaskTimeEstimate
                            estimatedTime={formData.estimatedTime}
                            onTimeChange={(value) => setFormData(prev => ({ ...prev, estimatedTime: value }))}
                        />

                        <TaskTags
                            tags={formData.tags}
                            onTagsChange={(tags) => setFormData(prev => ({ ...prev, tags }))}
                        />

                        <TaskFormActions
                            isEditing={!!task}
                            loading={loading}
                            canSubmit={formData.title.trim().length > 0}
                            onCancel={() => onOpenChange(false)}
                        />
                    </motion.form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
