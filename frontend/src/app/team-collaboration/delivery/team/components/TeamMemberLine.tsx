import { useApp, useUserStats } from "@/app/context/app-context";
import { getUserTeams } from "@/app/team-collaboration/delivery/team/utils/teamUtils";
import { User } from "@/shared/types/database";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { format } from "date-fns";
import { motion } from "framer-motion";

interface TeamMemberLineProps {
  user: User;
  index: number;
}

// Helper function para obtener color del estado
const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'activo':
      return '#22c55e'; // green-500
    case 'ocupado':
      return '#f59e0b'; // amber-500
    case 'ausente':
      return '#ef4444'; // red-500
    case 'inactivo':
      return '#6b7280'; // gray-500
    default:
      return '#22c55e'; // green-500 por defecto
  }
};

// Helper function para obtener colores del estado para badges
const getStatusBadgeClass = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'activo':
      return 'bg-green-100 text-green-800  dark:bg-green-900/20 dark:text-green-400';
    case 'ocupado':
      return 'bg-amber-100 text-amber-800  dark:bg-amber-900/20 dark:text-amber-400';
    case 'ausente':
      return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
    case 'inactivo':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    default:
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
  }
};

// Helper function para obtener colores del rol
const getRoleBadgeClass = (role: string) => {
  switch (role?.toLowerCase()) {
    case 'administrador':
    case 'admin':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
    case 'moderador':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    case 'miembro':
      return 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-400';
    case 'invitado':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
    default:
      return 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-400';
  }
};

// Helper function para obtener colores aleatorios para equipos
const getTeamBadgeClass = (index: number) => {
  const colors = [
    'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-400',
    'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400',
    'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400',
    'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400',
    'bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-400',
  ];
  return colors[index % colors.length];
};

export default function TeamMemberLine({ user, index }: TeamMemberLineProps) {
  const { state } = useApp();
  const userStats = useUserStats(user.id);
  
  // Obtener rol del usuario en el espacio actual
  const userRole = state.userRoles?.find((ur: any) => 
    ur.userId === user.id && ur.spaceId === state.currentSpace
  );
  
  // Obtener equipos del usuario
  const userTeams = getUserTeams(user.id, state);
  
  return (
    <motion.div 
      className="w-full flex items-center py-4 px-6 border-b hover:bg-sidebar/50 border-muted-foreground/5 text-sm last:border-b-0 transition-all duration-200 min-h-[4rem]"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.3, 
        delay: index * 0.05,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.01,
        backgroundColor: "rgba(var(--accent), 0.1)",
        transition: { duration: 0.2 }
      }}
    >
      <div className="w-[60%] sm:w-[70%] xl:w-[46%] flex items-center gap-2">
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <Avatar className="size-8 shrink-0">
            <AvatarImage src={user.avatar || ""} alt={user.name} />
            <AvatarFallback>
              {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <motion.span
            className="border-background absolute -end-0.5 -bottom-0.5 size-2.5 rounded-full border-2"
            style={{ backgroundColor: getStatusColor(user.status || 'activo') }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
          >
            <span className="sr-only">{user.status || 'activo'}</span>
          </motion.span>
        </motion.div>
        <div className="flex flex-col items-start overflow-hidden">
          <span className="font-medium truncate w-full">{user.name}</span>
          <span className="text-xs text-muted-foreground truncate w-full">{user.email}</span>
        </div>
      </div>
      
      <div className="w-[20%] sm:w-[10%] xl:w-[13%] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <Badge className={`text-xs border ${getStatusBadgeClass(user.status || 'activo')}`}>
            {user.status || 'Activo'}
          </Badge>
        </motion.div>
      </div>
      
      <div className="hidden w-[10%] sm:flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 + 0.4 }}
        >
          <Badge className={`text-xs border ${getRoleBadgeClass(userRole?.role || 'miembro')}`}>
            {userRole?.role || 'Miembro'}
          </Badge>
        </motion.div>
      </div>
      
      <div className="hidden xl:flex xl:w-[13%] items-center justify-center text-xs text-muted-foreground">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.5 }}
        >
          {user.createdAt ? format(new Date(user.createdAt), 'MMM yyyy') : 'N/A'}
        </motion.div>
      </div>
      
      <div className="hidden xl:flex xl:w-[13%] items-center justify-center">
        <motion.div 
          className="flex flex-wrap gap-1 justify-center"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.6 }}
        >
          {userTeams.slice(0, 2).map((team: string, teamIndex: number) => (
            <motion.div
              key={teamIndex}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Badge className={`text-xs border ${getTeamBadgeClass(teamIndex)}`}>
                {team}
              </Badge>
            </motion.div>
          ))}
          {userTeams.length > 2 && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Badge className="text-xs border bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400">
                +{userTeams.length - 2}
              </Badge>
            </motion.div>
          )}
        </motion.div>
      </div>
      
      <div className="w-[20%] sm:w-[10%] flex items-center justify-center">
        <motion.div 
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 + 0.7 }}
        >
          <motion.span 
            className="font-medium text-blue-600 dark:text-blue-400"
            whileHover={{ scale: 1.1 }}
          >
            {userStats.completedTasks}/{userStats.totalTasks}
          </motion.span>
          <span className="text-xs text-muted-foreground">completadas</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
