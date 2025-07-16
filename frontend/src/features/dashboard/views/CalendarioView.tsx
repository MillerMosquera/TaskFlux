export function CalendarioView() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Calendario</h1>
                <p className="text-muted-foreground">
                    Encuentra guías, tutoriales y recursos
                </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                    <div className="bg-muted/50 rounded-xl p-6">
                        <h3 className="font-semibold mb-2">Introducción</h3>
                        <p className="text-sm text-muted-foreground">
                            Primeros pasos con la plataforma
                        </p>
                    </div>
                    
                    <div className="bg-muted/50 rounded-xl p-6">
                        <h3 className="font-semibold mb-2">Comenzar</h3>
                        <p className="text-sm text-muted-foreground">
                            Guía rápida de configuración inicial
                        </p>
                    </div>
                </div>
                
                <div className="space-y-4">
                    <div className="bg-muted/50 rounded-xl p-6">
                        <h3 className="font-semibold mb-2">Tutoriales</h3>
                        <p className="text-sm text-muted-foreground">
                            Aprende paso a paso con ejemplos
                        </p>
                    </div>
                    
                    <div className="bg-muted/50 rounded-xl p-6">
                        <h3 className="font-semibold mb-2">Changelog</h3>
                        <p className="text-sm text-muted-foreground">
                            Últimas actualizaciones y mejoras
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
