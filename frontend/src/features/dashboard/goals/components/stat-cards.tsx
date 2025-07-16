import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { AlertCircle, BarChart3, CheckCircle, Target, TrendingUp } from "lucide-react";
import { cardVariants, containerVariants, iconVariants, numberVariants } from "../../../home/utils/variants";
import { useGoal } from "../hooks/useGoal";


export const StatsCardsGoal = () => {
    const stats = useGoal();

    const cardData = [
        {
            icon: Target,
            value: stats.total,
            label: "Total Goals",
            color: "text-primary",
            bgColor: "bg-primary/10",
            hoverColor: "hover:bg-primary/20",
        },
        {
            icon: CheckCircle,
            value: stats.completed,
            label: "Completed",
            color: "text-green-600",
            bgColor: "bg-green-100",
            hoverColor: "hover:bg-green-200",
        },
        {
            icon: TrendingUp,
            value: stats.inProgress,
            label: "In Progress",
            color: "text-blue-600",
            bgColor: "bg-blue-100",
            hoverColor: "hover:bg-blue-200",
        },
        {
            icon: AlertCircle,
            value: stats.overdue,
            label: "Overdue",
            color: "text-red-600",
            bgColor: "bg-red-100",
            hoverColor: "hover:bg-red-200",
        },
        {
            icon: BarChart3,
            value: `${stats.avgProgress}%`,
            label: "Avg Progress",
            color: "text-purple-600",
            bgColor: "bg-purple-100",
            hoverColor: "hover:bg-purple-200",
        },
    ]
    

    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-5 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {cardData.map((card, index) => {
                const Icon = card.icon
                return (
                    <motion.div
                        key={index}
                        variants={cardVariants}
                        whileHover={{
                            y: -8,
                            scale: 1.02,
                            transition: {
                                type: "spring",
                                stiffness: 400,
                                damping: 17,
                            }
                        }}
                        whileTap={{
                            scale: 0.98,
                            transition: {
                                type: "spring",
                                stiffness: 600,
                                damping: 20,
                            }
                        }}
                        className="group"
                    >
                        <Card className={`
                            relative overflow-hidden cursor-pointer
                            transition-all duration-300 ease-out
                            ${card.hoverColor}
                            hover:shadow-lg hover:shadow-black/10
                            border-2 border-transparent
                            hover:border-current
                            transform-gpu
                        `}>
                            <CardContent className="p-4 relative z-10">
                                <div className="flex items-center gap-3">
                                    <motion.div
                                        variants={iconVariants}
                                        whileHover={{
                                            scale: 1.2,
                                            rotate: 5,
                                            transition: {
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 15,
                                            }
                                        }}
                                        className={`
                                            flex items-center justify-center
                                            w-10 h-10 rounded-full
                                            ${card.bgColor}
                                            ${card.color}
                                            transition-all duration-300
                                        `}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </motion.div>
                                    <div className="flex-1">
                                        <motion.p
                                            variants={numberVariants}
                                            whileHover={{
                                                scale: 1.1,
                                                transition: {
                                                    type: "spring",
                                                    stiffness: 400,
                                                    damping: 15,
                                                }
                                            }}
                                            className={`
                                                text-2xl font-bold
                                                ${card.color}
                                                transition-all duration-300
                                            `}
                                        >
                                            {card.value}
                                        </motion.p>
                                        <motion.p
                                            className="text-sm text-muted-foreground transition-all duration-300"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 + index * 0.1 }}
                                        >
                                            {card.label}
                                        </motion.p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )
            })}
        </motion.div>
    )
}