

export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
}

export const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 24,
        },
    },
}

export const cardVariants = {
    hidden: { 
        opacity: 0, 
        scale: 0.8, 
        y: 50,
        rotateX: -15,
        filter: "blur(8px)",
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        rotateX: 0,
        filter: "blur(0px)",
        transition: {
            type: "spring" as const,
            stiffness: 400,
            damping: 25,
            mass: 0.8,
        },
    },
}

// Variantes para los iconos
export const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
        scale: 1,
        rotate: 0,
        transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 20,
            delay: 0.2,
        },
    },
}

// Variantes para los números
export const numberVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 24,
            delay: 0.3,
        },
    },
}

