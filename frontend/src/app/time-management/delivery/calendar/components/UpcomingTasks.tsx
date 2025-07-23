import { Badge } from "@/shared/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { getPriorityConfig } from "@/shared/config/ui-config"
import { User } from "lucide-react"

interface UpcomingTasksProps {
  tasks: any[]
  users: any[]
}

export function UpcomingTasks({ tasks, users }: UpcomingTasksProps) {
  // NOTA: Para colores de prioridades, ahora usamos getPriorityConfig() de ui-config.ts

  const getAssignee = (assigneeId?: string) => {
    return users.find((u) => u.id === assigneeId)
  }

  const tasksWithDates = tasks.filter((task) => task.dueDate)

  const upcomingTasks = tasksWithDates
    .filter((task) => new Date(task.dueDate!) >= new Date())
    .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
    .slice(0, 10)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Próximas tareas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {upcomingTasks.map((task) => {
            const assignee = getAssignee(task.assigneeId)
            const daysUntilDue = Math.ceil(
              (new Date(task.dueDate!).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
            )

            return (
              <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg border">
                <div
                  className={`w-3 h-3 rounded-full ${
                    getPriorityConfig(task.priority as any)?.bgColor || 'bg-gray-500'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{task.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Vence {new Date(task.dueDate!).toLocaleDateString()}
                    {daysUntilDue === 0 && " (Hoy)"}
                    {daysUntilDue === 1 && " (Mañana)"}
                    {daysUntilDue > 1 && ` (${daysUntilDue} días)`}
                  </p>
                </div>
                {assignee && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    {assignee.name}
                  </div>
                )}
                <Badge variant="secondary" className="capitalize">
                  {task.status.replace("-", " ")}
                </Badge>
              </div>
            )
          })}
          {upcomingTasks.length === 0 && (
            <p className="text-center text-muted-foreground py-4">No hay próximas tareas</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
