import { Label } from "@/shared/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { getPriorityConfig } from "@/shared/config/ui-config"
import { motion } from "framer-motion"
import { Flag } from "lucide-react"

interface TaskPriorityAndStatusProps {
    priority: string
    status: string
    onPriorityChange: (value: string) => void
    onStatusChange: (value: string) => void
}

export function TaskPriorityAndStatus({
    priority,
    status,
    onPriorityChange,
    onStatusChange
}: TaskPriorityAndStatusProps) {
    return (
        <div className="grid grid-cols-2 gap-4">
            {/* Priority */}
            <motion.div className="space-y-2">
                <Label>Prioridad</Label>
                <Select value={priority} onValueChange={onPriorityChange}>
                    <SelectTrigger className="transition-all duration-200 hover:border-primary/50">
                        <SelectValue>
                            <div className="flex items-center gap-2">
                                <motion.div whileHover={{ scale: 1.2 }}>
                                    <Flag className="h-4 w-4" />
                                </motion.div>
                                <span className="capitalize">{priority}</span>
                            </div>
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="bajo">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${getPriorityConfig("bajo")?.bgColor || 'bg-gray-500'}`} />
                                {getPriorityConfig("bajo")?.label || "Bajo"}
                            </div>
                        </SelectItem>
                        <SelectItem value="medio">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${getPriorityConfig("medio")?.bgColor || 'bg-gray-500'}`} />
                                {getPriorityConfig("medio")?.label || "Medio"}
                            </div>
                        </SelectItem>
                        <SelectItem value="alto">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${getPriorityConfig("alto")?.bgColor || 'bg-gray-500'}`} />
                                {getPriorityConfig("alto")?.label || "Alto"}
                            </div>
                        </SelectItem>
                        <SelectItem value="urgente">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${getPriorityConfig("urgente")?.bgColor || 'bg-gray-500'}`} />
                                {getPriorityConfig("urgente")?.label || "Urgente"}
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </motion.div>

            {/* Status */}
            <motion.div className="space-y-2">
                <Label>Estado</Label>
                <Select value={status} onValueChange={onStatusChange}>
                    <SelectTrigger className="transition-all duration-200 hover:border-primary/50">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="todo">Por hacer</SelectItem>
                        <SelectItem value="en-progreso">En progreso</SelectItem>
                        <SelectItem value="revision">Revisión</SelectItem>
                        <SelectItem value="completado">Hecho</SelectItem>
                    </SelectContent>
                </Select>
            </motion.div>
        </div>
    )
}
