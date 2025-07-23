import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { itemVariants } from "@/shared/utils/variants"
import { motion } from "framer-motion"
import { BarChart3, Grid3X3, List, Plus, Search } from "lucide-react"

type SortBy = "fechaVencimiento" | "progreso" | "titulo" | "fechaCreacion";
type ViewMode = "grid" | "list" | "kanban"

interface ControlsProps {
    searchQuery: string
    setSearchQuery: (query: string) => void
    statusFilter: string
    setStatusFilter: (filter: string) => void
    sortBy: SortBy
    setSortBy: (sort: SortBy) => void
    viewMode: ViewMode
    setViewMode: (mode: ViewMode) => void
    onNewGoal: () => void
}

export const Controls = ({ 
    searchQuery, 
    setSearchQuery, 
    statusFilter, 
    setStatusFilter, 
    sortBy, 
    setSortBy, 
    viewMode, 
    setViewMode, 
    onNewGoal 
}: ControlsProps) => {

    return (
        <>
            <motion.div className="flex items-center justify-between flex-wrap gap-2 sm:gap-4" variants={itemVariants}>
                <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar metas..."
                            className="pl-9 w-48 sm:w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-32 sm:w-40">
                            <SelectValue placeholder="Estado" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todos">Todos los estados</SelectItem>
                            <SelectItem value="no-iniciado">No Iniciado</SelectItem>
                            <SelectItem value="en-progreso">En Progreso</SelectItem>
                            <SelectItem value="en-espera">En Espera</SelectItem>
                            <SelectItem value="completado">Completado</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortBy)}>
                        <SelectTrigger className="w-32 sm:w-40">
                            <SelectValue placeholder="Ordenar" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="fechaVencimiento">Fecha de Vencimiento</SelectItem>
                            <SelectItem value="progreso">Progreso</SelectItem>
                            <SelectItem value="titulo">Título</SelectItem>
                            <SelectItem value="fechaCreacion">Fecha de Creación</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                        {[
                            { mode: "grid" as const, icon: Grid3X3, label: "Cuadrícula", shortLabel: "Grid" },
                            { mode: "list" as const, icon: List, label: "Lista", shortLabel: "Lista" },
                            { mode: "kanban" as const, icon: BarChart3, label: "Kanban", shortLabel: "Kanban" },
                        ].map((view) => (
                            <motion.div key={view.mode} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                    variant={viewMode === view.mode ? "default" : "ghost"}
                                    size="sm"
                                    className="h-8 px-2 sm:px-3"
                                    onClick={() => setViewMode(view.mode)}
                                >
                                    <view.icon className="h-4 w-4 sm:mr-1" />
                                    <span className="hidden sm:inline ml-1">{view.label}</span>
                                    <span className="sm:hidden sr-only">{view.shortLabel}</span>
                                </Button>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button onClick={onNewGoal} className="btn-primary h-8 px-3 sm:px-4">
                            <Plus className="h-4 w-4 sm:mr-2" />
                            <span className="hidden sm:inline">Nueva Meta</span>
                            <span className="sm:hidden sr-only">Nueva</span>
                        </Button>
                    </motion.div>
                </div>
            </motion.div>
        </>
    )
}
