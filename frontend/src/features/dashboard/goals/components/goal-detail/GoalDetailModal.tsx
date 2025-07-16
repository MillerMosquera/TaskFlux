
import { useApp } from "@/app/context/app-context"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { GoalInfo } from "@/features/dashboard/goals/components/goal-detail/GoalInfo"
import { TargetsSection } from "@/features/dashboard/goals/components/goal-detail/GoalTargets"
import { useGoalForm } from "@/features/dashboard/goals/hooks/useGoalForm"
import { useTargetManagement } from "@/features/dashboard/goals/hooks/useTargetManagment"
import { GoalDetailModalProps } from "@/features/dashboard/goals/utils/types"
import { Edit, Save, Target, X } from "lucide-react"
import { useState } from "react"

export function GoalDetailModal({ goalId, open, onOpenChange }: GoalDetailModalProps) {
  const { state, dispatch } = useApp()
  const [isEditing, setIsEditing] = useState(false)

  const goal = state.goals.find((g) => g.id === goalId)
  const owner = goal ? state.users.find((u) => u.id === goal.ownerId) : null

  const { formData, dueDate, updateFormData, setDueDate } = useGoalForm(goal ?? null)
  const { handleAddTarget, handleToggleTarget, handleDeleteTarget } = useTargetManagement(goal ?? null, dispatch)

  if (!goal) return null

  const handleSave = () => {
    dispatch({
      type: "UPDATE_GOAL",
      payload: {
        id: goalId,
        updates: {
          ...formData,
          dueDate: dueDate?.toISOString().split("T")[0],
        },
      },
    })
    setIsEditing(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Target className="h-6 w-6" />
              <DialogTitle className="text-xl">{isEditing ? "Edit Goal" : goal.title}</DialogTitle>
            </div>
            <div className="flex items-center gap-2">
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Goal Info */}
          <GoalInfo
            goal={goal}
            owner={owner ?? null}
            spaces={state.spaces}
            users={state.users}
            isEditing={isEditing}
            formData={formData}
            dueDate={dueDate}
            onFormDataChange={updateFormData}
            onDueDateChange={setDueDate}
          />

          {/* Targets Section */}
          <TargetsSection
            targets={goal.targets}
            onAddTarget={handleAddTarget}
            onToggleTarget={handleToggleTarget}
            onDeleteTarget={handleDeleteTarget}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}