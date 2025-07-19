import { useApp } from "@/app/context/app-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Plus, X } from "lucide-react"
import React, { useState } from "react"

interface GoalModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GoalModal({ open, onOpenChange }: GoalModalProps) {
  const { state, dispatch } = useApp()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "no-iniciado" as const,
    progress: 0,
    spaceId: state.currentSpace,
    ownerId: state.currentUser.id,
  })
  const [dueDate, setDueDate] = useState<Date | undefined>()
  const [targets, setTargets] = useState<Array<{ title: string; dueDate?: Date }>>([])
  const [newTargetTitle, setNewTargetTitle] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim()) return

    const goalTargets = targets.map((target, index) => ({
      id: `target-${Date.now()}-${index}`,
      title: target.title,
      completed: false,
      dueDate: target.dueDate?.toISOString().split("T")[0],
    }))

    dispatch({
      type: "ADD_GOAL",
      payload: {
        ...formData,
        dueDate: dueDate?.toISOString().split("T")[0],
        targets: goalTargets,
        completed: false, // o el valor adecuado
        assigneeId: formData.ownerId, // o el valor adecuado
      },
    })

    onOpenChange(false)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      status: "no-iniciado",
      progress: 0,
      spaceId: state.currentSpace,
      ownerId: state.currentUser.id,
    })
    setDueDate(undefined)
    setTargets([])
    setNewTargetTitle("")
  }

  const addTarget = () => {
    if (!newTargetTitle.trim()) return

    setTargets((prev) =>
        [...prev, { title: newTargetTitle, dueDate: undefined }])
    setNewTargetTitle("")
  }

  const removeTarget = (index: number) => {
    setTargets((prev) =>
        prev.filter((_, i) => i !== index))
  }

  const updateTargetDueDate = (index: number, date: Date | undefined) => {
    setTargets((prev) =>
        prev.map((target, i) =>
            (i === index ? { ...target, dueDate: date } : target)))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden scrollbar-hide [&>*]:scrollbar-hide">
        <DialogHeader>
          <DialogTitle>Create New Goal</DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto scrollbar-hide max-h-[calc(90vh-8rem)]">
          <form onSubmit={handleSubmit} className="space-y-6 scrollbar-hide">
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título del Objetivo *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Ingrese el título del objetivo..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Describe tu objetivo..."
                rows={3}
              />
            </div>
          </div>

          {/* Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Estados</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value as any }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-iniciado">No Iniciado</SelectItem>
                  <SelectItem value="en-progreso">En Progreso</SelectItem>
                  <SelectItem value="completado">Completado</SelectItem>
                  <SelectItem value="en-espera">En Espera</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Propietario</Label>
              <Select
                value={formData.ownerId}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, ownerId: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {state.users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
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
            </div>

            <div className="space-y-2">
              <Label>Espacio</Label>
              <Select
                value={formData.spaceId}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, spaceId: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {state.spaces.map((space) => (
                    <SelectItem key={space.id} value={space.id}>
                      {space.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Fecha de Vencimiento</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !dueDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP", { locale: es }) : "Seleccionar fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Targets */}
          <div className="space-y-4">
            <Label>Objetivos (Opcional)</Label>

            {/* Add Target */}
            <div className="flex gap-2">
              <Input
                placeholder="Agregar un objetivo..."
                value={newTargetTitle}
                onChange={(e) => setNewTargetTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTarget())}
                className="flex-1"
              />
              <Button type="button" onClick={addTarget} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Targets List */}
            {targets.length > 0 && (
              <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-hide">
                {targets.map((target, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 border rounded-lg">
                    <div className="flex-1 text-sm">{target.title}</div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm">
                          <CalendarIcon className="h-4 w-4" />
                          {target.dueDate && <span className="ml-1 text-xs">{format(target.dueDate, "MMM d", { locale: es })}</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={target.dueDate}
                          onSelect={(date) => updateTargetDueDate(index, date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTarget(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4 pb-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Crear Objetivo</Button>
          </div>
        </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}