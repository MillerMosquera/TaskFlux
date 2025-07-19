// TargetsSection.tsx
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Target as TargetType } from "@/features/dashboard/goals/utils/types"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Clock, Plus, Target, Trash2 } from "lucide-react"
import { useState } from "react"

interface TargetsSectionProps {
  targets: TargetType[]
  onAddTarget: (title: string, dueDate?: Date) => void
  onToggleTarget: (targetId: string) => void
  onDeleteTarget: (targetId: string) => void
}

export function TargetsSection({ targets, onAddTarget, onToggleTarget, onDeleteTarget }: TargetsSectionProps) {
  const [newTargetTitle, setNewTargetTitle] = useState("")
  const [newTargetDueDate, setNewTargetDueDate] = useState<Date | undefined>()

  const completedTargets = targets.filter(t => t.completed).length
  const totalTargets = targets.length

  const handleAddTarget = () => {
    if (!newTargetTitle.trim()) return

    onAddTarget(newTargetTitle, newTargetDueDate)
    setNewTargetTitle("")
    setNewTargetDueDate(undefined)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Objetivos</h3>
        <Badge variant="outline">
          {completedTargets}/{totalTargets}
        </Badge>
      </div>

      {/* Add New Target */}
      <div className="flex gap-2">
        <Input
          placeholder="Agregar un nuevo objetivo..."
          value={newTargetTitle}
          onChange={(e) => setNewTargetTitle(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAddTarget()}
          className="flex-1"
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={newTargetDueDate}
              onSelect={setNewTargetDueDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Button onClick={handleAddTarget} size="sm">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Targets List */}
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {targets.map((target) => (
          <div key={target.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50">
            <Checkbox
              checked={target.completed}
              onCheckedChange={() => onToggleTarget(target.id)}
            />
            <div className="flex-1 min-w-0">
              <div className={`text-sm ${target.completed ? "line-through text-muted-foreground" : ""}`}>
                {target.title}
              </div>
              {target.dueDate && (
                <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3" />
                  Vence {format(new Date(target.dueDate), "d 'de' MMMM, yyyy", { locale: es })}
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDeleteTarget(target.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

            {targets.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No hay objetivos aún. Agrega tu primer objetivo arriba.</p>
        </div>
      )}
    </div>
  )
}