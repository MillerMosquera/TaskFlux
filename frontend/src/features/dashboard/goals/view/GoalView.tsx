import { useApp } from "@/app/context/app-context"
import { Button } from "@/components/ui/button"
import { StatsCardsGoal } from "@/features/dashboard/goals/components/stat-cards"
import { GoalModal } from "@/features/dashboard/modals/goal-modal"
import { motion } from "framer-motion"
import {
    Plus,
    Target
} from "lucide-react"
import { useMemo, useState } from "react"
import { containerVariants } from "../../../home/utils/variants"
import { Controls } from "../components/controls"
import { GoalContent } from "../components/goal-content"
import { GoalDetailModal } from "../components/goal-detail/GoalDetailModal"
import { SortBy, ViewMode } from "../utils/GoalType"

export function GoalsView() {
    const { state } = useApp()
    const [goalModalOpen, setGoalModalOpen] = useState(false)
    const [selectedGoalId, setSelectedGoalId] = useState<string>("")
    const [goalDetailOpen, setGoalDetailOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [sortBy, setSortBy] = useState<SortBy>("dueDate")
    const [viewMode, setViewMode] = useState<ViewMode>("grid")

    const spaceGoals = state.goals.filter((goal) => goal.spaceId === state.currentSpace)

    const filteredAndSortedGoals = useMemo(() => {
        let filtered = spaceGoals

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(
                (goal) =>
                    goal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    goal.description?.toLowerCase().includes(searchQuery.toLowerCase()),
            )
        }

        // Filter by status
        if (statusFilter !== "all") {
            filtered = filtered.filter((goal) => goal.status === statusFilter)
        }

        // Sort
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "dueDate":
                    if (!a.dueDate && !b.dueDate) return 0
                    if (!a.dueDate) return 1
                    if (!b.dueDate) return -1
                    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
                case "progress":
                    return b.progress - a.progress
                case "title":
                    return a.title.localeCompare(b.title)
                case "createdAt":
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                default:
                    return 0
            }
        })

        return filtered
    }, [spaceGoals, searchQuery, statusFilter, sortBy])


    return (
        <motion.div
            className="p-6 space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Stats Cards - Versión simplificada */}
            <div className="mb-6">
                <StatsCardsGoal />
            </div>

            {/* Toolbar simplificado */}
            <div>
                <Controls
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    onNewGoal={() => setGoalModalOpen(true)}
                />
            </div>


            {/* Goals Content */}
            <div>
                <GoalContent
                    goals={filteredAndSortedGoals}
                    query={searchQuery}
                    filter={statusFilter}
                    sort={sortBy}
                    viewMode={viewMode}
                    onGoalClick={(goalId: string) => {
                        setSelectedGoalId(goalId)
                        setGoalDetailOpen(true)
                    }}
                />
            </div>

            {filteredAndSortedGoals.length === 0 && (
                <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <Target className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="text-lg font-medium mb-2">No goals found</h3>
                    <p className="text-muted-foreground mb-4">
                        {searchQuery || statusFilter !== "all"
                            ? "Try adjusting your filters or search query."
                            : "Create your first goal to get started with tracking your objectives."}
                    </p>
                    <Button onClick={() => setGoalModalOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Goal
                    </Button>
                </motion.div>
            )}
            <GoalModal open={goalModalOpen} onOpenChange={setGoalModalOpen} />
            {selectedGoalId && (
                <GoalDetailModal 
                    goalId={selectedGoalId} 
                    open={goalDetailOpen} 
                    onOpenChange={(open) => {
                        setGoalDetailOpen(open)
                        if (!open) {
                            setSelectedGoalId("")
                        }
                    }} 
                />
            )}
        </motion.div>
    )
}
