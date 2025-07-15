import { useApp } from '@/app/context/app-context';
import { ActionButtons } from "@/features/dashboard/components/header/action-buttons.tsx";
import UserProfile from "@/features/dashboard/components/header/user-profile.tsx";
import { useHeaderState } from '@/features/dashboard/hooks/useHeader';
import { GoalModal } from "@/features/dashboard/modals/goal-modal.tsx";
import { InviteModal } from "@/features/dashboard/modals/invite-modal.tsx";
import { PreferencesModal } from "@/features/dashboard/modals/preferences-modal.tsx";
import { ProfileModal } from "@/features/dashboard/modals/profile-modal.tsx";
import { TaskModal } from "@/features/dashboard/modals/task-modal.tsx";


export function Header() {
    const { state } = useApp()
    const {
        taskModalOpen, setTaskModalOpen,
        goalModalOpen, setGoalModalOpen,
        inviteModalOpen, setInviteModalOpen,
        profileModalOpen, setProfileModalOpen,
        preferencesModalOpen, setPreferencesModalOpen,
        currentTaskView,
    } = useHeaderState()

    return (
        <>
            <div className="bg-background">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                    </div>

                    <div className="flex items-center gap-2">
                        <ActionButtons
                            onNewTask={() => setTaskModalOpen(true)}
                            onNewGoal={() => setGoalModalOpen(true)}
                            onInvite={() => setInviteModalOpen(true)}
                        />

                        <UserProfile
                            onProfileClick={() => setProfileModalOpen(true)}
                            onPreferencesClick={() => setPreferencesModalOpen(true)}
                        />
                    </div>
                </div>
            </div>

            <TaskModal
                open={taskModalOpen}
                onOpenChange={setTaskModalOpen}
                listId={state.currentList}
                currentView={currentTaskView}
            />

            <GoalModal open={goalModalOpen} onOpenChange={setGoalModalOpen} />
            <InviteModal open={inviteModalOpen} onOpenChange={setInviteModalOpen} />
            <ProfileModal open={profileModalOpen} onOpenChange={setProfileModalOpen} />
            <PreferencesModal open={preferencesModalOpen} onOpenChange={setPreferencesModalOpen} />

        </>
    )
}
