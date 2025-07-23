import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { Button } from "@/shared/ui/button"
import { Calendar } from "@/shared/ui/calendar"
import { Label } from "@/shared/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { cn } from "@/shared/utils/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { motion } from "framer-motion"
import { CalendarIcon, User } from "lucide-react"

interface User {
    id: string
    name: string
    avatar?: string
    initials: string
}

interface TaskAssigneeAndDateProps {
    assigneeId: string
    dueDate: Date | undefined
    users: User[]
    onAssigneeChange: (value: string) => void
    onDateChange: (date: Date | undefined) => void
}

export function TaskAssigneeAndDate({
    assigneeId,
    dueDate,
    users,
    onAssigneeChange,
    onDateChange
}: TaskAssigneeAndDateProps) {
    return (
        <div className="grid grid-cols-2 gap-4">
            {/* Assignee */}
            <motion.div className="space-y-2">
                <Label>Asignar a</Label>
                <Select
                    value={assigneeId}
                    onValueChange={(value) => onAssigneeChange(value === "unassigned" ? "" : value)}
                >
                    <SelectTrigger className="transition-all duration-200 hover:border-primary/50">
                        <SelectValue placeholder="Seleccionar">
                            {assigneeId && (
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    {users.find((u) => u.id === assigneeId)?.name}
                                </div>
                            )}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="unassigned">Sin asignar</SelectItem>
                        {users.map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-5 w-5">
                                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                                        <AvatarFallback className="text-xs">{user.initials}</AvatarFallback>
                                    </Avatar>
                                    {user.name}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </motion.div>

            {/* Due Date */}
            <motion.div className="space-y-2">
                <Label>Fecha de vencimiento</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className={cn(
                                "w-full justify-start text-left font-normal transition-all duration-200 hover:border-primary/50",
                                !dueDate && "text-muted-foreground",
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dueDate ? format(dueDate, "PPP", { locale: es }) : "Seleccionar una fecha"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={dueDate} onSelect={onDateChange} initialFocus />
                    </PopoverContent>
                </Popover>
            </motion.div>
        </div>
    )
}
