import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Textarea } from "@/shared/ui/textarea"
import { motion } from "framer-motion"
import { Tag } from "lucide-react"

interface TaskBasicFieldsProps {
    title: string
    description: string
    onTitleChange: (value: string) => void
    onDescriptionChange: (value: string) => void
}

export function TaskBasicFields({
    title,
    description,
    onTitleChange,
    onDescriptionChange
}: TaskBasicFieldsProps) {
    return (
        <>
            {/* Title */}
            <motion.div className="space-y-2">
                <Label htmlFor="title" className="flex items-center gap-2">
                    <motion.div whileHover={{ scale: 1.1 }}>
                        <Tag className="h-4 w-4" />
                    </motion.div>
                    Título de la tarea *
                </Label>
                <Input
                    id="title"
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                    placeholder="Ingrese el título de la tarea..."
                    required
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
            </motion.div>

            {/* Description */}
            <motion.div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => onDescriptionChange(e.target.value)}
                    placeholder="Agregar una descripción..."
                    rows={3}
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
            </motion.div>
        </>
    )
}
