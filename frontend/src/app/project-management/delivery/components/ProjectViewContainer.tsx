'use client'

import { Project } from '@/app/workspace-management/interface-adapters/spaces-context'
import { useViewStore } from '@/shared/hooks/use-view-store'
import { ProjectBoardView } from './ProjectBoardView'
import ProjectHeaderOptions from './ProjectHeaderOptions'
import { ProjectListView } from './ProjectListView'

interface ProjectViewContainerProps {
  projects: Project[]
  spaceName?: string
}

export function ProjectViewContainer({ projects, spaceName }: ProjectViewContainerProps) {
  const { viewType } = useViewStore()

  return (
    <div className="flex flex-col h-full">
      {/* Header con información del espacio */}
      <div className="w-full flex justify-between items-center border-b py-3 px-6 bg-background">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-lg font-semibold">{spaceName || 'Proyectos'}</span>
            <span className="text-sm bg-muted rounded-md px-2 py-1">
              {projects.length}
            </span>
          </div>
        </div>
      </div>

      {/* Header con opciones de filtro y vista */}
      <ProjectHeaderOptions />

      {/* Contenido principal */}
      <div className="flex-1 overflow-auto">
        {viewType === 'list' ? (
          <ProjectListView projects={projects} />
        ) : (
          <ProjectBoardView projects={projects} />
        )}
      </div>
    </div>
  )
}
