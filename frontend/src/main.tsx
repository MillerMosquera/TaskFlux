import { ThemeProvider } from "@/shared/ui/theme-provider";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from "./App";
import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <App/>
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>,
)
