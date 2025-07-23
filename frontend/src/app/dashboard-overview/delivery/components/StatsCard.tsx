import { Card, CardContent } from "@/shared/ui/card"
import { Progress } from "@/shared/ui/progress"
import { cardVariants, containerVariants } from "@/shared/utils/variants"
import { motion } from "framer-motion"
import { AlertTriangle, CheckCircle, Clock, Target } from "lucide-react"

interface StatsCardsProps {
    stats: {
        completedTasks: number
        totalTasks: number
        todayTasks: number
        overdueTasks: number
        activeGoals: number
        totalGoals: number
        completionRate: number
    }
}

const statCards = (stats: StatsCardsProps["stats"]) => [
    {
        title: "Tareas Completadas",
        value: `${stats.completedTasks}/${stats.totalTasks}`,
        icon: CheckCircle,
        color: "text-green-600",
        bgColor: "bg-green-100 dark:bg-green-900/20",
        progress: stats.completionRate,
    },
    {
        title: "Vencen Hoy",
        value: stats.todayTasks,
        icon: Clock,
        color: "text-blue-600",
        bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
        title: "Objetivos Activos",
        value: `${stats.activeGoals}/${stats.totalGoals}`,
        icon: Target,
        color: "text-purple-600",
        bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
    {
        title: "Atrasados",
        value: stats.overdueTasks,
        icon: AlertTriangle,
        color: "text-red-600",
        bgColor: "bg-red-100 dark:bg-red-900/20",
    },
]

export function StatsCards({ stats }: StatsCardsProps) {
    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            
                {statCards(stats).map((stat, index) => (
                    <motion.div
                        key={stat.title}
                        variants={cardVariants}
                        whileHover={{ 
                            y: -8,
                            scale: 1.03,
                            
                            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                            transition: {
                                type: "spring",
                                stiffness: 400,
                                damping: 10,
                            },
                        }}
                    >
                        <Card className="hover:shadow-lg transition-shadow duration-200 transform-gpu">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                                        <motion.p 
                                            className="text-2xl font-bold"
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ 
                                                delay: index * 0.1 + 0.4, 
                                                type: "spring", 
                                                stiffness: 300,
                                                damping: 20
                                            }}
                                        >
                                            {stat.value}
                                        </motion.p>
                                        {stat.progress !== undefined && (
                                            <motion.div
                                                className="mt-2"
                                                initial={{ scaleX: 0, opacity: 0 }}
                                                animate={{ scaleX: 1, opacity: 1 }}
                                                transition={{ 
                                                    delay: index * 0.1 + 0.6, 
                                                    duration: 0.8,
                                                    type: "spring",
                                                    stiffness: 200
                                                }}
                                                style={{ transformOrigin: "left" }}
                                            >
                                                <Progress value={stat.progress} className="mt-2 h-2" />
                                            </motion.div>
                                        )}
                                    </div>
                                    <motion.div 
                                        className={`p-3 rounded-full ${stat.bgColor}`}
                                        initial={{ rotate: -180, scale: 0 }}
                                        animate={{ rotate: 0, scale: 1 }}
                                        transition={{
                                            delay: index * 0.1 + 0.3,
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 20
                                        }}
                                        whileHover={{ 
                                            rotate: 360, 
                                            scale: 1.1,
                                            transition: { duration: 0.6 }
                                        }}
                                    >
                                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                    </motion.div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
        
        </motion.div>
    )
}
