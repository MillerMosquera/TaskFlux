import { ChevronsUpDown, Plus, Users } from "lucide-react"
import * as React from "react"

import { CreateTeamModal } from "@/app/team-collaboration/delivery/modals/create-team-modal"
import { InviteMemberModal } from "@/app/team-collaboration/delivery/modals/invite-member-modal"
import { useTeams } from "@/app/team-collaboration/interface-adapters/teams-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/shared/ui/sidebar"

export function TeamSwitcher() {
  const { isMobile } = useSidebar()
  const { teams, currentTeam, setCurrentTeam } = useTeams()
  const [createTeamOpen, setCreateTeamOpen] = React.useState(false)
  const [inviteMemberOpen, setInviteMemberOpen] = React.useState(false)

  if (!currentTeam) {
    return null
  }

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <currentTeam.logo className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{currentTeam.name}</span>
                  <span className="truncate text-xs">{currentTeam.plan}</span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-muted-foreground text-xs">
                Equipos
              </DropdownMenuLabel>
              {teams.map((team) => (
                <DropdownMenuItem
                  key={team.id}
                  onClick={() => setCurrentTeam(team)}
                  className={`gap-2 p-2 ${currentTeam.id === team.id ? 'bg-accent' : ''}`}
                >
                  <div className="flex size-6 items-center justify-center rounded-md border">
                    <team.logo className="size-3.5 shrink-0" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{team.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {team.members.length} miembro{team.members.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="gap-2 p-2"
                onClick={() => setInviteMemberOpen(true)}
              >
                <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                  <Users className="size-4" />
                </div>
                <div className="text-muted-foreground font-medium">Invitar miembros</div>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="gap-2 p-2"
                onClick={() => setCreateTeamOpen(true)}
              >
                <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                  <Plus className="size-4" />
                </div>
                <div className="text-muted-foreground font-medium">Crear equipo</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <CreateTeamModal 
        open={createTeamOpen} 
        onOpenChange={setCreateTeamOpen} 
      />
      
      {currentTeam && (
        <InviteMemberModal 
          open={inviteMemberOpen} 
          onOpenChange={setInviteMemberOpen} 
          teamId={currentTeam.id}
        />
      )}
    </>
  )
}
