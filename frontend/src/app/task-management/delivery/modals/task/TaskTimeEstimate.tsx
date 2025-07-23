import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { motion } from "framer-motion"
import { Clock } from "lucide-react"

interface TaskTimeEstimateProps {
    estimatedTime: number
    onTimeChange: (value: number) => void
}

export function TaskTimeEstimate({ estimatedTime, onTimeChange }: TaskTimeEstimateProps) {
    return (
        <motion.div className="space-y-2">
            <Label htmlFor="estimatedTime">Tiempo estimado (horas)</Label>
            <div className="flex items-center gap-2">
                <motion.div whileHover={{ scale: 1.1 }}>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                </motion.div>
                <Input
                    id="estimatedTime"
                    type="number"
                    min="0"
                    step="0.5"
                    value={estimatedTime}
                    onChange={(e) => onTimeChange(Number(e.target.value))}
                    placeholder="0"
                    className="w-32 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
                <span className="text-sm text-muted-foreground">horas</span>
            </div>
        </motion.div>
    )
}
