import { useCurrentUser } from "@/app/context/app-context"
import { useHomeStats } from "@/app/dashboard-overview/interface-adapters/useHomeStats"
// Componentes presentacionales usando las nuevas entidades
import { StatsCards } from "@/app/dashboard-overview/delivery/components/StatsCard"
import { WelcomeHeader } from "@/app/dashboard-overview/delivery/components/WelcomeHeader"
import { ActiveGoals } from "@/app/goal-tracking/delivery/components/ActivateGoals"
import { RecentTasks } from "@/app/task-management/delivery/components/RecentTasks"
import { UpcomingDeadlines } from "@/app/task-management/delivery/components/UpcomingDeadlines"

export function HomeView() {
  // Usando las nuevas entidades específicas
  const currentUser = useCurrentUser()
  
  const {
    stats,
    recentTasks,
    recentGoals,
    upcomingDeadlines,
  } = useHomeStats()

  // Verificar que el usuario existe
  if (!currentUser || !currentUser) {
    return <div>Cargando...</div>
  }

  return (
    <div className="space-y-6">
      <WelcomeHeader
        userName={currentUser.name}
      />
      <StatsCards stats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentTasks tasks={recentTasks} />
        <UpcomingDeadlines items={upcomingDeadlines.map(item => ({
          id: item.id,
          title: item.title,
          dueDate: item.dueDate!,
          completed: 'completed' in item ? item.completed : false,
          status: 'status' in item ? item.status : undefined
        }))} />
      </div>
      <ActiveGoals goals={recentGoals} />
    </div>
  )
}
