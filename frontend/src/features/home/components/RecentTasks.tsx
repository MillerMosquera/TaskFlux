import { useApp } from "@/app/context/app-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatePresence, motion } from "framer-motion"
import { Activity, Calendar, CheckCircle, TrendingUp } from "lucide-react"
import { getDateLabel, getTaskPriorityColor } from "../utils/home-utils"

interface Task {
    id: string
    title: string
    dueDate?: string
    priority: string
    listId: string
}

interface Props {
    tasks: Task[]
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.3,
        },
    },
}

const cardVariants = {
    hidden: { 
        opacity: 0, 
        scale: 0.95,
        y: 30,
        filter: "blur(6px)",
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            type: "spring" as const,
            stiffness: 400,
            damping: 25,
            mass: 0.8,
        },
    },
}

const taskItemVariants = {
    hidden: { 
        opacity: 0, 
        x: -30,
        scale: 0.95,
        filter: "blur(4px)",
    },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            type: "spring" as const,
            stiffness: 350,
            damping: 22,
        },
    },
    exit: {
        opacity: 0,
        x: 30,
        scale: 0.95,
        filter: "blur(4px)",
        transition: {
            duration: 0.2,
        },
    },
}

export function RecentTasks({ tasks }: Props) {
    const { dispatch } = useApp()

    return (
        <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2"
        >
            <Card className="hover:shadow-xl transition-all duration-300 transform-gpu border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <motion.div
                                whileHover={{ rotate: 360, scale: 1.1 }}
                                transition={{ duration: 0.6 }}
                            >
                                <Activity className="h-5 w-5 text-primary" />
                            </motion.div>
                            Tareas Recientes
                        </CardTitle>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => dispatch({ type: "SET_CURRENT_VIEW", payload: "tareas" })}
                        >
                            Ver Todo
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <AnimatePresence mode="wait">
                            {tasks.length === 0 ? (
                                <motion.div
                                    className="text-center py-8 text-muted-foreground"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                    >
                                        <CheckCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                    </motion.div>
                                    <p>No hay tareas pendientes</p>
                                    <p className="text-sm">¡Buen trabajo manteniéndote al tanto de las cosas!</p>
                                </motion.div>
                            ) : (
                                tasks.map((task) => (
                                    <motion.div
                                        key={task.id}
                                        variants={taskItemVariants}
                                        whileHover={{ 
                                            x: 6, 
                                            scale: 1.02,
                                            backgroundColor: "rgba(var(--accent), 0.1)",
                                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-all cursor-pointer group transform-gpu"
                                        style={{ perspective: "1000px" }}
                                        onClick={() => {
                                            dispatch({ type: "SET_CURRENT_LIST", payload: task.listId })
                                            dispatch({ type: "SET_CURRENT_VIEW", payload: "tareas" })
                                        }}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.3, rotate: 90 }}
                                            transition={{ type: "spring", stiffness: 400 }}
                                            className={`w-2 h-2 rounded-full ${getTaskPriorityColor(task.priority)}`} 
                                        />
                                        <div className="flex-1 min-w-0">
                                            <motion.p 
                                                className="font-medium truncate group-hover:text-primary transition-colors"
                                                whileHover={{ x: 2 }}
                                            >
                                                {task.title}
                                            </motion.p>
                                            <motion.div 
                                                className="flex items-center gap-2 text-sm text-muted-foreground"
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1 }}
                                            >
                                                {task.dueDate && (
                                                    <motion.span 
                                                        className="flex items-center gap-1"
                                                        whileHover={{ scale: 1.05 }}
                                                    >
                                                        <Calendar className="h-3 w-3" />
                                                        {getDateLabel(task.dueDate)}
                                                    </motion.span>
                                                )}
                                                <motion.div
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <Badge variant="outline" className="text-xs">
                                                        {task.priority}
                                                    </Badge>
                                                </motion.div>
                                            </motion.div>
                                        </div>
                                        <motion.div
                                            whileHover={{ scale: 1.2, rotate: 15 }}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                                            initial={{ rotate: -15 }}
                                            animate={{ rotate: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                        </motion.div>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </motion.div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
