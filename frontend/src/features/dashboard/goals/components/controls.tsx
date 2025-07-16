import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { BarChart3, Grid3X3, List, Plus, Search } from "lucide-react"
import { itemVariants } from "../../../home/utils/variants"

type SortBy = "dueDate" | "progress" | "title" | "createdAt";
type ViewMode = "grid" | "list" | "kanban"

interface ControlsProps {
    searchQuery: string
    setSearchQuery: (query: string) => void
    statusFilter: string
    setStatusFilter: (filter: string) => void
    sortBy: SortBy
    setSortBy: (sort: SortBy) => void
    viewMode: ViewMode
    setViewMode: (mode: ViewMode) => void
    onNewGoal: () => void
}

export const Controls = ({ 
    searchQuery, 
    setSearchQuery, 
    statusFilter, 
    setStatusFilter, 
    sortBy, 
    setSortBy, 
    viewMode, 
    setViewMode, 
    onNewGoal 
}: ControlsProps) => {

    return (
        <>
            <motion.div className="flex items-center justify-between flex-wrap gap-4" variants={itemVariants}>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search goals..."
                            className="pl-9 w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="not-started">Not Started</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="on-hold">On Hold</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortBy)}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="dueDate">Due Date</SelectItem>
                            <SelectItem value="progress">Progress</SelectItem>
                            <SelectItem value="title">Title</SelectItem>
                            <SelectItem value="createdAt">Created Date</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                        {[
                            { mode: "grid" as const, icon: Grid3X3, label: "Grid" },
                            { mode: "list" as const, icon: List, label: "List" },
                            { mode: "kanban" as const, icon: BarChart3, label: "Kanban" },
                        ].map((view) => (
                            <motion.div key={view.mode} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                    variant={viewMode === view.mode ? "default" : "ghost"}
                                    size="sm"
                                    className="h-8 px-3"
                                    onClick={() => setViewMode(view.mode)}
                                >
                                    <view.icon className="h-4 w-4 mr-1" />
                                    {view.label}
                                </Button>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button onClick={onNewGoal} className="btn-primary">
                            <Plus className="h-4 w-4 mr-2" />
                            New Goal
                        </Button>
                    </motion.div>
                </div>
            </motion.div>
        </>
    )
}