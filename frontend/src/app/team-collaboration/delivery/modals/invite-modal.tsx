import { useApp } from "@/app/context/app-context"
import { Button } from "@/shared/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { Mail, UserPlus } from "lucide-react"
import type React from "react"
import { useState } from "react"

interface InviteModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function InviteModal({ open, onOpenChange }: InviteModalProps) {
    const { dispatch } = useApp()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "miembro" as const,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.name.trim() || !formData.email.trim()) return

        // Generate initials from name
        const nameWords = formData.name.trim().split(" ")
        let initials = ""
        for (let i = 0; i < Math.min(nameWords.length, 2); i++) {
            if (nameWords[i] && nameWords[i].length > 0) {
                initials += nameWords[i].charAt(0).toUpperCase()
            }
        }

        (dispatch as any)({
            type: "ADD_USER",
            payload: {
                name: formData.name.trim(),
                email: formData.email.trim(),
                role: formData.role,
                initials,
                status: "active",
                joinedAt: new Date().toISOString(),
            },
        })

            // Add notification
            (dispatch as any)({
                type: "ADD_NOTIFICATION",
                payload: {
                    type: "mencion",
                    title: "Nuevo miembro invitado",
                    message: `${formData.name} ha sido invitado a unirse al equipo.`,
                    userId: "user-1", // Admin gets notification
                    read: false,
                },
            })

        onOpenChange(false)
        setFormData({ name: "", email: "", role: "miembro" })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <UserPlus className="h-5 w-5" />
                        Invitar a un miembro del equipo
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nombre completo *</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                            placeholder="Nombre completo..."
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Dirección de correo electrónico *</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                placeholder="Dirección de correo electrónico..."
                                className="pl-10"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="role">Rol</Label>
                        <Select
                            value={formData.role}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value as any }))}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="administrador">Administrador - Acceso completo</SelectItem>
                                <SelectItem value="miembro">Miembro - Puede editar y crear</SelectItem>
                                <SelectItem value="espectador">Espectador - Solo lectura</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit">Enviar invitación</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
