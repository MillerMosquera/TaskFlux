import {
    Calendar,
    Camera,
    Code,
    FileText,
    Music,
    Palette,
    Target,
    Zap,
} from "lucide-react"
import { useState } from "react"

import { useSpaces } from "@/app/workspace-management/interface-adapters/spaces-context"
import { Button } from "@/shared/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/shared/ui/dialog"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Textarea } from "@/shared/ui/textarea"

interface CreateProjectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  spaceId: string
}

const projectIcons = [
  { icon: FileText, name: "Documento", color: "text-blue-500" },
  { icon: Calendar, name: "Calendario", color: "text-green-500" },
  { icon: Target, name: "Meta", color: "text-red-500" },
  { icon: Zap, name: "Rápido", color: "text-yellow-500" },
  { icon: Code, name: "Código", color: "text-purple-500" },
  { icon: Palette, name: "Diseño", color: "text-pink-500" },
  { icon: Camera, name: "Foto", color: "text-orange-500" },
  { icon: Music, name: "Música", color: "text-indigo-500" },
]

export function CreateProjectModal({ open, onOpenChange, spaceId }: CreateProjectModalProps) {
  const { addProject } = useSpaces()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: FileText,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name.trim()) {
      addProject(spaceId, {
        name: formData.name.trim(),
        description: formData.description.trim(),
        icon: formData.icon,
      })
      setFormData({ name: "", description: "", icon: FileText })
      onOpenChange(false)
    }
  }

  const handleIconSelect = (icon: any) => {
    setFormData(prev => ({ ...prev, icon }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Proyecto</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="project-name">Nombre del Proyecto</Label>
            <Input
              id="project-name"
              placeholder="Ej. Campaña de Marketing, App Móvil..."
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-description">Descripción (opcional)</Label>
            <Textarea
              id="project-description"
              placeholder="Describe brevemente este proyecto..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Ícono del Proyecto</Label>
            <div className="grid grid-cols-4 gap-2">
              {projectIcons.map(({ icon: Icon, name, color }) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => handleIconSelect(Icon)}
                  className={`p-3 rounded-lg border-2 transition-colors hover:bg-muted/50 ${
                    formData.icon === Icon 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border'
                  }`}
                >
                  <Icon className={`h-6 w-6 mx-auto ${color}`} />
                  <span className="text-xs mt-1 block text-center">{name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Crear Proyecto
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
