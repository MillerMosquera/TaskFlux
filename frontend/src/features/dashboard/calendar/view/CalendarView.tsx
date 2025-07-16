
import { useApp } from "@/app/context/app-context"
import { CalendarGrid } from "@/features/dashboard/calendar/components/CalendarGrid"
import { CalendarHeader } from "@/features/dashboard/calendar/components/CalendarHeader"
import { UpcomingTasks } from "@/features/dashboard/calendar/components/UpcomingTasks"
import { useState } from "react"

export function CalendarView() {
    const { state } = useApp()
    const [currentDate, setCurrentDate] = useState(new Date())

    const navigateMonth = (direction: "prev" | "next") => {
        const newDate = new Date(currentDate)
        newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1))
        setCurrentDate(newDate)
    }

    return (
        <div className="p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                <CalendarHeader
                    currentDate={currentDate}
                    onNavigateMonth={navigateMonth}
                />

                <CalendarGrid
                    currentDate={currentDate}
                    tasks={state.tasks}
                    users={state.users}
                />

                <UpcomingTasks
                    tasks={state.tasks}
                    users={state.users}
                />
            </div>
        </div>
    )
}