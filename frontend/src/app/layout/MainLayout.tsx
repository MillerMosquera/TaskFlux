import {motion} from 'framer-motion'
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {ArrowUpRight} from "lucide-react";
import "../../App.css"

export default function MainLayout() {
    return (
        <section>
            <div className="w-full md:py-32 lg:py-40 overflow-hidden">
                <div className="w-full flex flex-col px-4 md:px-6 relative">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                        className="text-center max-w-3xl mx-auto mb-12"
                    >
                        <div className="py-5">
                        <Badge variant="outline" className="rounded-full px-4 py-2> text-sm">
                            Próximamente
                        </Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                            Donde el caos se convierte en claridad.
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Una plataforma para tareas, equipos, enfoque y flujo.
                            <br/>
                            Trabaja más inteligente, no más duro—desde hoy.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="default" className="rounded-full h-12 px-8 text-base">
                                Comienza una prueba
                                <ArrowUpRight/>
                            </Button>
                            <Button variant="secondary" className="rounded-full h-12 px-8 text-base">
                                Demo
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{opacity: 0, y: 40}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.7, delay: 0.2}}
                        className="relative mx-auto max-w-5xl"
                    >
                        <div
                            className="rounded-xl overflow-hidden shadow-2xl border border-border/40 bg-gradient-to-b from-background to-muted/20">
                            <img
                                src="https://cdn.dribbble.com/userupload/16554789/file/original-797a59537249b8666b2aaa1b512d1e04.png?resize=1024x768&vertical=center"
                                width={1280}
                                height={720}
                                alt="Task Managment Dashboard"
                                className="w-full h-auto"

                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}