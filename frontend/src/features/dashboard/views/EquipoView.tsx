export function EquipoView() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Configuración</h1>
                <p className="text-muted-foreground">
                    Personaliza tu experiencia y configuración
                </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-muted/50 rounded-xl p-6">
                    <h3 className="font-semibold mb-2">General</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Configuración básica de la aplicación
                    </p>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Modo oscuro</span>
                            <input type="checkbox" className="toggle" />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Notificaciones</span>
                            <input type="checkbox" className="toggle" />
                        </div>
                    </div>
                </div>
                
                <div className="bg-muted/50 rounded-xl p-6">
                    <h3 className="font-semibold mb-2">Equipo</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Gestiona miembros y permisos
                    </p>
                    <div className="space-y-2">
                        <div className="text-sm">3 miembros activos</div>
                        <div className="text-sm">2 invitaciones pendientes</div>
                    </div>
                </div>
                
                <div className="bg-muted/50 rounded-xl p-6">
                    <h3 className="font-semibold mb-2">Facturación</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Información de pagos y suscripción
                    </p>
                    <div className="space-y-2">
                        <div className="text-sm">Plan: Pro</div>
                        <div className="text-sm">Próximo pago: 15 de Agosto</div>
                    </div>
                </div>
                
                <div className="bg-muted/50 rounded-xl p-6">
                    <h3 className="font-semibold mb-2">Límites</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Uso de recursos y límites
                    </p>
                    <div className="space-y-2">
                        <div className="text-sm">API calls: 250/1000</div>
                        <div className="text-sm">Storage: 1.2GB/5GB</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
