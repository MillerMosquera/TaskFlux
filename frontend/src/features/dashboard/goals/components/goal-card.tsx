import { useApp } from "@/app/context/app-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { getStatusColor, getStatusLabel } from "@/features/dashboard/goals/utils/goalHelper"
import { itemVariants } from "@/features/home/utils/variants"
import { format } from "date-fns"
import { motion } from "framer-motion"
import { AlertCircle, Calendar, CheckCircle, MoreHorizontal, Target } from "lucide-react"

export function GoalCard({ goal, index, onGoalClick }: {
    goal: any,
    index: number,
    onGoalClick?: (goalId: string) => void
}) {
    const { state, dispatch } = useApp()
    const owner = state.users.find((u) => u.id === goal.ownerId)
    const isOverdue = goal.dueDate && new Date(goal.dueDate) < new Date() && goal.status !== "completado"
    const completedTargets = goal.targets?.filter((t: any) => t.completed).length || 0
    const totalTargets = goal.targets?.length || 0

    const handleGoalClick = (goalId: string) => {
        if (onGoalClick) {
            onGoalClick(goalId)
        }
    }

    const handleDeleteGoal = (goalId: string) => {
        dispatch({ type: "DELETE_GOAL", payload: goalId })
    }

    return (
        <motion.div variants={itemVariants} custom={index} whileHover={{ y: -4 }} className="group">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden w-full" onClick={() => handleGoalClick(goal.id)}>
                <CardHeader className="pb-3 px-3 sm:px-4">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1 mr-2 overflow-hidden">
                            <Target className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                            <div className="flex items-center gap-1 min-w-0 overflow-hidden">
                                <Badge variant="secondary" className={`${getStatusColor(goal.status)} text-white text-xs whitespace-nowrap`}>
                                    {getStatusLabel(goal.status)}
                                </Badge>
                                {isOverdue && (
                                    <Badge variant="destructive" className="text-xs whitespace-nowrap">
                                        <AlertCircle className="h-3 w-3 mr-1" />
                                        Vencido
                                    </Badge>
                                )}
                            </div>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleGoalClick(goal.id)
                                    }}
                                >
                                    Editar Meta
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleDeleteGoal(goal.id)
                                    }}
                                >
                                    Eliminar Meta
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="px-2 sm:px-3 overflow-hidden">
                        <CardTitle className="text-base sm:text-lg text-center line-clamp-2 break-words leading-tight">{goal.title}</CardTitle>
                        {goal.description && <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 text-center mt-1 break-words">{goal.description}</p>}
                    </div>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 overflow-hidden px-3 sm:px-4">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs sm:text-sm">
                            <span>Progreso</span>
                            <span className="font-medium">{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                    </div>

                    {totalTargets > 0 && (
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                            <span className="truncate">
                                {completedTargets}/{totalTargets} Objetivos completados
                            </span>
                        </div>
                    )}

                    <div className="flex items-center justify-between min-w-0">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                            {owner && (
                                <>
                                    <Avatar className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0">
                                        <AvatarImage src={owner.avatar || "/placeholder.svg"} />
                                        <AvatarFallback className="text-xs">{owner.initials}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs sm:text-sm text-muted-foreground truncate">{owner.name}</span>
                                </>
                            )}
                        </div>
                        {goal.dueDate && (
                            <div
                                className={`flex items-center gap-1 text-xs sm:text-sm flex-shrink-0 ${isOverdue ? "text-red-600" : "text-muted-foreground"}`}
                            >
                                <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span>{format(new Date(goal.dueDate), "MMM d")}</span>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
