import { Briefcase, FileText, Folder, LucideIcon } from 'lucide-react'
import { createContext, ReactNode, useContext, useState } from 'react'

export interface Project {
  id: string
  name: string
  description?: string
  icon: LucideIcon
  createdAt: Date
  updatedAt: Date
}

export interface Space {
  id: string
  name: string
  description?: string
  icon: LucideIcon
  projects: Project[]
  createdAt: Date
  updatedAt: Date
}

interface SpacesContextType {
  spaces: Space[]
  addSpace: (space: Omit<Space, 'id' | 'createdAt' | 'updatedAt' | 'projects'>) => void
  addProject: (spaceId: string, project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void
  deleteSpace: (spaceId: string) => void
  deleteProject: (spaceId: string, projectId: string) => void
}

const SpacesContext = createContext<SpacesContextType | undefined>(undefined)

export function useSpaces() {
  const context = useContext(SpacesContext)
  if (context === undefined) {
    throw new Error('useSpaces must be used within a SpacesProvider')
  }
  return context
}

// Datos de ejemplo
const initialSpaces: Space[] = [
  {
    id: '1',
    name: 'Work Space',
    description: 'Proyectos de trabajo',
    icon: Briefcase,
    createdAt: new Date(),
    updatedAt: new Date(),
    projects: [
      {
        id: '1',
        name: 'Marketing Campaign',
        description: 'Campaña de marketing Q4',
        icon: FileText,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        name: 'Website Redesign',
        description: 'Rediseño del sitio web corporativo',
        icon: FileText,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]
  },
  {
    id: '2',
    name: 'Personal',
    description: 'Proyectos personales',
    icon: Folder,
    createdAt: new Date(),
    updatedAt: new Date(),
    projects: [
      {
        id: '3',
        name: 'Learning Goals',
        description: 'Metas de aprendizaje personal',
        icon: FileText,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]
  }
]

export function SpacesProvider({ children }: { children: ReactNode }) {
  const [spaces, setSpaces] = useState<Space[]>(initialSpaces)

  const addSpace = (newSpace: Omit<Space, 'id' | 'createdAt' | 'updatedAt' | 'projects'>) => {
    const space: Space = {
      ...newSpace,
      id: Date.now().toString(),
      projects: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setSpaces(prev => [...prev, space])
  }

  const addProject = (spaceId: string, newProject: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const project: Project = {
      ...newProject,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    
    setSpaces(prev => prev.map(space => 
      space.id === spaceId 
        ? { ...space, projects: [...space.projects, project], updatedAt: new Date() }
        : space
    ))
  }

  const deleteSpace = (spaceId: string) => {
    setSpaces(prev => prev.filter(space => space.id !== spaceId))
  }

  const deleteProject = (spaceId: string, projectId: string) => {
    setSpaces(prev => prev.map(space => 
      space.id === spaceId 
        ? { ...space, projects: space.projects.filter(p => p.id !== projectId), updatedAt: new Date() }
        : space
    ))
  }

  return (
    <SpacesContext.Provider value={{
      spaces,
      addSpace,
      addProject,
      deleteSpace,
      deleteProject,
    }}>
      {children}
    </SpacesContext.Provider>
  )
}
