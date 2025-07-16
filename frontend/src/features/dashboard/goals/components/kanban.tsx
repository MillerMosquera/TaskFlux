import { Badge } from "@/components/ui/badge";
import { getStatusColor, getStatusLabel } from "@/features/dashboard/goals/utils/goalHelper";
import { AnimatePresence } from "framer-motion";
import { GoalCard } from "./goal-card";


export const KanbanColumn = ({ status, goals, onGoalClick }: { 
    status: string; 
    goals: any[];
    onGoalClick?: (goalId: string) => void;
}) => (
    <div className="w-full">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge className={`${getStatusColor(status)} text-white`}>
            {getStatusLabel(status)}
          </Badge>
          <span className="text-sm text-muted-foreground">({goals.length})</span>
        </div>
      </div>
      <div className="space-y-3">
        <AnimatePresence>
          {goals.map((goal, index) => (
            <GoalCard key={goal.id} goal={goal} index={index} onGoalClick={onGoalClick}/>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )