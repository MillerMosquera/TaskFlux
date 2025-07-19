
import { useApp, type Task } from "@/app/context/app-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { AnimatePresence, motion } from "framer-motion"
import { CalendarIcon, Clock, Flag, Loader2, Plus, Save, Tag, User, X } from "lucide-react"
import type React from "react"
import { useState } from "react"

interface TaskModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    task?: Task
    listId?: string
    currentView?: "list" | "board" | "calendar"
}

export function TaskModal({ open, onOpenChange, task, listId }: TaskModalProps) {
    const { state, dispatch } = useApp()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: task?.title || "",
        description: task?.description || "",
        priority: task?.priority || "bajo",
        assigneeId: task?.assigneeId || "",
        dueDate: task?.dueDate || "",
        estimatedTime: task?.estimatedTime || 0,
        tags: task?.tags || [],
        status: task?.status || "todo",
    })
    const [newTag, setNewTag] = useState("")
    const [dueDate, setDueDate] = useState<Date | undefined>(task?.dueDate ? new Date(task.dueDate) : undefined)

    const currentSpace = state.spaces.find((s) => s.id === state.currentSpace)
    const availableLists = currentSpace?.folders.flatMap((f) => f.lists) || []
    const selectedList = listId || task?.listId || availableLists[0]?.id

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.title.trim()) return

        setLoading(true)

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 800))

        const taskData = {
            ...formData,
            dueDate: dueDate?.toISOString().split("T")[0],
            listId: selectedList,
            createdBy: state.currentUser.id,
            comments: [],
            attachments: [],
            subtasks: [],
            completed: false,
        }

        if (task) {
            dispatch({
                type: "UPDATE_TASK",
                payload: {
                    id: task.id,
                    updates: taskData,
                },
            })
        } else {
            dispatch({
                type: "ADD_TASK",
                payload: taskData,
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
            dueDate: "",
            estimatedTime: 0,
            tags: [],
            status: "todo",
        })
        setDueDate(undefined)
        setNewTag("")
    }

    const addTag = () => {
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData((prev) => ({
                ...prev,
                tags: [...prev.tags, newTag.trim()],
            }))
            setNewTag("")
        }
    }

    const removeTag = (tagToRemove: string) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((tag: string) => tag !== tagToRemove),
        }))
    }

    const formVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    }

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
                <div className="max-h-[calc(90vh-2rem)] overflow-y-auto scrollbar-hide px-1">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 pb-4">
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <Flag className="h-5 w-5 text-primary" />
                            </motion.div>
                            {task ? "Editar tarea" : "Crear nueva tarea"}
                        </DialogTitle>
                    </DialogHeader>

                    <motion.form
                        onSubmit={handleSubmit}
                        className="space-y-6 pb-6"
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                    >
                    {/* Title */}
                    <motion.div className="space-y-2">
                        <Label htmlFor="title" className="flex items-center gap-2">
                            <motion.div whileHover={{ scale: 1.1 }}>
                                <Tag className="h-4 w-4" />
                            </motion.div>
                            Título de la tarea *
                        </Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                            placeholder="Ingrese el título de la tarea..."
                            required
                            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        />
                    </motion.div>

                    {/* Description */}
                    <motion.div className="space-y-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                            placeholder="Agregar una descripción..."
                            rows={3}
                            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        />
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Priority */}
                        <motion.div className="space-y-2">
                            <Label>Prioridad</Label>
                            <Select
                                value={formData.priority}
                                onValueChange={(value) => setFormData((prev) => ({ ...prev, priority: value as any }))}
                            >
                                <SelectTrigger className="transition-all duration-200 hover:border-primary/50">
                                    <SelectValue>
                                        <div className="flex items-center gap-2">
                                            <motion.div whileHover={{ scale: 1.2 }}>
                                                <Flag className="h-4 w-4" />
                                            </motion.div>
                                            <span className="capitalize">{formData.priority}</span>
                                        </div>
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="low">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-green-500" />
                                            Bajo
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="medium">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                            Medio
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="high">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-red-500" />
                                            Alto
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="urgent">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-purple-500" />
                                            Urgente
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </motion.div>

                        {/* Status */}
                        <motion.div className="space-y-2">
                            <Label>Estado</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value as any }))}
                            >
                                <SelectTrigger className="transition-all duration-200 hover:border-primary/50">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="todo">Por hacer</SelectItem>
                                    <SelectItem value="in-progress">En progreso</SelectItem>
                                    <SelectItem value="review">Revisión</SelectItem>
                                    <SelectItem value="done">Hecho</SelectItem>
                                </SelectContent>
                            </Select>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Assignee */}
                        <motion.div className="space-y-2" >
                            <Label>Asignar a</Label>
                            <Select
                                value={formData.assigneeId}
                                onValueChange={(value) =>
                                    setFormData((prev) => ({ ...prev, assigneeId: value === "unassigned" ? "" : value }))
                                }
                            >
                                <SelectTrigger className="transition-all duration-200 hover:border-primary/50">
                                    <SelectValue placeholder="Seleccionar">
                                        {formData.assigneeId && (
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4" />
                                                {state.users.find((u: { id: any }) => u.id === formData.assigneeId)?.name}
                                            </div>
                                        )}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="unassigned">Sin asignar</SelectItem>
                                    {state.users.map((user) => (
                                        <SelectItem key={String(user.id)} value={String(user.id)}>
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-5 w-5">
                                                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                                                    <AvatarFallback className="text-xs">{user.initials}</AvatarFallback>
                                                </Avatar>
                                                {user.name}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </motion.div>

                        {/* Due Date */}
                        <motion.div className="space-y-2">
                            <Label>Fecha de vencimiento</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal transition-all duration-200 hover:border-primary/50",
                                            !dueDate && "text-muted-foreground",
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {dueDate ? format(dueDate, "PPP", { locale: es }) : "Seleccionar una fecha"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
                                </PopoverContent>
                            </Popover>
                        </motion.div>
                    </div>

                    {/* Estimated Time */}
                    <motion.div className="space-y-2">
                        <Label htmlFor="estimatedTime">Tiempo estimado (horas)</Label>
                        <div className="flex items-center gap-2">
                            <motion.div whileHover={{ scale: 1.1 }}>
                                <Clock className="h-4 w-4 text-muted-foreground" />
                            </motion.div>
                            <Input
                                id="estimatedTime"
                                type="number"
                                min="0"
                                step="0.5"
                                value={formData.estimatedTime}
                                onChange={(e) => setFormData((prev) => ({ ...prev, estimatedTime: Number(e.target.value) }))}
                                placeholder="0"
                                className="w-32 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                            />
                            <span className="text-sm text-muted-foreground">horas</span>
                        </div>
                    </motion.div>

                    {/* Etiquetas */}
                    <motion.div className="space-y-2">
                        <Label>Etiquetas</Label>
                        <AnimatePresence>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {formData.tags.map((tag, index) => (
                                    <motion.div
                                        key={tag}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <Badge variant="secondary" className="flex items-center gap-1 hover-lift">
                                            <Tag className="h-3 w-3" />
                                            {tag}
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="h-4 w-4 p-0 hover:bg-transparent"
                                                onClick={() => removeTag(tag)}
                                            >
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </Badge>
                                    </motion.div>
                                ))}
                            </div>
                        </AnimatePresence>
                        <div className="flex gap-2">
                            <Input
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                placeholder="Agregar etiqueta..."
                                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                            />
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button type="button" variant="outline" size="sm" onClick={addTag}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Actions */}
                    <motion.div className="flex justify-end gap-2 pt-4">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
                                Cancelar
                            </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button type="submit" disabled={loading || !formData.title.trim()} className="btn-primary">
                                <AnimatePresence mode="wait">
                                    {loading ? (
                                        <motion.div
                                            key="loading"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            className="flex items-center gap-2"
                                        >
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            {task ? "Actualizando..." : "Creando..."}
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="save"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            className="flex items-center gap-2"
                                        >
                                            <Save className="h-4 w-4" />
                                            {task ? "Actualizar Tarea" : "Crear Tarea"}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
