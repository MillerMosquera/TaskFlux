import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import { CalendarDayCell } from "./CalendarDayCell"

export function CalendarGrid({ currentDate, tasks, users }: CalendarGridProps) {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  
  const tasksWithDates = tasks.filter((task) => task.dueDate)

  // Group tasks by date
  const tasksByDate = tasksWithDates.reduce(
    (acc, task) => {
      const date = task.dueDate!
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(task)
      return acc
    },
    {} as Record<string, typeof tasksWithDates>,
  )

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const current = new Date(startDate)

    for (let i = 0; i < 42; i++) {
      const dateStr = current.toISOString().split("T")[0]
      const isCurrentMonth = current.getMonth() === month
      const isToday = dateStr === new Date().toISOString().split("T")[0]
      const tasksForDay = tasksByDate[dateStr] || []

      days.push({
        date: new Date(current),
        dateStr,
        isCurrentMonth,
        isToday,
        tasks: tasksForDay,
      })

      current.setDate(current.getDate() + 1)
    }

    return days
  }

  const calendarDays = generateCalendarDays()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Calendario de tareas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {/* Day Headers */}
          {dayNames.map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}

          {/* Calendar Days */}
          {calendarDays.map((day, index) => (
            <CalendarDayCell
              key={index}
              day={day}
              users={users}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}