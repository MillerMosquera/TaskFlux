import { useState} from "react";

// Custom hooks
export const useHeaderState = () => {
    const [taskModalOpen, setTaskModalOpen] = useState(false)
    const [goalModalOpen, setGoalModalOpen] = useState(false)
    const [inviteModalOpen, setInviteModalOpen] = useState(false)
    const [profileModalOpen, setProfileModalOpen] = useState(false)
    const [preferencesModalOpen, setPreferencesModalOpen] = useState(false)
    const [currentTaskView, setCurrentTaskView] = useState<"list" | "board" | "calendar">("list")

    return {
        taskModalOpen, setTaskModalOpen,
        goalModalOpen, setGoalModalOpen,
        inviteModalOpen, setInviteModalOpen,
        profileModalOpen, setProfileModalOpen,
        preferencesModalOpen, setPreferencesModalOpen,
        currentTaskView, setCurrentTaskView,
    }
}