import { Button } from "@/components/ui/button.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus, Share, Target, Users } from "lucide-react";


export const ActionButtons = ({ onNewTask, onNewGoal, onInvite }: {
    onNewTask: () => void
    onNewGoal: () => void
    onInvite: () => void
}) => (
    <>
        <Button variant="outline" size="sm" className="h-8 bg-transparent">
            <Share className="h-4 w-4 mr-1" />
            Compartir
        </Button>

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="sm" className="h-8">
                    <Plus className="h-4 w-4 mr-1" />
                    Nueva
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onNewTask}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Tarea
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onNewGoal}>
                    <Target className="h-4 w-4 mr-2" />
                    Nueva Meta
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onInvite}>
                    <Users className="h-4 w-4 mr-2" />
                    Invitar Miembro
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
)