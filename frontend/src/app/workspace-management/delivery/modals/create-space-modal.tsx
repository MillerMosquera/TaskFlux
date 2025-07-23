import {
    Briefcase,
    Folder,
    Heart,
    Home,
    Lightbulb,
    Star,
    Users,
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

interface CreateSpaceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const spaceIcons = [
  { icon: Briefcase, name: "Trabajo", color: "text-blue-500" },
  { icon: Folder, name: "Carpeta", color: "text-yellow-500" },
  { icon: Home, name: "Hogar", color: "text-green-500" },
  { icon: Users, name: "Equipo", color: "text-purple-500" },
  { icon: Lightbulb, name: "Ideas", color: "text-orange-500" },
  { icon: Heart, name: "Personal", color: "text-red-500" },
  { icon: Zap, name: "Energía", color: "text-yellow-400" },
  { icon: Star, name: "Favoritos", color: "text-indigo-500" },
]

export function CreateSpaceModal({ open, onOpenChange }: CreateSpaceModalProps) {
  const { addSpace } = useSpaces()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: Briefcase,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name.trim()) {
      addSpace({
        name: formData.name.trim(),
        description: formData.description.trim(),
        icon: formData.icon,
      })
      setFormData({ name: "", description: "", icon: Briefcase })
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
          <DialogTitle>Crear Nuevo Espacio</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="space-name">Nombre del Espacio</Label>
            <Input
              id="space-name"
              placeholder="Ej. Trabajo, Personal, Estudios..."
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="space-description">Descripción (opcional)</Label>
            <Textarea
              id="space-description"
              placeholder="Describe brevemente este espacio..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Ícono del Espacio</Label>
            <div className="grid grid-cols-4 gap-2">
              {spaceIcons.map(({ icon: Icon, name, color }) => (
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
              Crear Espacio
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
