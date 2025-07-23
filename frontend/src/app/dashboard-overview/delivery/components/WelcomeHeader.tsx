import { GoalModal } from "@/app/goal-tracking/delivery/modals/goal-modal"
import { TaskModal } from "@/app/task-management/delivery/modals/task-modal"
import { Button } from "@/shared/ui/button"
import { motion } from "framer-motion"
import { Plus, Target } from "lucide-react"
import { useState } from "react"

interface Props {
    userName: string
  
}

const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 24,
        },
    },
}

export function WelcomeHeader({ userName }: Props) {
    const [taskModalOpen, setTaskModalOpen] = useState(false)
    const [goalModalOpen, setGoalModalOpen] = useState(false)
    return (
        <>
            <motion.div className="mb-8" variants={itemVariants}>
                <div className="flex items-center justify-between">
                    <div>
                        <motion.h1 className="text-3xl font-bold text-foreground"
                            initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            transition={{ delay: 0.2, type: "spring", duration: 0.8 }}>
                            ¡Bienvenido de vuelta, {userName}! 👋
                        </motion.h1>
                        <motion.p className="text-muted-foreground mt-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}>
                            Aquí tienes un resumen de tus tareas y objetivos para hoy
                        </motion.p>
                    </div>
                    <motion.div className="flex gap-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, type: "spring", duration: 0.6 }}>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button onClick={() => setTaskModalOpen(true)} className="smoke-effect">
                                <Plus className="h-4 w-4 mr-2" />
                                Nueva Tarea
                            </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button variant="outline" onClick={() => setGoalModalOpen(true)} className="">
                                <Target className="h-4 w-4 mr-2" />
                                Nuevo Objetivo
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
            <TaskModal open={taskModalOpen} onOpenChange={setTaskModalOpen} />
            <GoalModal open={goalModalOpen} onOpenChange={setGoalModalOpen} />
        </>
    )
}
