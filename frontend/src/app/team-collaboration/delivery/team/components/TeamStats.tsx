import { TeamStatsProps } from "@/app/team-collaboration/delivery/team/utils/teamUtils"
import { cardVariants, containerVariants } from "@/app/team-collaboration/delivery/team/utils/variants"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { motion } from "framer-motion"
import { Activity, CheckCircle, Users } from "lucide-react"

// Función temporal aquí para evitar problemas de importación
const statCards = (stats: TeamStatsProps["stats"]) => [
    {
        title: "Total de Miembros",
        value: `${stats.totalMembers}`,
        icon: Users,
        color: "text-blue-600",
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
        title: "Miembros Activos", 
        value: `${stats.activeMembers}`,
        icon: Activity,
        color: "text-green-600",
        bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
        title: "Administradores",
        value: `${stats.admins}`,
        icon: CheckCircle,
        color: "text-orange-600",
        bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
    {
        title: "Promedio de Finalización",
        value: `${stats.avgCompletion}%`,
        icon: CheckCircle,
        color: "text-purple-600",
        bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
]



export function TeamStats(stats: TeamStatsProps["stats"]) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-4 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {statCards(stats).map((stat) => (
        <motion.div
          key={stat.title}
          variants={cardVariants}
          whileHover={{
            y: -8,
            scale: 1.03,
            rotateX: 5,
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 10,
            },
          }}
        >
          <Card className={`shadow-lg ${stat.bgColor}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
