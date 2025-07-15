import { AppSidebar } from "@/features/dashboard/components/app-sidebar.tsx"

import { AppProvider } from "@/app/context/app-context.tsx"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Header } from "@/features/dashboard/components/header/main-header.tsx"
import { Outlet } from "react-router-dom"

export default function Dashboard() {
    return (
        <AppProvider>
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
        </AppProvider>
    )
}
