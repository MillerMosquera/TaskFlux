import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock } from "lucide-react"

export function CalendarDayCell({ day, users }: CalendarDayCellProps) {
  const priorityColors = {
    low: "bg-green-500",
    medium: "bg-yellow-500",
    high: "bg-red-500",
    urgent: "bg-purple-500",
  }

  const getAssignee = (assigneeId?: string) => {
    return users.find((u) => u.id === assigneeId)
  }

  return (
    <div
      className={`min-h-[120px] p-2 border rounded-lg ${
        day.isCurrentMonth ? "bg-background" : "bg-muted/30"
      } ${day.isToday ? "ring-2 ring-primary" : ""}`}
    >
      <div
        className={`text-sm font-medium mb-2 ${
          day.isCurrentMonth ? "text-foreground" : "text-muted-foreground"
        } ${day.isToday ? "text-primary font-bold" : ""}`}
      >
        {day.date.getDate()}
      </div>

      <div className="space-y-1">
        {day.tasks.slice(0, 3).map((task) => {
          const assignee = getAssignee(task.assigneeId)
          return (
            <div
              key={task.id}
              className="p-1 rounded text-xs bg-background border hover:shadow-sm transition-shadow cursor-pointer"
            >
              <div className="flex items-center gap-1 mb-1">
                <div
                  className={`w-2 h-2 rounded-full ${
                    priorityColors[task.priority as keyof typeof priorityColors]
                  }`}
                />
                <span className="font-medium truncate flex-1">{task.title}</span>
              </div>
              <div className="flex items-center justify-between">
                {task.estimatedTime && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {task.estimatedTime}h
                  </div>
                )}
                {assignee && (
                  <Avatar className="h-4 w-4">
                    <AvatarImage src={assignee.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs">{assignee.initials}</AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          )
        })}
        {day.tasks.length > 3 && (
          <div className="text-xs text-muted-foreground text-center">+{day.tasks.length - 3} more</div>
        )}
      </div>
    </div>
  )
}