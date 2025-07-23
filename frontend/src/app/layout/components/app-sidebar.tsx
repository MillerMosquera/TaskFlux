import {
  Calendar,
  Frame,
  GalleryVerticalEnd,
  Home,
  Map,
  PieChart,
  Target,
  Users
} from "lucide-react"
import * as React from "react"

import { NavMain } from "@/app/layout/components/nav-main"
import { NavSpaces } from "@/app/layout/components/nav-spaces"
import { NavUser } from "@/app/layout/components/nav-user"
import { TeamSwitcher } from "@/app/layout/components/team-switcher"
import { TeamsProvider } from "@/app/team-collaboration/interface-adapters/teams-context"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/shared/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  team: {
    name: "Acme Inc",
    logo: GalleryVerticalEnd,
  },
  navMain: [
    {
      title: "Inicio",
      url: "/dashboard/inicio",
      icon: Home,
      isActive: true,
    },
    {
      title: "Metas",
      url: "/dashboard/metas",
      icon: Target,
    },
    {
      title: "Calendario",
      url: "/dashboard/calendario",
      icon: Calendar,
    },
    {
      title: "Equipo",
      url: "/dashboard/equipo",
      icon: Users,
    },
    {
      title: "Excalidraw",
      url: "/dashboard/excalidraw",
      icon: GalleryVerticalEnd,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "/dashboard/design-engineering",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "/dashboard/sales-marketing",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "/dashboard/travel",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <TeamsProvider>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
          <NavSpaces />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </TeamsProvider>
  )
}
