import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger} from "@/components/ui/dropdown-menu.tsx";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import {Button} from "@/components/ui/button.tsx";

import {HelpCircle, LogOut, Settings, User} from "lucide-react";
import { useApp } from "@/app/context/app-context.tsx";


export default function UserProfile ({ onProfileClick, onPreferencesClick }: {
    onProfileClick: () => void
    onPreferencesClick: () => void
}){
    const { state } = useApp()

    return (
        <div className="flex items-center gap-2 ml-4">


            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onPreferencesClick}>
                <Settings className="h-4 w-4" />
            </Button>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={state.currentUser.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{state.currentUser.initials}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center gap-2 p-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={state.currentUser.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{state.currentUser.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="text-sm font-medium">{state.currentUser.name}</p>
                            <p className="text-xs text-muted-foreground">{state.currentUser.email}</p>
                        </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onProfileClick}>
                        <User className="h-4 w-4 mr-2" />
                        Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onPreferencesClick}>
                        <Settings className="h-4 w-4 mr-2" />
                        Preferences
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <HelpCircle className="h-4 w-4 mr-2" />
                        Help & Support
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}