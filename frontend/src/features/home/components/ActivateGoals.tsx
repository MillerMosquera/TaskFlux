import { useApp } from "@/app/context/app-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AnimatePresence, motion } from "framer-motion"
import { Calendar, Target } from "lucide-react"
import { getDateLabel } from "../utils/home-utils"

interface Goal {
    id: string
    title: string
    progress: number
    dueDate?: string
}

interface Props {
    goals: Goal[]
}

const containerVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
}

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.95,
        filter: "blur(4px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            type: "spring" as const,
            stiffness: 350,
            damping: 22,
            duration: 0.6,
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        scale: 0.95,
        filter: "blur(4px)",
        transition: {
            duration: 0.3,
        },
    },
}

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 30,
        scale: 0.9,
        filter: "blur(6px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 25,
            duration: 0.8,
        },
    },
    hover: {
        y: -8,
        scale: 1.03,
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        transition: {
            type: "spring" as const,
            stiffness: 400,
            damping: 20,
        },
    },
    tap: {
        scale: 0.98,
        transition: {
            duration: 0.1,
        },
    },
}

export function ActiveGoals({ goals }: Props) {
    const { dispatch } = useApp()
    
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full"
        >
            <motion.div variants={itemVariants}>
                <Card className="card-hover overflow-hidden">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <motion.div
                                    initial={{ rotate: 0 }}
                                    animate={{ rotate: 360 }}
                                    transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
                                >
                                    <Target className="h-5 w-5 text-primary" />
                                </motion.div>
                                <motion.span
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                >
                                    Active Goals
                                </motion.span>
                            </CardTitle>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7, duration: 0.4 }}
                            >
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => dispatch({ type: "SET_CURRENT_VIEW", payload: "goals" })}
                                    className="hover:bg-primary/10 transition-colors"
                                >
                                    View All
                                </Button>
                            </motion.div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <AnimatePresence mode="wait">
                            {goals.length === 0 ? (
                                <motion.div
                                    className="text-center py-8 text-muted-foreground"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5, duration: 0.6 }}
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7, duration: 0.5 }}
                                    >
                                        <Target className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                        <p>No active goals</p>
                                        <p className="text-sm">Set your first goal to get started!</p>
                                    </motion.div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {goals.map((goal, index) => (
                                        <motion.div
                                            key={goal.id}
                                            variants={cardVariants}
                                            custom={index}
                                            whileHover="hover"
                                            whileTap="tap"
                                            className="p-4 rounded-lg border hover:shadow-md transition-all cursor-pointer group bg-card/50 backdrop-blur-sm"
                                            onClick={() => dispatch({ type: "SET_CURRENT_VIEW", payload: "goals" })}
                                        >
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <motion.h4
                                                        className="font-medium truncate group-hover:text-primary transition-colors"
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.1 + 0.8, duration: 0.4 }}
                                                    >
                                                        {goal.title}
                                                    </motion.h4>
                                                    <motion.div
                                                        whileHover={{ scale: 1.2, rotate: 15 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: index * 0.1 + 0.9, duration: 0.3 }}
                                                    >
                                                        <Target className="h-4 w-4 text-primary" />
                                                    </motion.div>
                                                </div>
                                                <div className="space-y-2">
                                                    <motion.div
                                                        className="flex items-center justify-between text-sm"
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.1 + 1.0, duration: 0.4 }}
                                                    >
                                                        <span className="text-muted-foreground">Progress</span>
                                                        <span className="font-medium">{goal.progress}%</span>
                                                    </motion.div>
                                                    <motion.div
                                                        initial={{ opacity: 0, scaleX: 0 }}
                                                        animate={{ opacity: 1, scaleX: 1 }}
                                                        transition={{ delay: index * 0.1 + 1.1, duration: 0.8, ease: "easeOut" }}
                                                        className="origin-left"
                                                    >
                                                        <Progress value={goal.progress} className="h-2" />
                                                    </motion.div>
                                                </div>
                                                {goal.dueDate && (
                                                    <motion.div
                                                        className="flex items-center gap-1 text-sm text-muted-foreground"
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.1 + 1.2, duration: 0.4 }}
                                                    >
                                                        <Calendar className="h-3 w-3" />
                                                        <span>Due {getDateLabel(goal.dueDate)}</span>
                                                    </motion.div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    )
}
