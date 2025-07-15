import Header from "@/app/layout/Header";
import MainLayout from "@/app/layout/MainLayout.tsx";
import { Route, Routes, useLocation } from 'react-router-dom';

import Dashboard from "@/app/layout/Dashboard.tsx";
import DashboardGoal from "@/features/dashboard/views/DashboardGoalView";
import { DashboardHome } from "@/features/dashboard/views/DashboardHomeView";
import { DesignEngineeringView } from "@/features/dashboard/views/DesignEngineeringView.tsx";
import { DocumentationView } from "@/features/dashboard/views/DocumentationView.tsx";
import { PlaygroundView } from "@/features/dashboard/views/HomeView";
import { SalesMarketingView } from "@/features/dashboard/views/SalesMarketingView.tsx";
import { SettingsView } from "@/features/dashboard/views/SettingsView.tsx";
import { TravelView } from "@/features/dashboard/views/TravelView.tsx";
import './App.css';

function App() {
    const location = useLocation();
    const isDashboard = location.pathname.startsWith('/dashboard');

    // Debug temporal
    console.log('Current pathname:', location.pathname);
    console.log('Is dashboard?', isDashboard);

    // Si estamos en dashboard, solo renderizar el dashboard
    if (isDashboard) {
        return (
            <Routes>
                <Route path="/dashboard/*" element={<Dashboard/>}>
                    <Route index element={<DashboardHome/>} />
                    <Route path="playground" element={<PlaygroundView/>} />
                    <Route path="metas" element={<DashboardGoal/>} />
                    <Route path="documentation" element={<DocumentationView/>} />
                    <Route path="settings" element={<SettingsView/>} />
                    <Route path="design-engineering" element={<DesignEngineeringView/>} />
                    <Route path="sales-marketing" element={<SalesMarketingView/>} />
                    <Route path="travel" element={<TravelView/>} />
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
