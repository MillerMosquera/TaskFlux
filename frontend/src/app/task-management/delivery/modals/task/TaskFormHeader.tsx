import { DialogHeader, DialogTitle } from "@/shared/ui/dialog"
import { motion } from "framer-motion"
import { Flag } from "lucide-react"

interface TaskFormHeaderProps {
    isEditing: boolean
}

export function TaskFormHeader({ isEditing }: TaskFormHeaderProps) {
    return (
        <DialogHeader>
            <DialogTitle className="flex items-center gap-2 pb-4">
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <Flag className="h-5 w-5 text-primary" />
                </motion.div>
                {isEditing ? "Editar tarea" : "Crear nueva tarea"}
            </DialogTitle>
        </DialogHeader>
    )
}
