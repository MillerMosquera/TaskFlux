import { Button } from "@/shared/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CalendarHeaderProps {
  currentDate: Date
  onNavigateMonth: (direction: "prev" | "next") => void
}

export function CalendarHeader({ currentDate, onNavigateMonth }: CalendarHeaderProps) {
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ]

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Calendario</h1>
        <p className="text-muted-foreground mt-1">Ver sus tareas y plazos</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => onNavigateMonth("prev")}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold min-w-[200px] text-center">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <Button variant="outline" size="sm" onClick={() => onNavigateMonth("next")}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
