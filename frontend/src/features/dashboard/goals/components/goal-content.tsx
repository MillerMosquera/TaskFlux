import { GoalListItem } from "@/features/dashboard/goals/components/goal-list";
import { KanbanColumn } from "@/features/dashboard/goals/components/kanban";
import { useFilteredSortedGoals } from "../hooks/useFilteredSortedGoals";
import { Goal, SortBy, ViewMode } from "../utils/goalType";
import { GoalCard } from "./goal-card";


export const GoalContent = ({
  goals,
  query,
  filter,
  sort,
  viewMode,
  onGoalClick,
}: {
  goals: Goal[],
  query: string,
  filter: string,
  sort: SortBy,
  viewMode: ViewMode,
  onGoalClick: (goalId: string) => void
}) => {
    const filteredAndSortedGoals = useFilteredSortedGoals({
        goals,
        query,
        filter,
        sort,
    });

    return (
        <div>
            {viewMode === "grid" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAndSortedGoals.map((goal, index) => (
                        <div
                            key={goal.id}
                            className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                            style={{
                                animationDelay: `${index * 100}ms`,
                                animationFillMode: 'both'
                            }}
                        >
                            <GoalCard goal={goal} index={index} onGoalClick={onGoalClick} />
                        </div>
                    ))}
                </div>
            )}

            {viewMode === "list" && (
                <div className="space-y-3">
                    {filteredAndSortedGoals.map((goal, index) => (
                        <div
                            key={goal.id}
                            className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                            style={{
                                animationDelay: `${index * 100}ms`,
                                animationFillMode: 'both'
                            }}
                        >
                            <GoalListItem goal={goal} index={index} onGoalClick={onGoalClick} />
                        </div>
                    ))}
                </div>
            )}

            {viewMode === "kanban" && (
                <div className="w-full overflow-hidden">
                    <div className="flex gap-4 pb-4 w-full">
                        {["no-iniciado", "en-progreso", "en-espera", "completado"].map((status, columnIndex) => (
                            <div
                                key={status}
                                className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex-1"
                                style={{
                                    animationDelay: `${columnIndex * 150}ms`,
                                    animationFillMode: 'both'
                                }}
                            >
                                <KanbanColumn
                                    status={status}
                                    goals={filteredAndSortedGoals.filter((goal) => goal.status === status)}
                                    onGoalClick={onGoalClick}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}