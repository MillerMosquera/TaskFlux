import { useApp } from "@/app/context/app-context"
import { useHomeStats } from "@/features/home/hooks/useHomeStats"
// Importas componentes presentacionales como <StatsCards /> etc.
import { ActiveGoals } from "@/features/home/components/ActivateGoals"
import { RecentTasks } from "@/features/home/components/RecentTasks"
import { StatsCards } from "@/features/home/components/StatsCard"
import { UpcomingDeadlines } from "@/features/home/components/UpcomingDeadlines"
import { WelcomeHeader } from "@/features/home/components/WelcomeHeader"
// Importa el tipo DeadlineItem

export function HomeView() {
  const { state } = useApp()
  const {
    stats,
    recentTasks,
    recentGoals,
    upcomingDeadlines,
  } = useHomeStats()

  // Solo usas la lógica para presentar los componentes
  return (
    <div className="space-y-6">
      <WelcomeHeader
        userName={state.currentUser.name}
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
