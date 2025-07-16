

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useApp } from "@/app/context/app-context"
import { Mail, UserPlus } from "lucide-react"

interface InviteModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function InviteModal({ open, onOpenChange }: InviteModalProps) {
    const { dispatch } = useApp()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "member" as const,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.name.trim() || !formData.email.trim()) return

        // Generate initials from name
        const initials = formData.name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)

        dispatch({
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
        dispatch({
            type: "ADD_NOTIFICATION",
            payload: {
                type: "mention",
                title: "New Team Member",
                message: `${formData.name} has been invited to join the team`,
                userId: "user-1", // Admin gets notification
                read: false,
            },
        })

        onOpenChange(false)
        setFormData({ name: "", email: "", role: "member" })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <UserPlus className="h-5 w-5" />
                        Invite Team Member
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                            placeholder="Enter full name..."
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                placeholder="Enter email address..."
                                className="pl-10"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Role</Label>
                        <Select
                            value={formData.role}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value as any }))}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">Admin - Full access</SelectItem>
                                <SelectItem value="member">Member - Can edit and create</SelectItem>
                                <SelectItem value="viewer">Viewer - Read-only access</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Send Invitation</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
