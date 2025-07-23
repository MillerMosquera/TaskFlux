import { Badge } from "@/shared/ui/badge";
import { getGoalStatusConfig } from "@/shared/config/ui-config";
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
          <Badge className={`${getGoalStatusConfig(status as any)?.bgColor || 'bg-gray-500'} text-white`}>
            {getGoalStatusConfig(status as any)?.label || status}
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
