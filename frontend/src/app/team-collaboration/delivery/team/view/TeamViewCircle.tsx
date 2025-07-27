import { useAllUsers, useApp } from "@/app/context/app-context"
import { InviteModal } from "@/app/team-collaboration/delivery/modals/invite-modal"
import TeamHeader from "@/app/team-collaboration/delivery/team/components/TeamHeader"
import TeamHeaderOptions from "@/app/team-collaboration/delivery/team/components/TeamHeaderOptions"
import TeamMembers from "@/app/team-collaboration/delivery/team/components/TeamMembers"
import TeamMembersCards from "@/app/team-collaboration/delivery/team/components/TeamMembersCards"
import { getUserTeams } from "@/app/team-collaboration/delivery/team/utils/teamUtils"
import { Button } from "@/shared/ui/button"
import { motion } from "framer-motion"
import { ListFilter } from "lucide-react"
import { useMemo, useState } from "react"

export function TeamViewCircle() {
  const allUsers = useAllUsers()
  const { state } = useApp()
  const [inviteModalOpen, setInviteModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
  const [selectedTeams, setSelectedTeams] = useState<string[]>([])

  // Get all available teams from users
  const availableTeams = useMemo(() => {
    const allTeams = new Set<string>();
    allUsers.forEach(user => {
      const userTeams = getUserTeams(user.id, state);
      userTeams.forEach((team: string) => allTeams.add(team));
    });
    return Array.from(allTeams).sort();
  }, [allUsers, state]);

  // Filter users based on selected teams
  const filteredUsers = useMemo(() => {
    if (selectedTeams.length === 0) {
      return allUsers;
    }
    
    return allUsers.filter(user => {
      const userTeams = getUserTeams(user.id, state);
      return selectedTeams.some(selectedTeam => userTeams.includes(selectedTeam));
    });
  }, [allUsers, selectedTeams, state]);

  return (
    <>
      <motion.div 
        className="w-full flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="w-full"
        >
          <TeamHeader 
            onInvite={() => setInviteModalOpen(true)} 
            memberCount={filteredUsers.length}
            totalMembers={allUsers.length}
            hasActiveFilters={selectedTeams.length > 0}
          />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="w-full"
        >
          <TeamHeaderOptions 
            viewMode={viewMode} 
            onViewModeChange={setViewMode}
            availableTeams={availableTeams}
            selectedTeams={selectedTeams}
            onTeamFilterChange={setSelectedTeams}
          />
        </motion.div>
      </motion.div>
      
      <motion.div
        key={`${viewMode}-${selectedTeams.join('-')}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <ListFilter className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No hay miembros que coincidan</h3>
              <p className="text-muted-foreground mb-4">
                No se encontraron miembros en los equipos seleccionados: {selectedTeams.join(', ')}
              </p>
              <Button variant="outline" onClick={() => setSelectedTeams([])}>
                Limpiar filtros
              </Button>
            </div>
          </div>
        ) : viewMode === 'table' ? (
          <TeamMembers users={filteredUsers} />
        ) : (
          <TeamMembersCards users={filteredUsers} />
        )}
      </motion.div>

      <InviteModal open={inviteModalOpen} onOpenChange={setInviteModalOpen} />
    </>
  )
}
