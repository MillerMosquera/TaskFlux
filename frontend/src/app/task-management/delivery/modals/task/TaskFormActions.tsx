import { Button } from "@/shared/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { Loader2, Save } from "lucide-react"

interface TaskFormActionsProps {
    isEditing: boolean
    loading: boolean
    canSubmit: boolean
    onCancel: () => void
}

export function TaskFormActions({ isEditing, loading, canSubmit, onCancel }: TaskFormActionsProps) {
    return (
        <motion.div className="flex justify-end gap-2 pt-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
                    Cancelar
                </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button type="submit" disabled={loading || !canSubmit} className="btn-primary">
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex items-center gap-2"
                            >
                                <Loader2 className="h-4 w-4 animate-spin" />
                                {isEditing ? "Actualizando..." : "Creando..."}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="save"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex items-center gap-2"
                            >
                                <Save className="h-4 w-4" />
                                {isEditing ? "Actualizar Tarea" : "Crear Tarea"}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Button>
            </motion.div>
        </motion.div>
    )
}
