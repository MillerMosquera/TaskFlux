import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { statCards, TeamStatsProps } from "@/features/dashboard/team/utils/teamUtils"
import { containerVariants } from "../utils/variants"
import { stat } from "fs"
import { cardVariants } from "../utils/variants"



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
