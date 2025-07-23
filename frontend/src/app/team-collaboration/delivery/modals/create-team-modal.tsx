import {
    Briefcase,
    Building2,
    GalleryVerticalEnd,
    Globe,
    Rocket,
    Target,
    Users,
    Zap
} from "lucide-react"
import { useState } from "react"

import { useTeams } from "@/app/team-collaboration/interface-adapters/teams-context"
import { Button } from "@/shared/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/shared/ui/dialog"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/select"
import { Textarea } from "@/shared/ui/textarea"

interface CreateTeamModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const teamIcons = [
  { icon: GalleryVerticalEnd, name: "General", color: "text-blue-500" },
  { icon: Briefcase, name: "Trabajo", color: "text-gray-600" },
  { icon: Users, name: "Equipo", color: "text-green-500" },
  { icon: Target, name: "Objetivos", color: "text-red-500" },
  { icon: Zap, name: "Startup", color: "text-yellow-500" },
  { icon: Building2, name: "Empresa", color: "text-blue-600" },
  { icon: Rocket, name: "Proyecto", color: "text-purple-500" },
  { icon: Globe, name: "Global", color: "text-cyan-500" },
]


export function CreateTeamModal({ open, onOpenChange }: CreateTeamModalProps) {
  const { addTeam } = useTeams()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo: GalleryVerticalEnd,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name.trim()) {
      addTeam({
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        logo: formData.logo,
        
        createdBy: "current-user",
      })
      setFormData({ name: "", description: "", logo: GalleryVerticalEnd })
      onOpenChange(false)
    }
  }

  const handleIconSelect = (icon: any) => {
    setFormData(prev => ({ ...prev, logo: icon }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Equipo</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="team-name">Nombre del Equipo</Label>
            <Input
              id="team-name"
              placeholder="Ej. Equipo de Desarrollo, Marketing..."
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="team-description">Descripción (opcional)</Label>
            <Textarea
              id="team-description"
              placeholder="Describe el propósito de este equipo..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>


          <div className="space-y-2">
            <Label>Ícono del Equipo</Label>
            <div className="grid grid-cols-4 gap-3">
              {teamIcons.map(({ icon: Icon, name, color }) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => handleIconSelect(Icon)}
                  className={`p-3 rounded-lg border-2 transition-all hover:bg-muted/50 ${
                    formData.logo === Icon 
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
              Crear Equipo
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
