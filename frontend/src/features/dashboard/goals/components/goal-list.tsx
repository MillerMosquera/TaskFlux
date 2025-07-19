import { useApp } from "@/app/context/app-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { itemVariants } from "@/features/home/utils/variants";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { AlertCircle, Calendar, CheckCircle, MoreHorizontal, Target } from "lucide-react";
import { getStatusColor, getStatusLabel } from "../utils/goalHelper";




export const GoalListItem = ({ goal, index, onGoalClick }: { 
    goal: any; 
    index: number;
    onGoalClick?: (goalId: string) => void;
}) => {

    const { state, dispatch } = useApp();
    const owner = state.users.find((u) => u.id === goal.ownerId)
    const isOverdue = goal.dueDate && new Date(goal.dueDate) < new Date() && goal.status !== "completed"
    const completedTargets = goal.targets.filter((t: any) => t.completed).length
    const totalTargets = goal.targets.length

    const handleGoalClick = (goalId: string) => {
        if (onGoalClick) {
            onGoalClick(goalId)
        }
    }

    const handleDeleteGoal = (goalId: string) => {
        dispatch({ type: "DELETE_GOAL", payload: goalId })
    }

    return (
        <motion.div variants={itemVariants} custom={index} whileHover={{ x: 4 }} className="group">
            <Card className="cursor-pointer hover-lift" onClick={() => handleGoalClick(goal.id)}>
                <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-primary" />
                            <Badge variant="secondary" className={`${getStatusColor(goal.status)} text-white text-xs`}>
                                {getStatusLabel(goal.status)}
                            </Badge>
                            {isOverdue && (
                                <Badge variant="destructive" className="text-xs">
                                    <AlertCircle className="h-3 w-3 mr-1" />
                                    Vencido
                                </Badge>
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="font-medium truncate">{goal.title}</h3>
                            {goal.description && <p className="text-sm text-muted-foreground truncate">{goal.description}</p>}
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-32">
                                <div className="flex items-center justify-between text-sm mb-1">
                                    <span className="text-muted-foreground">Progreso</span>
                                    <span className="font-medium">{goal.progress}%</span>
                                </div>
                                <Progress value={goal.progress} className="h-2" />
                            </div>

                            {totalTargets > 0 && (
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <CheckCircle className="h-4 w-4" />
                                    <span>
                                        {completedTargets}/{totalTargets}
                                    </span>
                                </div>
                            )}

                            {owner && (
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                        <AvatarImage src={owner.avatar || "/placeholder.svg"} />
                                        <AvatarFallback className="text-xs">{owner.initials}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm text-muted-foreground hidden md:block">{owner.name}</span>
                                </div>
                            )}

                            {goal.dueDate && (
                                <div
                                    className={`flex items-center gap-1 text-sm ${isOverdue ? "text-red-600" : "text-muted-foreground"}`}
                                >
                                    <Calendar className="h-4 w-4" />
                                    <span>{format(new Date(goal.dueDate), "MMM d, yyyy")}</span>
                                </div>
                            )}

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
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
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}