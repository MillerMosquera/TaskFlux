import {
    ArrowLeft,
    Calendar,
    CheckSquare,
    Clock,
    Edit,
    FileText,
    MoreVertical,
    Plus,
    Settings,
    Trash2,
    Users,
} from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"

import { Badge } from "@/components/ui/badge.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx"
import { Skeleton } from "@/components/ui/skeleton.tsx"
import { useSpaces } from "@/features/dashboard/context/spaces-context.tsx"



// Tipos específicos para este componente
interface ProjectStats {
  tasksCount: number
  completedTasks: number
  membersCount: number
  filesCount: number
}

interface TaskItem {
  id: string
  title: string
  completed: boolean
  status: 'pending' | 'completed' | 'in-progress'
}

interface FileItem {
  id: string
  name: string
  size: string
  uploadedAt: string
}

interface ActivityItem {
  id: string
  user: string
  action: string
  target: string
  timestamp: string
  type: 'task' | 'file' | 'member'
}

// Hook personalizado para la lógica del proyecto
function useProjectData(projectId: string | undefined) {
  const { spaces } = useSpaces()

  const project = spaces
    .flatMap(space => space.projects)
    .find(p => p.id === projectId)

  const parentSpace = spaces.find(space => 
    space.projects.some(p => p.id === projectId)
  )

  const stats: ProjectStats = {
    tasksCount: 5, // TODO: Obtener de datos reales
    completedTasks: 2,
    membersCount: 3,
    filesCount: 3
  }

  const tasks: TaskItem[] = [
    {
      id: '1',
      title: 'Configurar estructura del proyecto',
      completed: false,
      status: 'pending'
    },
    {
      id: '2',
      title: 'Crear documentación inicial',
      completed: true,
      status: 'completed'
    },
    {
      id: '3',
      title: 'Revisión de requisitos',
      completed: false,
      status: 'in-progress'
    }
  ]

  const files: FileItem[] = [
    {
      id: '1',
      name: 'Especificaciones del proyecto.pdf',
      size: '2.3 MB',
      uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '2',
      name: 'Mockups iniciales.figma',
      size: '1.8 MB',
      uploadedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '3',
      name: 'Cronograma.xlsx',
      size: '856 KB',
      uploadedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]

  const activities: ActivityItem[] = [
    {
      id: '1',
      user: 'María García',
      action: 'completó la tarea',
      target: '"Crear documentación inicial"',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      type: 'task'
    },
    {
      id: '2',
      user: 'Carlos López',
      action: 'subió el archivo',
      target: '"Especificaciones del proyecto.pdf"',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      type: 'file'
    },
    {
      id: '3',
      user: 'Ana Rodríguez',
      action: 'se unió al proyecto',
      target: '',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      type: 'member'
    }
  ]

  return {
    project,
    parentSpace,
    stats,
    tasks,
    files,
    activities,
    isLoading: false, // TODO: Implementar loading real
    error: null
  }
}

// Componente para mostrar las estadísticas del proyecto
function ProjectStatsCard({ stats }: { stats: ProjectStats }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Información del Proyecto</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Creado</p>
              <p className="text-sm font-medium">
                
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Actualizado</p>
              <p className="text-sm font-medium">
                
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Tareas</p>
              <p className="text-sm font-medium">
                {stats.tasksCount - stats.completedTasks} pendientes
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Miembros</p>
              <p className="text-sm font-medium">{stats.membersCount} activos</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Componente para la lista de tareas
function TasksList({ tasks }: { tasks: TaskItem[] }) {
  const getTaskBadgeProps = (status: TaskItem['status']) => {
    switch (status) {
      case 'completed':
        return { variant: 'default' as const, children: 'Completada' }
      case 'in-progress':
        return { 
          variant: 'outline' as const, 
          children: 'En progreso',
          className: 'border-orange-500 text-orange-600'
        }
      default:
        return { variant: 'secondary' as const, children: 'Pendiente' }
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg flex items-center">
          <CheckSquare className="h-5 w-5 mr-2" />
          Tareas Recientes
        </CardTitle>
        <Button size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Nueva Tarea
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {tasks.map((task) => (
          <div 
            key={task.id}
            className={`flex items-center justify-between p-3 rounded-lg border ${
              task.completed ? 'bg-muted/30' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded ${
                task.completed 
                  ? 'bg-primary flex items-center justify-center' 
                  : task.status === 'in-progress'
                    ? 'border-2 border-orange-500'
                    : 'border-2 border-primary'
              }`}>
                {task.completed && (
                  <CheckSquare className="h-3 w-3 text-primary-foreground" />
                )}
              </div>
              <span className={`text-sm ${
                task.completed ? 'line-through text-muted-foreground' : ''
              }`}>
                {task.title}
              </span>
            </div>
            <Badge {...getTaskBadgeProps(task.status)} />
          </div>
        ))}
        <Button variant="ghost" className="w-full justify-start text-muted-foreground">
          Ver todas las tareas →
        </Button>
      </CardContent>
    </Card>
  )
}

// Componente para la lista de archivos
function FilesList({ files }: { files: FileItem[] }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Archivos
        </CardTitle>
        <Button size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Subir Archivo
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {files.map((file) => (
          <div 
            key={file.id}
            className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer"
          >
            <FileText className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                
              </p>
            </div>
          </div>
        ))}
        <Button variant="ghost" className="w-full justify-start text-muted-foreground">
          Ver todos los archivos →
        </Button>
      </CardContent>
    </Card>
  )
}

// Componente para la actividad reciente
function RecentActivity({ activities }: { activities: ActivityItem[] }) {
  const getActivityColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'task':
        return 'bg-green-500'
      case 'file':
        return 'bg-blue-500'
      case 'member':
        return 'bg-purple-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Actividad Reciente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`w-2 h-2 rounded-full ${getActivityColor(activity.type)} mt-2`} />
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.user}</span> {activity.action}
                  {activity.target && (
                    <span className="font-medium"> {activity.target}</span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground">
                
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function ProjectView() {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const { project, parentSpace, stats, tasks, files, activities, isLoading, error } = useProjectData(projectId)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 w-full" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    )
  }

  if (error || !project || !parentSpace) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Proyecto no encontrado</h2>
          <p className="text-muted-foreground mt-2">
            El proyecto que buscas no existe o ha sido eliminado.
          </p>
          <Button onClick={() => navigate("/dashboard")} className="mt-4">
            Volver al Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header del proyecto */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
              <project.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{project.name}</h1>
              <p className="text-sm text-muted-foreground">
                En {parentSpace.name}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Users className="h-4 w-4 mr-2" />
            Colaboradores
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configuración
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                Editar proyecto
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar proyecto
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Descripción del proyecto */}
      {project.description && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">{project.description}</p>
          </CardContent>
        </Card>
      )}

      {/* Información del proyecto */}
      <ProjectStatsCard stats={stats} />

      {/* Tareas y Archivos */}
      <div className="grid gap-6 md:grid-cols-2">
        <TasksList tasks={tasks} />
        <FilesList files={files} />
      </div>

      {/* Actividad reciente */}
      <RecentActivity activities={activities} />
    </div>
  )
}
