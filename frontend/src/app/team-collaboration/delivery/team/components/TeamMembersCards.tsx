'use client';

import { useApp, useUserStats } from "@/app/context/app-context";
import { TeamMemberCard } from "@/app/team-collaboration/delivery/team/components/TeamMemberCard";
import { User } from "@/shared/types/database";
import { motion } from "framer-motion";

interface TeamMembersCardsProps {
  users: User[];
}

function TeamMembersCards({ users }: TeamMembersCardsProps) {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {users.map((user, index) => (
        <TeamMemberCardWithStats key={user.id} user={user} index={index} />
      ))}
    </motion.div>
  );
}

// Componente auxiliar para cada miembro del equipo con sus estadísticas
function TeamMemberCardWithStats({ user, index }: { user: User; index: number }) {
  const basicStats = useUserStats(user.id);
  const { state } = useApp();
  
  // Buscar información adicional del usuario
  const userRole = state.userRoles?.find((ur: any) => ur.userId === user.id && ur.spaceId === state.currentSpace);
  const userProfile = state.userProfiles?.find((up: any) => up.userId === user.id);
  
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
  };
  
  // Calcular estadísticas adicionales que necesita TeamMemberCard
  const userTasks = state.tasks.filter((t: any) => t.assigneeId === user.id);
  const overdueTasks = userTasks.filter((task: any) => {
    const schedule = state.taskSchedules.find((s: any) => s.taskId === task.id);
    return schedule?.dueDate && new Date(schedule.dueDate) < new Date() && !task.completed;
  }).length;
  
  const completionRate = basicStats.totalTasks > 0 
    ? Math.round((basicStats.completedTasks / basicStats.totalTasks) * 100) 
    : 0;
  
  const stats = {
    ...basicStats,
    overdueTasks,
    completionRate
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
    >
      <TeamMemberCard user={teamMemberData} stats={stats} />
    </motion.div>
  );
}

export default TeamMembersCards;
