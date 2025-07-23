
import { useAllUsers, useApp, useUserStats } from "@/app/context/app-context"
import { InviteModal } from "@/app/team-collaboration/delivery/modals/invite-modal"
import { TeamMemberCard } from "@/app/team-collaboration/delivery/team/components/TeamMemberCard"
import { TeamStats } from "@/app/team-collaboration/delivery/team/components/TeamStats"
import { Button } from "@/shared/ui/button"
import { UserPlus } from "lucide-react"
import { useState } from "react"

export function TeamView() {
  const allUsers = useAllUsers()
  const { state } = useApp()
  const [inviteModalOpen, setInviteModalOpen] = useState(false)

  // Transformar estadísticas del equipo al formato que espera TeamStats
  const teamStats = {
    totalMembers: allUsers.length,
    activeMembers: allUsers.filter(u => u.status === "activo").length,
    admins: allUsers.filter(u => {
      // Buscar roles de administrador en el espacio actual
      const userRoles = state.userRoles.filter(ur => ur.userId === u.id && ur.spaceId === state.currentSpace)
      return userRoles.some(ur => ur.role === "administrador")
    }).length,
    avgCompletion: allUsers.length > 0 
      ? Math.round(
          allUsers.reduce((sum, user) => {
            const userTasks = state.tasks.filter(t => t.assigneeId === user.id)
            const completion = userTasks.length > 0 
              ? (userTasks.filter(t => t.completed).length / userTasks.length) * 100 
              : 0
            return sum + completion
          }, 0) / allUsers.length
        )
      : 0
  }

  return (
    <>
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Equipo</h1>
              <p className="text-muted-foreground mt-1">Administra a los miembros de tu equipo y la colaboración</p>
            </div>
            <Button onClick={() => setInviteModalOpen(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Invitar Miembro
            </Button>
          </div>

          {/* Estadísticas del Equipo */}
          <TeamStats {...teamStats} />

          {/* Miembros del Equipo */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allUsers.map((user) => (
              <TeamMemberCardWithStats key={user.id} user={user} />
            ))}
          </div>
        </div>
      </div>

      <InviteModal open={inviteModalOpen} onOpenChange={setInviteModalOpen} />
    </>
  )
}

// Componente auxiliar para cada miembro del equipo con sus estadísticas
function TeamMemberCardWithStats({ user }: { user: any }) {
  const basicStats = useUserStats(user.id)
  const { state } = useApp()
  
  // Buscar información adicional del usuario
  const userRole = state.userRoles?.find((ur: any) => ur.userId === user.id && ur.spaceId === state.currentSpace)
  const userProfile = state.userProfiles?.find((up: any) => up.userId === user.id)
  
  // Transformar usuario de DB al formato TeamMemberData
  const teamMemberData = {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    initials: user.name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2),
    role: userRole?.role || "miembro",
    joinedAt: userProfile?.joinedAt || user.createdAt || new Date().toISOString(),
    status: user.status || "activo"
  }
  
  // Calcular estadísticas adicionales que necesita TeamMemberCard
  const userTasks = state.tasks.filter(t => t.assigneeId === user.id)
  const overdueTasks = userTasks.filter(task => {
    const schedule = state.taskSchedules.find(s => s.taskId === task.id)
    return schedule?.dueDate && new Date(schedule.dueDate) < new Date() && !task.completed
  }).length
  
  const completionRate = basicStats.totalTasks > 0 
    ? Math.round((basicStats.completedTasks / basicStats.totalTasks) * 100) 
    : 0
  
  const stats = {
    ...basicStats,
    overdueTasks,
    completionRate
  }
  
  return <TeamMemberCard user={teamMemberData} stats={stats} />
}
