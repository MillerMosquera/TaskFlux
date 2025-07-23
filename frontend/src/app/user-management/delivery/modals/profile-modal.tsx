import { useApp, useCurrentUser, useUserStats } from "@/app/context/app-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Separator } from "@/shared/ui/separator"
import { Textarea } from "@/shared/ui/textarea"
import { Briefcase, Camera, Mail, MapPin, Phone, Save, X } from "lucide-react"
import { useState } from "react"

interface ProfileModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function ProfileModal({ open, onOpenChange }: ProfileModalProps) {
    const { state, dispatch } = useApp()
    const currentUser = useCurrentUser()
    const userStats = currentUser ? useUserStats(currentUser.id) : null
    
    // Obtener información adicional del perfil del usuario
    const userProfile = state.userProfiles?.find(up => up.userId === currentUser?.id)
    const userRoles = state.userRoles?.filter(ur => ur.userId === currentUser?.id)
    const userSkills = state.userSkills?.filter(us => us.userId === currentUser?.id)
    
    const [formData, setFormData] = useState({
        name: currentUser?.name || "",
        email: currentUser?.email || "",
        phone: userProfile?.phone || "",
        location: userProfile?.location || "",
        bio: userProfile?.bio || "",
        jobTitle: userProfile?.jobTitle || "",
        department: userProfile?.department || "",
        timezone: userProfile?.timezone || "UTC",
    })

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSave = () => {
        if (!currentUser?.id) return

        // Actualizar usuario básico
        dispatch({
            type: "UPDATE_USER",
            payload: {
                id: currentUser.id,
                updates: {
                    name: formData.name,
                    email: formData.email,
                }
            },
        })
        
        // Actualizar perfil de usuario
        dispatch({
            type: "UPDATE_USER_PROFILE", 
            payload: {
                userId: currentUser.id,
                updates: {
                    phone: formData.phone,
                    location: formData.location,
                    bio: formData.bio,
                    jobTitle: formData.jobTitle,
                    department: formData.department,
                    timezone: formData.timezone,
                }
            },
        })
        
        onOpenChange(false)
    }

    const handleAvatarChange = () => {
        if (!currentUser?.id) return

        // In a real app, this would open a file picker
        const newAvatar = prompt("Enter avatar URL:")
        if (newAvatar) {
            dispatch({
                type: "UPDATE_USER",
                payload: {
                    id: currentUser.id,
                    updates: {
                        avatar: newAvatar,
                    }
                },
            })
        }
    }

    if (!currentUser?.id) {
        return null
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{currentUser.initials}</AvatarFallback>
                        </Avatar>
                        Profile Settings
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Profile Picture Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Profile Picture</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center gap-4">
                            <div className="relative">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                                    <AvatarFallback className="text-2xl">{currentUser.initials}</AvatarFallback>
                                </Avatar>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-transparent"
                                    onClick={handleAvatarChange}
                                >
                                    <Camera className="h-4 w-4" />
                                </Button>
                            </div>
                            <div>
                                <h3 className="font-semibold">{currentUser.name}</h3>
                                <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Miembro desde {currentUser.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : "N/A"}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stats Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Activity Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">{userStats?.completedTasks || 0}</div>
                                    <div className="text-sm text-muted-foreground">Tasks Completed</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600">{userStats?.inProgressTasks || 0}</div>
                                    <div className="text-sm text-muted-foreground">Tasks In Progress</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-purple-600">0</div>
                                    <div className="text-sm text-muted-foreground">Goals Achieved</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-orange-600">0</div>
                                    <div className="text-sm text-muted-foreground">Active Projects</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Personal Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Personal Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <div className="relative">
                                        <Input
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange("name", e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            className="pl-10"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange("email", e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="phone"
                                            className="pl-10"
                                            placeholder="+1 (555) 123-4567"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange("phone", e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="location"
                                            className="pl-10"
                                            placeholder="City, Country"
                                            value={formData.location}
                                            onChange={(e) => handleInputChange("location", e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea
                                    id="bio"
                                    placeholder="Tell us about yourself..."
                                    className="min-h-[80px]"
                                    value={formData.bio}
                                    onChange={(e) => handleInputChange("bio", e.target.value)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Work Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Work Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="jobTitle">Job Title</Label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="jobTitle"
                                            className="pl-10"
                                            placeholder="Software Engineer"
                                            value={formData.jobTitle}
                                            onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="department">Department</Label>
                                    <Input
                                        id="department"
                                        placeholder="Engineering"
                                        value={formData.department}
                                        onChange={(e) => handleInputChange("department", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="timezone">Timezone</Label>
                                    <select
                                        id="timezone"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={formData.timezone}
                                        onChange={(e) => handleInputChange("timezone", e.target.value)}
                                    >
                                        <option value="UTC">UTC</option>
                                        <option value="America/New_York">Eastern Time</option>
                                        <option value="America/Chicago">Central Time</option>
                                        <option value="America/Denver">Mountain Time</option>
                                        <option value="America/Los_Angeles">Pacific Time</option>
                                        <option value="Europe/London">London</option>
                                        <option value="Europe/Paris">Paris</option>
                                        <option value="Asia/Tokyo">Tokyo</option>
                                    </select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Skills & Roles */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Skills & Roles</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <Label className="text-sm font-medium">Current Roles</Label>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {userRoles && userRoles.length > 0 ? (
                                            userRoles.map((role) => (
                                                <Badge key={role.id} variant="secondary">
                                                    {role.role}
                                                </Badge>
                                            ))
                                        ) : (
                                            <Badge variant="outline">Member</Badge>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium">Skills</Label>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {userSkills && userSkills.length > 0 ? (
                                            userSkills.map((skill) => (
                                                <Badge key={skill.id} variant="outline">
                                                    {skill.skillName}
                                                </Badge>
                                            ))
                                        ) : (
                                            <>
                                                <Badge variant="outline">JavaScript</Badge>
                                                <Badge variant="outline">React</Badge>
                                                <Badge variant="outline">Project Management</Badge>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Separator />

                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
