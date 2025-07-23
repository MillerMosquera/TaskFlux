import { GalleryVerticalEnd } from 'lucide-react'
import { createContext, ReactNode, useContext, useState } from 'react'

export interface TeamMember {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'member' | 'viewer'
  joinedAt: Date
}

export interface Team {
  id: string
  name: string
  description?: string
  logo: any // LucideIcon
  members: TeamMember[]
  createdAt: Date
  createdBy: string
}

interface TeamsContextType {
  teams: Team[]
  currentTeam: Team | null
  addTeam: (team: Omit<Team, 'id' | 'createdAt' | 'members'>) => void
  updateTeam: (teamId: string, updates: Partial<Team>) => void
  deleteTeam: (teamId: string) => void
  setCurrentTeam: (team: Team) => void
  addMember: (teamId: string, member: Omit<TeamMember, 'id' | 'joinedAt'>) => void
  removeMember: (teamId: string, memberId: string) => void
  updateMemberRole: (teamId: string, memberId: string, role: TeamMember['role']) => void
}

const TeamsContext = createContext<TeamsContextType | undefined>(undefined)

export function useTeams() {
  const context = useContext(TeamsContext)
  if (context === undefined) {
    throw new Error('useTeams must be used within a TeamsProvider')
  }
  return context
}

// Datos iniciales de ejemplo
const initialTeams: Team[] = [
  {
    id: '1',
    name: 'TaskFlux Team',
    description: 'Equipo principal de TaskFlux',
    logo: GalleryVerticalEnd,
    createdAt: new Date(),
    createdBy: 'current-user',
    members: [
      {
        id: '1',
        name: 'Usuario Principal',
        email: 'm@example.com',
        avatar: '/avatars/user.jpg',
        role: 'admin',
        joinedAt: new Date(),
      },
      {
        id: '2',
        name: 'Ana García',
        email: 'ana@example.com',
        role: 'member',
        joinedAt: new Date(),
      },
      {
        id: '3',
        name: 'Carlos López',
        email: 'carlos@example.com',
        role: 'member',
        joinedAt: new Date(),
      }
    ]
  }
]

export function TeamsProvider({ children }: { children: ReactNode }) {
  const [teams, setTeams] = useState<Team[]>(initialTeams)
  const [currentTeam, setCurrentTeam] = useState<Team | null>(teams[0] || null)

  const addTeam = (newTeam: Omit<Team, 'id' | 'createdAt' | 'members'>) => {
    const team: Team = {
      ...newTeam,
      id: Date.now().toString(),
      createdAt: new Date(),
      members: [{
        id: 'current-user',
        name: 'Usuario Principal',
        email: 'm@example.com',
        role: 'admin',
        joinedAt: new Date(),
      }]
    }
    setTeams(prev => [...prev, team])
  }

  const updateTeam = (teamId: string, updates: Partial<Team>) => {
    setTeams(prev => prev.map(team => 
      team.id === teamId ? { ...team, ...updates } : team
    ))
    
    if (currentTeam?.id === teamId) {
      setCurrentTeam(prev => prev ? { ...prev, ...updates } : null)
    }
  }

  const deleteTeam = (teamId: string) => {
    setTeams(prev => prev.filter(team => team.id !== teamId))
    if (currentTeam?.id === teamId) {
      setCurrentTeam(teams.length > 1 ? teams[0] : null)
    }
  }

  const addMember = (teamId: string, newMember: Omit<TeamMember, 'id' | 'joinedAt'>) => {
    const member: TeamMember = {
      ...newMember,
      id: Date.now().toString(),
      joinedAt: new Date(),
    }
    
    setTeams(prev => prev.map(team => 
      team.id === teamId 
        ? { ...team, members: [...team.members, member] }
        : team
    ))
  }

  const removeMember = (teamId: string, memberId: string) => {
    setTeams(prev => prev.map(team => 
      team.id === teamId 
        ? { ...team, members: team.members.filter(m => m.id !== memberId) }
        : team
    ))
  }

  const updateMemberRole = (teamId: string, memberId: string, role: TeamMember['role']) => {
    setTeams(prev => prev.map(team => 
      team.id === teamId 
        ? { 
            ...team, 
            members: team.members.map(m => 
              m.id === memberId ? { ...m, role } : m
            ) 
          }
        : team
    ))
  }

  return (
    <TeamsContext.Provider value={{
      teams,
      currentTeam,
      addTeam,
      updateTeam,
      deleteTeam,
      setCurrentTeam,
      addMember,
      removeMember,
      updateMemberRole,
    }}>
      {children}
    </TeamsContext.Provider>
  )
}
