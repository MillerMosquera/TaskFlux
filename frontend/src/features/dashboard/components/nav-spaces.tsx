import {
    ChevronRight,
    Edit,
    FolderPlus,
    MoreHorizontal,
    Plus,
    Trash2,
} from "lucide-react"
import { useState } from "react"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible.tsx"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from "@/components/ui/sidebar.tsx"
import { useSpaces } from "@/features/dashboard/context/spaces-context.tsx"
import { CreateProjectModal } from "@/features/dashboard/modals/create-project-modal.tsx"
import { CreateSpaceModal } from "@/features/dashboard/modals/create-space-modal.tsx"
import { useNavigate } from "react-router-dom"

export function NavSpaces() {
  const { spaces, deleteSpace, deleteProject } = useSpaces()
  const { isMobile } = useSidebar()
  const navigate = useNavigate()
  const [expandedSpaces, setExpandedSpaces] = useState<Set<string>>(new Set())
  const [createSpaceModalOpen, setCreateSpaceModalOpen] = useState(false)
  const [createProjectModalOpen, setCreateProjectModalOpen] = useState(false)
  const [selectedSpaceForProject, setSelectedSpaceForProject] = useState<string>("")

  const toggleSpace = (spaceId: string) => {
    setExpandedSpaces(prev => {
      const newSet = new Set(prev)
      if (newSet.has(spaceId)) {
        newSet.delete(spaceId)
      } else {
        newSet.add(spaceId)
      }
      return newSet
    })
  }

  const handleProjectClick = (project: any) => {
    navigate(`/dashboard/project/${project.id}`)
  }

  const handleDeleteSpace = (spaceId: string) => {
    deleteSpace(spaceId)
  }

  const handleDeleteProject = (spaceId: string, projectId: string) => {
    deleteProject(spaceId, projectId)
  }

  const handleCreateProject = (spaceId: string) => {
    setSelectedSpaceForProject(spaceId)
    setCreateProjectModalOpen(true)
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="flex items-center justify-between">
        Espacios
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Plus className="h-4 w-4 cursor-pointer hover:text-sidebar-accent-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => setCreateSpaceModalOpen(true)}>
              <FolderPlus className="mr-2 h-4 w-4" />
              Nuevo Espacio
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarGroupLabel>
      <SidebarMenu>
        {spaces.map((space) => (
          <Collapsible
            key={space.id}
            asChild
            open={expandedSpaces.has(space.id)}
            onOpenChange={() => toggleSpace(space.id)}
          >
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={space.name}>
                <CollapsibleTrigger>
                  <ChevronRight className="transition-transform duration-200 data-[state=open]:rotate-90" />
                  <space.icon />
                  <span>{space.name}</span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {space.projects.length}
                  </span>
                </CollapsibleTrigger>
              </SidebarMenuButton>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover>
                    <MoreHorizontal />
                    <span className="sr-only">Más opciones</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem onClick={() => handleCreateProject(space.id)}>
                    <Plus className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Nuevo Proyecto</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Editar Espacio</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-destructive focus:text-destructive"
                    onClick={() => handleDeleteSpace(space.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Eliminar Espacio</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <CollapsibleContent>
                <SidebarMenuSub>
                  {space.projects.map((project) => (
                    <SidebarMenuSubItem key={project.id}>
                      <SidebarMenuSubButton 
                        asChild
                        onClick={() => handleProjectClick(project)}
                      >
                        <button className="w-full text-left">
                          <project.icon />
                          <span>{project.name}</span>
                        </button>
                      </SidebarMenuSubButton>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <SidebarMenuAction showOnHover>
                            <MoreHorizontal />
                            <span className="sr-only">Más opciones del proyecto</span>
                          </SidebarMenuAction>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className="w-48 rounded-lg"
                          side={isMobile ? "bottom" : "right"}
                          align={isMobile ? "end" : "start"}
                        >
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>Editar Proyecto</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDeleteProject(space.id, project.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Eliminar Proyecto</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>

      {/* Modales */}
      <CreateSpaceModal 
        open={createSpaceModalOpen} 
        onOpenChange={setCreateSpaceModalOpen} 
      />
      <CreateProjectModal 
        open={createProjectModalOpen} 
        onOpenChange={setCreateProjectModalOpen}
        spaceId={selectedSpaceForProject}
      />
    </SidebarGroup>
  )
}
