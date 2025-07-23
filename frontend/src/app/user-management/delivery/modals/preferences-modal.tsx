import {useState} from "react"
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/shared/ui/dialog"
import {Button} from "@/shared/ui/button"
import {Label} from "@/shared/ui/label"
import {Switch} from "@/shared/ui/switch"
import {Card, CardContent, CardHeader, CardTitle} from "@/shared/ui/card"
import {Separator} from "@/shared/ui/separator"
import {useApp} from "@/app/context/app-context"
import {Save, X, Bell, Moon, Sun, Monitor, Globe, Shield, Zap, Volume2, Smartphone} from "lucide-react"

interface PreferencesModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function PreferencesModal({open, onOpenChange}: PreferencesModalProps) {
    useApp()
    const [preferences, setPreferences] = useState({
        theme: "system", // light, dark, system
        notifications: {
            email: true,
            push: true,
            desktop: true,
            taskReminders: true,
            goalDeadlines: true,
            teamUpdates: true,
            weeklyDigest: true,
        },
        privacy: {
            profileVisibility: "team", // public, team, private
            activityTracking: true,
            dataCollection: false,
        },
        productivity: {
            focusMode: false,
            timeTracking: true,
            aiSuggestions: true,
            smartNotifications: true,
        },
        display: {
            compactMode: false,
            showAvatars: true,
            animationsEnabled: true,
            highContrast: false,
        },
        language: "en",
        timezone: "UTC",
    })


    const handlePreferenceChange = (category: string, key: string, value: any) => {
        setPreferences((prev) => {
            const currentCategory = prev[category as keyof typeof prev]
            if (typeof currentCategory === "object" && currentCategory !== null) {
                return {
                    ...prev,
                    [category]: {
                        ...currentCategory,
                        [key]: value,
                    },
                }
            }
            // Si no es objeto, actualiza directamente
            return {
                ...prev,
                [category]: value,
            }
        })
    }


    const handleSinglePreferenceChange = (key: string, value: any) => {
        setPreferences((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    const handleSave = () => {
        // In a real app, this would save to backend
        console.log("Saving preferences:", preferences)
        onOpenChange(false)
    }

    const resetToDefaults = () => {
        setPreferences({
            theme: "system",
            notifications: {
                email: true,
                push: true,
                desktop: true,
                taskReminders: true,
                goalDeadlines: true,
                teamUpdates: true,
                weeklyDigest: true,
            },
            privacy: {
                profileVisibility: "team",
                activityTracking: true,
                dataCollection: false,
            },
            productivity: {
                focusMode: false,
                timeTracking: true,
                aiSuggestions: true,
                smartNotifications: true,
            },
            display: {
                compactMode: false,
                showAvatars: true,
                animationsEnabled: true,
                highContrast: false,
            },
            language: "en",
            timezone: "UTC",
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Monitor className="h-5 w-5"/>
                        Preferences
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Appearance */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Sun className="h-5 w-5"/>
                                Appearance
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <Label>Theme</Label>
                                <div className="flex gap-2">
                                    {[
                                        {value: "light", label: "Light", icon: Sun},
                                        {value: "dark", label: "Dark", icon: Moon},
                                        {value: "system", label: "System", icon: Monitor},
                                    ].map((theme) => (
                                        <Button
                                            key={theme.value}
                                            variant={preferences.theme === theme.value ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => handleSinglePreferenceChange("theme", theme.value)}
                                            className="flex items-center gap-2"
                                        >
                                            <theme.icon className="h-4 w-4"/>
                                            {theme.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Compact Mode</Label>
                                        <p className="text-sm text-muted-foreground">Reduce spacing and padding</p>
                                    </div>
                                    <Switch
                                        checked={preferences.display.compactMode}
                                        onCheckedChange={(checked) => handlePreferenceChange("display", "compactMode", checked)}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Show Avatars</Label>
                                        <p className="text-sm text-muted-foreground">Display user profile pictures</p>
                                    </div>
                                    <Switch
                                        checked={preferences.display.showAvatars}
                                        onCheckedChange={(checked) => handlePreferenceChange("display", "showAvatars", checked)}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Animations</Label>
                                        <p className="text-sm text-muted-foreground">Enable smooth transitions</p>
                                    </div>
                                    <Switch
                                        checked={preferences.display.animationsEnabled}
                                        onCheckedChange={(checked) => handlePreferenceChange("display", "animationsEnabled", checked)}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>High Contrast</Label>
                                        <p className="text-sm text-muted-foreground">Improve accessibility</p>
                                    </div>
                                    <Switch
                                        checked={preferences.display.highContrast}
                                        onCheckedChange={(checked) => handlePreferenceChange("display", "highContrast", checked)}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Notifications */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Bell className="h-5 w-5"/>
                                Notifications
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="flex items-center gap-2">
                                            <Volume2 className="h-4 w-4"/>
                                            Email Notifications
                                        </Label>
                                        <p className="text-sm text-muted-foreground">Receive updates via email</p>
                                    </div>
                                    <Switch
                                        checked={preferences.notifications.email}
                                        onCheckedChange={(checked) => handlePreferenceChange("notifications", "email", checked)}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="flex items-center gap-2">
                                            <Smartphone className="h-4 w-4"/>
                                            Push Notifications
                                        </Label>
                                        <p className="text-sm text-muted-foreground">Mobile and browser alerts</p>
                                    </div>
                                    <Switch
                                        checked={preferences.notifications.push}
                                        onCheckedChange={(checked) => handlePreferenceChange("notifications", "push", checked)}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Desktop Notifications</Label>
                                        <p className="text-sm text-muted-foreground">System notifications</p>
                                    </div>
                                    <Switch
                                        checked={preferences.notifications.desktop}
                                        onCheckedChange={(checked) => handlePreferenceChange("notifications", "desktop", checked)}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Task Reminders</Label>
                                        <p className="text-sm text-muted-foreground">Due date alerts</p>
                                    </div>
                                    <Switch
                                        checked={preferences.notifications.taskReminders}
                                        onCheckedChange={(checked) => handlePreferenceChange("notifications", "taskReminders", checked)}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Goal Deadlines</Label>
                                        <p className="text-sm text-muted-foreground">Goal milestone alerts</p>
                                    </div>
                                    <Switch
                                        checked={preferences.notifications.goalDeadlines}
                                        onCheckedChange={(checked) => handlePreferenceChange("notifications", "goalDeadlines", checked)}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Team Updates</Label>
                                        <p className="text-sm text-muted-foreground">Activity from team members</p>
                                    </div>
                                    <Switch
                                        checked={preferences.notifications.teamUpdates}
                                        onCheckedChange={(checked) => handlePreferenceChange("notifications", "teamUpdates", checked)}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Privacy & Security */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Shield className="h-5 w-5"/>
                                Privacy & Security
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <Label>Profile Visibility</Label>
                                <div className="flex gap-2">
                                    {[
                                        {value: "public", label: "Public"},
                                        {value: "team", label: "Team Only"},
                                        {value: "private", label: "Private"},
                                    ].map((visibility) => (
                                        <Button
                                            key={visibility.value}
                                            variant={preferences.privacy.profileVisibility === visibility.value ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => handlePreferenceChange("privacy", "profileVisibility", visibility.value)}
                                        >
                                            {visibility.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Activity Tracking</Label>
                                        <p className="text-sm text-muted-foreground">Track time and productivity</p>
                                    </div>
                                    <Switch
                                        checked={preferences.privacy.activityTracking}
                                        onCheckedChange={(checked) => handlePreferenceChange("privacy", "activityTracking", checked)}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Data Collection</Label>
                                        <p className="text-sm text-muted-foreground">Analytics and usage data</p>
                                    </div>
                                    <Switch
                                        checked={preferences.privacy.dataCollection}
                                        onCheckedChange={(checked) => handlePreferenceChange("privacy", "dataCollection", checked)}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Productivity */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Zap className="h-5 w-5"/>
                                Productivity
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Focus Mode</Label>
                                        <p className="text-sm text-muted-foreground">Hide distractions</p>
                                    </div>
                                    <Switch
                                        checked={preferences.productivity.focusMode}
                                        onCheckedChange={(checked) => handlePreferenceChange("productivity", "focusMode", checked)}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Time Tracking</Label>
                                        <p className="text-sm text-muted-foreground">Automatic time logging</p>
                                    </div>
                                    <Switch
                                        checked={preferences.productivity.timeTracking}
                                        onCheckedChange={(checked) => handlePreferenceChange("productivity", "timeTracking", checked)}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>AI Suggestions</Label>
                                        <p className="text-sm text-muted-foreground">Smart recommendations</p>
                                    </div>
                                    <Switch
                                        checked={preferences.productivity.aiSuggestions}
                                        onCheckedChange={(checked) => handlePreferenceChange("productivity", "aiSuggestions", checked)}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Smart Notifications</Label>
                                        <p className="text-sm text-muted-foreground">Context-aware alerts</p>
                                    </div>
                                    <Switch
                                        checked={preferences.productivity.smartNotifications}
                                        onCheckedChange={(checked) => handlePreferenceChange("productivity", "smartNotifications", checked)}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Language & Region */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Globe className="h-5 w-5"/>
                                Language & Region
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="language">Language</Label>
                                    <select
                                        id="language"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={preferences.language}
                                        onChange={(e) => handleSinglePreferenceChange("language", e.target.value)}
                                    >
                                        <option value="en">English</option>
                                        <option value="es">Español</option>
                                        <option value="fr">Français</option>
                                        <option value="de">Deutsch</option>
                                        <option value="it">Italiano</option>
                                        <option value="pt">Português</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="timezone">Timezone</Label>
                                    <select
                                        id="timezone"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={preferences.timezone}
                                        onChange={(e) => handleSinglePreferenceChange("timezone", e.target.value)}
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
                </div>

                <Separator/>

                <div className="flex justify-between">
                    <Button variant="outline" onClick={resetToDefaults}>
                        Reset to Defaults
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => onOpenChange(false)}>
                            <X className="h-4 w-4 mr-2"/>
                            Cancel
                        </Button>
                        <Button onClick={handleSave}>
                            <Save className="h-4 w-4 mr-2"/>
                            Save Preferences
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
