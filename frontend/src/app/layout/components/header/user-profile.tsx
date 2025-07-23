import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/shared/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";

import { useCurrentUser } from "@/app/context/app-context";
import { HelpCircle, LogOut, Settings, User } from "lucide-react";


export default function UserProfile ({ onProfileClick, onPreferencesClick }: {
    onProfileClick: () => void
    onPreferencesClick: () => void
}){
    const currentUser = useCurrentUser()

    if (!currentUser) {
        return null
    }

    return (
        <div className="flex items-center gap-2 ml-4">


            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onPreferencesClick}>
                <Settings className="h-4 w-4" />
            </Button>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{currentUser.initials}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center gap-2 p-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{currentUser.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="text-sm font-medium">{currentUser.name}</p>
                            <p className="text-xs text-muted-foreground">{currentUser.email}</p>
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
