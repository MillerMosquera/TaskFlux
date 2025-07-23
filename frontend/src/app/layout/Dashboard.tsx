import { AppSidebar } from "@/app/layout/components/app-sidebar.tsx"

import { AppProvider } from "@/app/context/app-context.tsx"
import { Header } from "@/app/layout/components/header/main-header.tsx"
import { SpacesProvider } from "@/app/workspace-management/interface-adapters/spaces-context.tsx"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/shared/ui/sidebar"
import { Outlet } from "react-router-dom"

export default function Dashboard() {
    return (
        <AppProvider>
            <SpacesProvider>
                <SidebarProvider>
                    <AppSidebar/>
                    <SidebarInset>
                        <header
                            className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                            <div className="flex items-center gap-2 px-4">
                                <SidebarTrigger className="-ml-1"/>
                            </div>
                            <div className="flex-1 px-4">
                                <Header/>
                            </div>
                        </header>
                        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                            <Outlet />
                        </div>
                    </SidebarInset>
                </SidebarProvider>
            </SpacesProvider>
        </AppProvider>
    )
}
