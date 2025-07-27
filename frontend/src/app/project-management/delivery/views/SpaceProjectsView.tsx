import { useSpaces } from '@/app/workspace-management/interface-adapters/spaces-context'
import { Button } from '@/shared/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { ProjectViewContainer } from '../components/ProjectViewContainer'

export function SpaceProjectsView() {
  const { spaceId } = useParams<{ spaceId: string }>()
  const navigate = useNavigate()
  const { spaces } = useSpaces()

  const space = spaces.find(s => s.id === spaceId)

  if (!space) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-xl font-semibold mb-2">Espacio no encontrado</h2>
        <p className="text-muted-foreground mb-4">
          El espacio que buscas no existe o no tienes acceso a él.
        </p>
        <Button onClick={() => navigate(-1)}>
          <ArrowLeft className="size-4 mr-2" />
          Regresar
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Breadcrumb / Navigation */}
      <div className="border-b bg-background">
        <div className="px-6 py-3">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="h-8 px-2"
            >
              <ArrowLeft className="size-4" />
            </Button>
            <span className="text-sm text-muted-foreground">Espacios</span>
            <span className="text-sm text-muted-foreground">/</span>
            <span className="text-sm font-medium">{space.name}</span>
          </div>
        </div>
      </div>

      {/* Container principal con las vistas */}
      <div className="flex-1">
        <ProjectViewContainer 
          projects={space.projects} 
          spaceName={space.name}
        />
      </div>
    </div>
  )
}
