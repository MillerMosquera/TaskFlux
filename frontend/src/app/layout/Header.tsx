import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Características", href: "/features" },
    { name: "Precios", href: "/pricing" },
    { name: "Sobre Nosotros", href: "/about" },
    { name: "Contacto", href: "/contact" }
]

export default function Header() {
    return (
        <section>
            <header className="w-full max-w-7xl mx-auto p-4">
                <div className="flex items-center justify-evenly px-16">
                    {/* Logo y Navigation juntos */}
                    <div className="flex items-center space-x-6">
                        {/*Logo*/}
                        <div className=" rounded-xl border px-4 py-2 flex-shrink-0 hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 transition-all">
                            <div className="flex items-center space-x-2">

                                <span className="text-white font-semibold text-sm">TaskFlux</span>
                                <span
                                    className="text-xs text-gray-400 bg-gray-800 px-1 py-0.5 rounded text-[10px]">Prueba</span>
                            </div>
                        </div>

                        {/*Navigation*/}
                        <div className="rounded-xl border px-4 py-2 hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 transition-all">
                            <nav className="flex items-center">
                                <ul className="flex space-x-4 gap-3">
                                    {navLinks.map(link => (
                                        <li key={link.href}>
                                            <a href={link.href}
                                                className="text-white hover:text-gray-300 transition-colors text-sm whitespace-nowrap px-[10px] py-[5px]">{link.name}</a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>

                    {/*Log In*/}
                    <div className="px-4 py-2">
                        <div
                            className="flex items-center gap-3">
                            <ModeToggle />
                            <Button variant="ghost" className="text-sm">
                                <a href="#">Iniciar Sesión</a>
                            </Button>
                            <Button variant="secondary" className="text-sm">Empezar ahora</Button>
                        </div>
                    </div>
                </div>
            </header>
        </section>
    )
}