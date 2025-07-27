import Header from "@/app/layout/Header";
import MainLayout from "@/app/layout/MainLayout";
import { Route, Routes, useLocation } from 'react-router-dom';

import { ExcalidrawsView } from "@/app/collaboration-tools/delivery/views/ExcaliDrawsView";
import { DashboardHome } from "@/app/dashboard-overview/delivery/views/DashboardHomeView";
import { HomeView } from "@/app/dashboard-overview/delivery/views/HomeView";
import DashboardGoal from "@/app/goal-tracking/delivery/views/DashboardGoalView";
import Dashboard from "@/app/layout/Dashboard";
import Projects from "@/app/project-management/delivery/views/projects";
import ProjectView from "@/app/project-management/delivery/views/ProjectView";
import { SpaceProjectsView } from "@/app/project-management/delivery/views/SpaceProjectsView";
import { EquipoView } from "@/app/team-collaboration/delivery/views/EquipoView";
import { CalendarioView } from "@/app/time-management/delivery/views/CalendarioView";
import './App.css';

function App() {
    const location = useLocation();
    const isDashboard = location.pathname.startsWith('/dashboard');


    // Si estamos en dashboard, solo renderizar el dashboard
    if (isDashboard) {
        return (
            <Routes>
                <Route path="/dashboard/*" element={<Dashboard/>}>
                    <Route index element={<DashboardHome/>} />
                    <Route path="inicio" element={<HomeView/>} />
                    <Route path="metas" element={<DashboardGoal/>} />
                    <Route path="calendario" element={<CalendarioView/>} />
                    <Route path="equipo" element={<EquipoView/>} />
                    <Route path="proyectos" element={<Projects/>} />
                    <Route path="excalidraw" element={<ExcalidrawsView/>} />
                    <Route path="project/:projectId" element={<ProjectView/>} />
                    <Route path="space/:spaceId/projects" element={<SpaceProjectsView/>} />
                </Route>
            </Routes>
        );
    }

    // Si no estamos en dashboard, renderizar la página principal
    return (
        <div>
            <Header/>
            <Routes>
                <Route path="/" element={<MainLayout/>} />
                <Route path="/features" element={<div className="p-8 text-center">Características</div>} />
                <Route path="/pricing" element={<div className="p-8 text-center">Precios</div>} />
                <Route path="/about" element={<div className="p-8 text-center">Sobre Nosotros</div>} />
                <Route path="/contact" element={<div className="p-8 text-center">Contacto</div>} />
            </Routes>
        </div>
    )
}

export default App
