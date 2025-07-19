// GoalInfo.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { getStatusColor, getStatusLabel, isGoalOverdue } from "@/features/dashboard/goals/utils/goalHelper"
import { Goal, GoalFormData, Space, User } from "@/features/dashboard/goals/utils/types"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { AlertCircle, CalendarIcon } from "lucide-react"

interface GoalInfoProps {
  goal: Goal
  owner: User | null
  spaces: Space[]
  users: User[]
  isEditing: boolean
  formData: GoalFormData
  dueDate: Date | undefined
  onFormDataChange: (data: Partial<GoalFormData>) => void
  onDueDateChange: (date: Date | undefined) => void
}

export function GoalInfo({
  goal,
  owner,
  spaces,
  users,
  isEditing,
  formData,
  dueDate,
  onFormDataChange,
  onDueDateChange
}: GoalInfoProps) {
  const isOverdue = isGoalOverdue(goal.dueDate, goal.status)
  const completedTargets = goal.targets.filter(t => t.completed).length
  const totalTargets = goal.targets.length

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        {isEditing ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="title">Título de la Meta *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => onFormDataChange({ title: e.target.value })}
                placeholder="Ingrese el título de la meta..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => onFormDataChange({ description: e.target.value })}
                placeholder="Describe tu meta..."
                rows={3}
              />
            </div>
          </>
        ) : (
          <div>
            <h3 className="font-medium text-lg">{goal.title}</h3>
            {goal.description && <p className="text-muted-foreground mt-1">{goal.description}</p>}
          </div>
        )}

        {/* Status and Progress */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            {isEditing ? (
              <div className="space-y-2 flex-1">
                <Label>Estado</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => onFormDataChange({ status: value as any })}
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
            ) : (
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className={`${getStatusColor(goal.status)} text-white`}>
                  {getStatusLabel(goal.status)}
                </Badge>
                {isOverdue && (
                  <Badge variant="destructive">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Atrasado
                  </Badge>
                )}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Progreso</Label>
              <span className="text-sm font-medium">{goal.progress}%</span>
            </div>
            <Progress value={goal.progress} className="h-3" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Due Date */}
        <div className="space-y-2">
          <Label>Fecha Límite</Label>
          {isEditing ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dueDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP", { locale: es }) : "Seleccionar fecha"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={dueDate} onSelect={onDueDateChange} initialFocus />
              </PopoverContent>
            </Popover>
          ) : (
            <div
              className={`flex items-center gap-2 text-sm ${isOverdue ? "text-red-600" : "text-muted-foreground"}`}
            >
              <CalendarIcon className="h-4 w-4" />
              {goal.dueDate ? format(new Date(goal.dueDate), "PPP", { locale: es }) : "Sin fecha límite"}
            </div>
          )}
        </div>

        {/* Owner */}
        <div className="space-y-2">
          <Label>Propietario</Label>
          {isEditing ? (
            <Select
              value={formData.ownerId}
              onValueChange={(value) => onFormDataChange({ ownerId: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
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
          ) : (
            <div className="flex items-center gap-2">
              {owner && (
                <>
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={owner.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs">{owner.initials}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{owner.name}</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Space */}
        {isEditing && (
          <div className="space-y-2">
            <Label>Espacio</Label>
            <Select
              value={formData.spaceId}
              onValueChange={(value) => onFormDataChange({ spaceId: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {spaces.map((space) => (
                  <SelectItem key={space.id} value={space.id}>
                    {space.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary">{completedTargets}</div>
            <div className="text-xs text-muted-foreground">Completado</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold">{totalTargets}</div>
            <div className="text-xs text-muted-foreground">Total de Objetivos</div>
          </div>
        </div>
      </div>
    </div>
  )
}