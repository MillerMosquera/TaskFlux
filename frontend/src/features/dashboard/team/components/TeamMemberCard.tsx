import { motion } from "framer-motion"
import { useApp } from "@/app/context/app-context"
import { getUserStats } from "@/features/dashboard/team/utils/teamUtils"
import { cardVariants, avatarVariants, badgeVariants, statsVariants, progressBarVariants, progressFillVariants, buttonVariants } from "@/features/dashboard/team/utils/variants"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail, Calendar, Clock } from "lucide-react"
import { TeamMemberCardProps } from "@/features/dashboard/team/utils/teamUtils"
import {getRoleColor} from "@/features/dashboard/team/utils/teamUtils"


export function TeamMemberCard({ user }: TeamMemberCardProps) {
  const { state } = useApp()
  const stats = getUserStats(user.id, state)

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
    >
      <Card className="hover:shadow-lg transition-shadow backdrop-blur-sm bg-card/80 border-border/50">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <motion.div
              variants={avatarVariants}
              whileHover="hover"
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-lg">{user.initials}</AvatarFallback>
              </Avatar>
            </motion.div>
            <div className="flex-1 min-w-0">
              <motion.h3 
                className="font-semibold truncate"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {user.name}
              </motion.h3>
              <motion.p 
                className="text-sm text-muted-foreground truncate"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
              >
                {user.email}
              </motion.p>
            </div>
            <motion.div variants={badgeVariants}>
              <Badge variant="secondary" className={`${getRoleColor(user.role)} text-white capitalize`}>
                {user.role}
              </Badge>
            </motion.div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Task Stats */}
          <motion.div variants={statsVariants} className="grid grid-cols-2 gap-4 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.p 
                className="text-2xl font-bold text-blue-600"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
              >
                {stats.totalTasks}
              </motion.p>
              <p className="text-xs text-muted-foreground">Total Tasks</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.p 
                className="text-2xl font-bold text-green-600"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
              >
                {stats.completedTasks}
              </motion.p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </motion.div>
          </motion.div>

          {/* Completion Rate */}
          <motion.div variants={statsVariants} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Completion Rate</span>
              <motion.span 
                className="font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {stats.completionRate}%
              </motion.span>
            </div>
            <motion.div 
              className="w-full bg-muted rounded-full h-2 overflow-hidden"
              variants={progressBarVariants}
            >
              <motion.div
                className="bg-green-500 h-2 rounded-full"
                variants={progressFillVariants}
                custom={stats.completionRate}
              />
            </motion.div>
          </motion.div>

          {/* Overdue Tasks */}
          {stats.overdueTasks > 0 && (
            <motion.div 
              className="flex items-center gap-2 text-sm text-red-600"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <Clock className="h-4 w-4" />
              </motion.div>
              {stats.overdueTasks} overdue task{stats.overdueTasks !== 1 ? "s" : ""}
            </motion.div>
          )}

          {/* Join Date */}
          <motion.div 
            className="flex items-center gap-2 text-sm text-muted-foreground"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.85 }}
          >
            <Calendar className="h-4 w-4" />
            Joined {new Date(user.joinedAt).toLocaleDateString()}
          </motion.div>

          {/* Contact */}
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button variant="outline" size="sm" className="w-full bg-transparent hover:bg-accent">
              <Mail className="h-4 w-4 mr-2" />
              Contact
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}