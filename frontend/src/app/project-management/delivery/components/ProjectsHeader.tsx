import { Filter, MoreHorizontal } from "lucide-react"

import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shared/ui/popover"

interface ProjectsHeaderProps {
  selectedPriority: string
  setSelectedPriority: (priority: string) => void
  selectedHealth: string
  setSelectedHealth: (health: string) => void
  projectsCount: number
  totalProjects: number
}

const priorityOptions = [
  { value: "all", label: "Todas las prioridades" },
  { value: "urgent", label: "Urgente", color: "bg-red-500" },
  { value: "high", label: "Alta", color: "bg-orange-500" },
  { value: "medium", label: "Media", color: "bg-yellow-500" },
  { value: "low", label: "Baja", color: "bg-green-500" },
  { value: "none", label: "Ninguna", color: "bg-gray-500" }
]

const healthOptions = [
  { value: "all", label: "Todos los estados" },
  { value: "on-track", label: "En progreso", color: "bg-green-500" },
  { value: "at-risk", label: "En riesgo", color: "bg-yellow-500" },
  { value: "off-track", label: "Retrasado", color: "bg-red-500" },
  { value: "no-update", label: "Sin actualizar", color: "bg-gray-500" }
]

export const ProjectsHeader = ({
  selectedPriority,
  setSelectedPriority,
  selectedHealth,
  setSelectedHealth,
  projectsCount,
  totalProjects
}: ProjectsHeaderProps) => {
  const hasActiveFilters = selectedPriority !== "all" || selectedHealth !== "all"

  const clearFilters = () => {
    setSelectedPriority("all")
    setSelectedHealth("all")
  }

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          {projectsCount} de {totalProjects} proyectos
        </span>
        {hasActiveFilters && (
          <>
            <span className="text-muted-foreground">•</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
            >
              Limpiar filtros
            </Button>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Filtro de prioridad */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={`h-8 ${selectedPriority !== "all" ? "bg-accent" : ""}`}
            >
              <Filter className="mr-2 h-3 w-3" />
              Prioridad
              {selectedPriority !== "all" && (
                <Badge variant="secondary" className="ml-2">
                  1
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-0" align="end">
            <div className="p-2">
              <div className="text-xs font-medium text-muted-foreground mb-2 px-2 py-1">
                Filtrar por prioridad
              </div>
              <div className="space-y-1">
                {priorityOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant="ghost"
                    size="sm"
                    className={`w-full justify-start h-8 ${
                      selectedPriority === option.value ? "bg-accent" : ""
                    }`}
                    onClick={() => setSelectedPriority(option.value)}
                  >
                    {option.color && (
                      <div className={`w-2 h-2 rounded-full ${option.color} mr-2`} />
                    )}
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Filtro de estado */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={`h-8 ${selectedHealth !== "all" ? "bg-accent" : ""}`}
            >
              <Filter className="mr-2 h-3 w-3" />
              Estado
              {selectedHealth !== "all" && (
                <Badge variant="secondary" className="ml-2">
                  1
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-0" align="end">
            <div className="p-2">
              <div className="text-xs font-medium text-muted-foreground mb-2 px-2 py-1">
                Filtrar por estado
              </div>
              <div className="space-y-1">
                {healthOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant="ghost"
                    size="sm"
                    className={`w-full justify-start h-8 ${
                      selectedHealth === option.value ? "bg-accent" : ""
                    }`}
                    onClick={() => setSelectedHealth(option.value)}
                  >
                    {option.color && (
                      <div className={`w-2 h-2 rounded-full ${option.color} mr-2`} />
                    )}
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Opciones adicionales */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Opciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Exportar proyectos</DropdownMenuItem>
            <DropdownMenuItem>Configurar vista</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
