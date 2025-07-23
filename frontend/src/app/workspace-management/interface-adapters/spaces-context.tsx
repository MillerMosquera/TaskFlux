import { Briefcase, FileText, Folder, LucideIcon } from 'lucide-react'
import { createContext, ReactNode, useContext, useState } from 'react'

export interface SpaceMember {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'owner' | 'admin' | 'member' | 'viewer'
  joinedAt: Date
}

export interface Project {
  id: string
  name: string
  description?: string
  icon: LucideIcon
  createdAt: Date
  updatedAt: Date
  members: SpaceMember[]
}

export interface Space {
  id: string
  name: string
  description?: string
  icon: LucideIcon
  projects: Project[]
  members: SpaceMember[]
  teamId: string // ID del equipo al que pertenece
  createdAt: Date
  updatedAt: Date
}

interface SpacesContextType {
  spaces: Space[]
  addSpace: (space: Omit<Space, 'id' | 'createdAt' | 'updatedAt' | 'projects' | 'members'>) => void
  addProject: (spaceId: string, project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'members'>) => void
  addMemberToSpace: (spaceId: string, member: Omit<SpaceMember, 'id' | 'joinedAt'>) => void
  addMemberToProject: (spaceId: string, projectId: string, member: Omit<SpaceMember, 'id' | 'joinedAt'>) => void
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
    teamId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    members: [
      {
        id: '1',
        name: 'Usuario Principal',
        email: 'm@example.com',
        role: 'owner',
        joinedAt: new Date(),
      }
    ],
    projects: [
      {
        id: '1',
        name: 'Marketing Campaign',
        description: 'Campaña de marketing Q4',
        icon: FileText,
        createdAt: new Date(),
        updatedAt: new Date(),
        members: [
          {
            id: '1',
            name: 'Usuario Principal',
            email: 'm@example.com',
            role: 'owner',
            joinedAt: new Date(),
          }
        ]
      },
      {
        id: '2',
        name: 'Website Redesign',
        description: 'Rediseño del sitio web corporativo',
        icon: FileText,
        createdAt: new Date(),
        updatedAt: new Date(),
        members: [
          {
            id: '1',
            name: 'Usuario Principal',
            email: 'm@example.com',
            role: 'owner',
            joinedAt: new Date(),
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Personal',
    description: 'Proyectos personales',
    icon: Folder,
    teamId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    members: [
      {
        id: '1',
        name: 'Usuario Principal',
        email: 'm@example.com',
        role: 'owner',
        joinedAt: new Date(),
      }
    ],
    projects: [
      {
        id: '3',
        name: 'Learning Goals',
        description: 'Metas de aprendizaje personal',
        icon: FileText,
        createdAt: new Date(),
        updatedAt: new Date(),
        members: [
          {
            id: '1',
            name: 'Usuario Principal',
            email: 'm@example.com',
            role: 'owner',
            joinedAt: new Date(),
          }
        ]
      }
    ]
  }
]

export function SpacesProvider({ children }: { children: ReactNode }) {
  const [spaces, setSpaces] = useState<Space[]>(initialSpaces)

  const addSpace = (newSpace: Omit<Space, 'id' | 'createdAt' | 'updatedAt' | 'projects' | 'members'>) => {
    const space: Space = {
      ...newSpace,
      id: Date.now().toString(),
      projects: [],
      members: [{
        id: 'current-user',
        name: 'Usuario Principal',
        email: 'm@example.com',
        role: 'owner',
        joinedAt: new Date(),
      }],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setSpaces(prev => [...prev, space])
  }

  const addProject = (spaceId: string, newProject: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'members'>) => {
    const project: Project = {
      ...newProject,
      id: Date.now().toString(),
      members: [{
        id: 'current-user',
        name: 'Usuario Principal',
        email: 'm@example.com',
        role: 'owner',
        joinedAt: new Date(),
      }],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    
    setSpaces(prev => prev.map(space => 
      space.id === spaceId 
        ? { ...space, projects: [...space.projects, project], updatedAt: new Date() }
        : space
    ))
  }

  const addMemberToSpace = (spaceId: string, newMember: Omit<SpaceMember, 'id' | 'joinedAt'>) => {
    const member: SpaceMember = {
      ...newMember,
      id: Date.now().toString(),
      joinedAt: new Date(),
    }
    
    setSpaces(prev => prev.map(space => 
      space.id === spaceId 
        ? { ...space, members: [...space.members, member] }
        : space
    ))
  }

  const addMemberToProject = (spaceId: string, projectId: string, newMember: Omit<SpaceMember, 'id' | 'joinedAt'>) => {
    const member: SpaceMember = {
      ...newMember,
      id: Date.now().toString(),
      joinedAt: new Date(),
    }
    
    setSpaces(prev => prev.map(space => 
      space.id === spaceId 
        ? { 
            ...space, 
            projects: space.projects.map(project =>
              project.id === projectId
                ? { ...project, members: [...project.members, member] }
                : project
            )
          }
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
      addMemberToSpace,
      addMemberToProject,
      deleteSpace,
      deleteProject,
    }}>
      {children}
    </SpacesContext.Provider>
  )
}
