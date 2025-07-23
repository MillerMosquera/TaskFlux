import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { getDateLabel } from "@/shared/utils/home-utils"
import { AnimatePresence, motion } from "framer-motion"
import { Calendar, CheckCircle, Target, Zap } from "lucide-react"

interface DeadlineItem {
    id: string
    title: string
    dueDate: string
    completed?: boolean
    status?: string
}

interface Props {
    items: DeadlineItem[]
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

const itemVariants = {
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


export function UpcomingDeadlines({ items }: Props) {
    return (
        <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
        >
            <Card className="hover:shadow-xl transition-all duration-300 transform-gpu border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <motion.div
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Zap className="h-5 w-5 text-orange-500" />
                        </motion.div>
                        Próximos fechas límite
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <AnimatePresence mode="wait">
                            {items.length === 0 ? (
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
                                        <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                    </motion.div>
                                    <p>No hay fechas límite próximas</p>
                                </motion.div>
                            ) : (
                                items.map((item) => (
                                <motion.div
                                    key={item.id}
                                    variants={itemVariants}
                                    whileHover={{ 
                                        x: 6, 
                                        scale: 1.02,
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-all cursor-pointer group transform-gpu"
                                    style={{ perspective: "1000px" }}
                                >
                                    <motion.div
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                        className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/20"
                                    >
                                        {"title" in item ? (
                                            <CheckCircle className="h-4 w-4 text-orange-600" />
                                        ) : (
                                            <Target className="h-4 w-4 text-orange-600" />
                                        )}
                                    </motion.div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium truncate group-hover:text-primary transition-colors">
                                            {item.title}
                                        </p>
                                        <p className="text-sm text-muted-foreground">{getDateLabel(item.dueDate)}</p>
                                    </div>
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
