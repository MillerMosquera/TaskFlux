'use client'

import { Project } from '@/app/workspace-management/interface-adapters/spaces-context'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { Progress } from '@/shared/ui/progress'
import { cn } from '@/shared/utils/utils'
import { CalendarDays, Clock, MoreVertical, Plus, Users } from 'lucide-react'

interface ProjectBoardCardProps {
  project: Project
}

// Simulamos datos adicionales del proyecto para la vista de tablero
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

export function ProjectBoardCard({ project }: ProjectBoardCardProps) {
  const extendedData = useProjectExtendedData(project)
  const Icon = project.icon

  return (
    <Card className="h-fit hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-muted">
              <Icon className="size-4" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-sm font-medium truncate">
                {project.name}
              </CardTitle>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Editar proyecto</DropdownMenuItem>
              <DropdownMenuItem>Ver detalles</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {project.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mt-2">
            {project.description}
          </p>
        )}
      </CardHeader>

      <CardContent className="pt-0 space-y-3">
        {/* Estado y Prioridad */}
        <div className="flex gap-2">
          <Badge 
            variant="outline" 
            className={cn("text-xs", getStatusColor(extendedData.status))}
          >
            {extendedData.status}
          </Badge>
          <Badge 
            variant="outline" 
            className={cn("text-xs", getPriorityColor(extendedData.priority))}
          >
            {extendedData.priority}
          </Badge>
        </div>

        {/* Progreso */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">Progreso</span>
            <span>{extendedData.progress}%</span>
          </div>
          <Progress value={extendedData.progress} className="h-2" />
        </div>

        {/* Tareas */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="size-3" />
          <span>{extendedData.tasksCompleted}/{extendedData.totalTasks} tareas</span>
        </div>

        {/* Fecha límite */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CalendarDays className="size-3" />
          <span>{extendedData.dueDate.toLocaleDateString()}</span>
        </div>

        {/* Miembros */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Users className="size-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {project.members.length} miembros
            </span>
          </div>
          <div className="flex -space-x-2">
            {project.members.slice(0, 3).map((member) => (
              <Avatar key={member.id} className="size-6 border-2 border-background">
                <AvatarImage src={member.avatar} />
                <AvatarFallback className="text-xs">
                  {member.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ))}
            {project.members.length > 3 && (
              <div className="size-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                <span className="text-xs text-muted-foreground">
                  +{project.members.length - 3}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface ProjectBoardViewProps {
  projects: Project[]
}

export function ProjectBoardView({ projects }: ProjectBoardViewProps) {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {projects.map((project) => (
          <ProjectBoardCard key={project.id} project={project} />
        ))}
        
        {/* Card para agregar nuevo proyecto */}
        <Card className="h-fit border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center p-6 min-h-[200px]">
            <div className="p-3 rounded-full bg-muted mb-3">
              <Plus className="size-6 text-muted-foreground" />
            </div>
            <h3 className="font-medium text-sm text-center mb-1">
              Crear nuevo proyecto
            </h3>
            <p className="text-xs text-muted-foreground text-center">
              Añade un proyecto a este espacio
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
