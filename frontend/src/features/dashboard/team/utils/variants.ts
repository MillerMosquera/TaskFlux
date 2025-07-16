
export const cardVariants = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.95,
        filter: "blur(4px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            type: "spring" as const,
            stiffness: 350,
            damping: 22,
            duration: 0.6,
        },
    },
    hover: {
        y: -8,
        scale: 1.02,
        transition: {
            type: "spring" as const,
            stiffness: 400,
            damping: 10,
        },
    },
    tap: {
        scale: 0.98,
        transition: {
            duration: 0.1,
        },
    },
}

export const avatarVariants = {
    hidden: {
        scale: 0,
        rotate: -180,
    },
    visible: {
        scale: 1,
        rotate: 0,
        transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 15,
            delay: 0.2,
        },
    },
    hover: {
        scale: 1.1,
        rotate: 5,
        transition: {
            type: "spring" as const,
            stiffness: 400,
            damping: 10,
        },
    },
}

export const badgeVariants = {
    hidden: {
        opacity: 0,
        x: 20,
        scale: 0.5,
    },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 20,
            delay: 0.3,
        },
    },
}

export const statsVariants = {
    hidden: {
        opacity: 0,
        y: 10,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 20,
            delay: 0.4,
        },
    },
}

export const progressBarVariants = {
    hidden: {
        width: 0,
    },
    visible: {
        width: "100%",
        transition: {
            type: "spring" as const,
            stiffness: 200,
            damping: 20,
            delay: 0.6,
        },
    },
}

export const progressFillVariants = {
    hidden: {
        width: 0,
    },
    visible: (completionRate: number) => ({
        width: `${completionRate}%`,
        transition: {
            type: "spring" as const,
            stiffness: 200,
            damping: 20,
            delay: 0.8,
        },
    }),
}

export const buttonVariants = {
    hidden: {
        opacity: 0,
        y: 10,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 20,
            delay: 0.9,
        },
    },
    hover: {
        y: -2,
        transition: {
            type: "spring" as const,
            stiffness: 400,
            damping: 10,
        },
    },
    tap: {
        y: 0,
        scale: 0.98,
        transition: {
            duration: 0.1,
        },
    },
}

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

export const cardStatsVariants = {
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