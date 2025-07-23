import { Mail, Plus, X } from "lucide-react"
import { useState } from "react"

import { TeamMember, useTeams } from "@/app/team-collaboration/interface-adapters/teams-context"
import { Badge } from "@/shared/ui/badge"
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

interface InviteMemberModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  teamId: string
}

interface InviteForm {
  name: string
  email: string
  role: TeamMember['role']
}

export function InviteMemberModal({ open, onOpenChange, teamId }: InviteMemberModalProps) {
  const { addMember, teams } = useTeams()
  const [invites, setInvites] = useState<InviteForm[]>([
    { name: "", email: "", role: "member" }
  ])

  const team = teams.find(t => t.id === teamId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const validInvites = invites.filter(invite => 
      invite.name.trim() && invite.email.trim()
    )

    if (validInvites.length > 0) {
      validInvites.forEach(invite => {
        addMember(teamId, {
          name: invite.name.trim(),
          email: invite.email.trim(),
          role: invite.role,
        })
      })
      
      setInvites([{ name: "", email: "", role: "member" }])
      onOpenChange(false)
    }
  }

  const addInvite = () => {
    setInvites(prev => [...prev, { name: "", email: "", role: "member" }])
  }

  const removeInvite = (index: number) => {
    if (invites.length > 1) {
      setInvites(prev => prev.filter((_, i) => i !== index))
    }
  }

  const updateInvite = (index: number, field: keyof InviteForm, value: string) => {
    setInvites(prev => prev.map((invite, i) => 
      i === index ? { ...invite, [field]: value } : invite
    ))
  }

  const roleLabels = {
    admin: "Administrador",
    member: "Miembro",
    viewer: "Espectador"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Invitar Miembros a {team?.name}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {invites.map((invite, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">
                    Invitación {index + 1}
                  </Label>
                  {invites.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeInvite(index)}
                      className="h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor={`name-${index}`}>Nombre</Label>
                    <Input
                      id={`name-${index}`}
                      placeholder="Nombre completo"
                      value={invite.name}
                      onChange={(e) => updateInvite(index, 'name', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`email-${index}`}>Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id={`email-${index}`}
                        type="email"
                        placeholder="email@ejemplo.com"
                        className="pl-10"
                        value={invite.email}
                        onChange={(e) => updateInvite(index, 'email', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Rol</Label>
                  <Select 
                    value={invite.role} 
                    onValueChange={(value: TeamMember['role']) => 
                      updateInvite(index, 'role', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">
                        <div className="flex items-center gap-2">
                          <Badge variant="destructive" className="text-xs">Admin</Badge>
                          Administrador - Control total
                        </div>
                      </SelectItem>
                      <SelectItem value="member">
                        <div className="flex items-center gap-2">
                          <Badge variant="default" className="text-xs">Member</Badge>
                          Miembro - Acceso completo
                        </div>
                      </SelectItem>
                      <SelectItem value="viewer">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">Viewer</Badge>
                          Espectador - Solo lectura
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addInvite}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar otra invitación
            </Button>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Miembros actuales ({team?.members?.length || 0})</h4>
            <div className="flex flex-wrap gap-2">
              {team?.members?.map(member => (
                <Badge key={member.id} variant="secondary">
                  {member.name} ({roleLabels[member.role]})
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Enviar Invitaciones
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
