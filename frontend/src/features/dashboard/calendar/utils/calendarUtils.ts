interface Task {
  id: string
  title: string
  priority: string
  status: string
  dueDate?: string
  assigneeId?: string
  estimatedTime?: number
}

interface User {
  id: string
  name: string
  avatar?: string
  initials: string
}

interface CalendarGridProps {
  currentDate: Date
  tasks: Task[]
  users: User[]
}

interface CalendarDayCellProps {
  day: {
    date: Date
    isCurrentMonth: boolean
    isToday: boolean
    tasks: Task[]
  }
  users: User[]
}

interface UpcomingTasksProps {
  tasks: Task[]
  users: User[]
}