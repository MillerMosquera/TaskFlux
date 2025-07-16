"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useApp } from "@/app/context/app-context"
import { InviteModal } from "@/features/dashboard/modals/invite-modal"
import { TeamStats } from "@/features/dashboard/team/components/TeamStats"
import { TeamMemberCard } from "@/features/dashboard/team/components/TeamMemberCard"
import { UserPlus } from "lucide-react"

export function TeamView() {
  const { state } = useApp()
  const [inviteModalOpen, setInviteModalOpen] = useState(false)

  const getUserStats = (userId: string) => {
    const userTasks = state.tasks.filter((task) => task.assigneeId === userId)
    const completedTasks = userTasks.filter((task) => task.completed)
    const overdueTasks = userTasks.filter((task) => {
      if (!task.dueDate) return false
      return new Date(task.dueDate) < new Date() && !task.completed
    })

    return {
      totalTasks: userTasks.length,
      completedTasks: completedTasks.length,
      overdueTasks: overdueTasks.length,
      completionRate: userTasks.length > 0 ? Math.round((completedTasks.length / userTasks.length) * 100) : 0,
    }
  }

  const teamStats = {
    totalMembers: state.users.length,
    activeMembers: state.users.filter((u) => u.status === "active").length,
    admins: state.users.filter((u) => u.role === "admin").length,
    avgCompletion: Math.round(
      state.users.reduce((acc, user) => {
        const stats = getUserStats(user.id)
        return acc + stats.completionRate
      }, 0) / state.users.length,
    ),
  }

  return (
    <>
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Team</h1>
              <p className="text-muted-foreground mt-1">Manage your team members and collaboration</p>
            </div>
            <Button onClick={() => setInviteModalOpen(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Member
            </Button>
          </div>

          {/* Team Stats */}
          <TeamStats {...teamStats} />

          {/* Team Members */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.users.map((user) => {
              const stats = getUserStats(user.id)
              return (
                <TeamMemberCard key={user.id} user={user} stats={stats} />
              )
            })}
          </div>
        </div>
      </div>

      <InviteModal open={inviteModalOpen} onOpenChange={setInviteModalOpen} />
    </>
  )
}