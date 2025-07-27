'use client'

import { Project } from '@/app/workspace-management/interface-adapters/spaces-context'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { Progress } from '@/shared/ui/progress'
import { cn } from '@/shared/utils/utils'
import { CalendarDays, Clock, Eye, MoreVertical, Plus, Trash2, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface ProjectListItemProps {
  project: Project
}

// Simulamos datos adicionales del proyecto para la vista de lista
function useProjectExtendedData(_project: Project) {
  // En una implementación real, esto vendría de tu API/store
  return {
    progress: Math.floor(Math.random() * 100),
    priority: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as 'high' | 'medium' | 'low',
    status: ['active', 'pending', 'completed'][Math.floor(Math.random() * 3)] as 'active' | 'pending' | 'completed',
    dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000),
    tasksCompleted: Math.floor(Math.random() * 10),
    totalTasks: Math.floor(Math.random() * 20) + 10,
  }
}

function getPriorityColor(priority: 'high' | 'medium' | 'low') {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800 border-red-200'
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'low':
      return 'bg-green-100 text-green-800 border-green-200'
  }
}

function getStatusColor(status: 'active' | 'pending' | 'completed') {
  switch (status) {
    case 'active':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'pending':
      return 'bg-gray-100 text-gray-800 border-gray-200'
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-200'
  }
}

export function ProjectListItem({ project }: ProjectListItemProps) {
  const extendedData = useProjectExtendedData(project)
  const navigate = useNavigate()
  const Icon = project.icon

  const handleViewDetails = () => {
    navigate(`/dashboard/project/${project.id}`)
  }

  return (
    <div className="flex items-center justify-between p-4 border-b border-border hover:bg-muted/50 transition-all duration-200 ease-in-out hover:shadow-sm hover:scale-[1.01] cursor-pointer group">
      {/* Columna: Proyecto */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="p-2 rounded-md bg-muted flex-shrink-0 transition-all duration-200 group-hover:bg-primary/10 group-hover:scale-110">
          <Icon className="size-4 transition-colors duration-200 group-hover:text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-medium text-sm truncate transition-colors duration-200 group-hover:text-primary">{project.name}</h3>
          {project.description && (
            <p className="text-xs text-muted-foreground truncate transition-colors duration-200 group-hover:text-muted-foreground/80">
              {project.description}
            </p>
          )}
        </div>
      </div>

      {/* Columna: Estado */}
      <div className="flex items-center gap-2 w-32 justify-center">
        <Badge 
          variant="outline" 
          className={cn("text-xs transition-all duration-200 hover:scale-105", getStatusColor(extendedData.status))}
        >
          {extendedData.status}
        </Badge>
      </div>

      {/* Columna: Prioridad */}
      <div className="flex items-center gap-2 w-24 justify-center">
        <Badge 
          variant="outline" 
          className={cn("text-xs transition-all duration-200 hover:scale-105", getPriorityColor(extendedData.priority))}
        >
          {extendedData.priority}
        </Badge>
      </div>

      {/* Columna: Progreso */}
      <div className="flex items-center gap-2 w-32">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-muted-foreground">Progreso</span>
            <span className="text-xs font-medium transition-colors duration-200 group-hover:text-primary">{extendedData.progress}%</span>
          </div>
          <Progress value={extendedData.progress} className="h-1.5 transition-all duration-300" />
        </div>
      </div>

      {/* Columna: Tareas */}
      <div className="flex items-center gap-2 w-24 justify-center">
        <div className="flex items-center gap-1 text-xs text-muted-foreground transition-colors duration-200 group-hover:text-muted-foreground/80">
          <Clock className="size-3 transition-transform duration-200 group-hover:scale-110" />
          <span>{extendedData.tasksCompleted}/{extendedData.totalTasks}</span>
        </div>
      </div>

      {/* Columna: Fecha */}
      <div className="flex items-center gap-2 w-24 justify-center">
        <div className="flex items-center gap-1 text-xs text-muted-foreground transition-colors duration-200 group-hover:text-muted-foreground/80">
          <CalendarDays className="size-3 transition-transform duration-200 group-hover:scale-110" />
          <span>{extendedData.dueDate.toLocaleDateString()}</span>
        </div>
      </div>

      {/* Columna: Miembros */}
      <div className="flex items-center gap-2 w-32 justify-center">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {project.members.slice(0, 2).map((member, index) => (
              <Avatar 
                key={member.id} 
                className="size-6 border-2 border-background transition-all duration-200 hover:scale-110 hover:z-10"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <AvatarImage src={member.avatar} />
                <AvatarFallback className="text-xs">
                  {member.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ))}
            {project.members.length > 2 && (
              <div className="size-6 rounded-full bg-muted border-2 border-background flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-primary/10">
                <span className="text-xs text-muted-foreground">
                  +{project.members.length - 2}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground transition-colors duration-200 group-hover:text-muted-foreground/80">
            <Users className="size-3 transition-transform duration-200 group-hover:scale-110" />
            <span>{project.members.length}</span>
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="flex items-center w-10 justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 transition-all duration-200 hover:scale-110 hover:bg-primary/10 opacity-0 group-hover:opacity-100"
            >
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="animate-in fade-in-0 zoom-in-95 duration-200">
            <DropdownMenuItem 
              onClick={handleViewDetails}
              className="transition-colors duration-200 hover:bg-primary/10 cursor-pointer"
            >
              <Eye className="mr-2 h-4 w-4" />
              Ver detalles
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive transition-colors duration-200 hover:bg-destructive/10 cursor-pointer">
              <Trash2 className="mr-2 h-4 w-4" />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

interface ProjectListViewProps {
  projects: Project[]
}

export function ProjectListView({ projects }: ProjectListViewProps) {
  return (
    <div className="flex flex-col h-full animate-in fade-in-0 duration-300">
      {/* Header de la tabla */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30 text-xs font-medium text-muted-foreground animate-in slide-in-from-top-2 duration-400">
        <div className="flex-1">PROYECTO</div>
        <div className="w-32 text-center">ESTADO</div>
        <div className="w-24 text-center">PRIORIDAD</div>
        <div className="w-32 text-center">PROGRESO</div>
        <div className="w-24 text-center">TAREAS</div>
        <div className="w-24 text-center">FECHA</div>
        <div className="w-32 text-center">MIEMBROS</div>
        <div className="w-10"></div>
      </div>

      {/* Lista de proyectos */}
      <div className="flex-1 overflow-auto">
        {projects.length > 0 ? (
          <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
            {projects.map((project, index) => (
              <div 
                key={project.id}
                className="animate-in fade-in-0 slide-in-from-left-4"
                style={{ animationDelay: `${index * 100}ms`, animationDuration: '400ms' }}
              >
                <ProjectListItem project={project} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 animate-in fade-in-0 zoom-in-50 duration-600">
            <div className="p-4 rounded-full bg-muted mb-4 animate-pulse">
              <Plus className="size-8 text-muted-foreground transition-transform duration-300 hover:scale-110" />
            </div>
            <h3 className="font-medium text-lg mb-2 animate-in slide-in-from-bottom-2 duration-500">No hay proyectos</h3>
            <p className="text-muted-foreground mb-4 animate-in slide-in-from-bottom-2 duration-600" style={{ animationDelay: '100ms' }}>
              Este espacio no tiene proyectos todavía.
            </p>
            <Button className="animate-in slide-in-from-bottom-2 duration-700 hover:scale-105 transition-transform" style={{ animationDelay: '200ms' }}>
              <Plus className="size-4 mr-2" />
              Crear primer proyecto
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}