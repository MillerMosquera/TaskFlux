import { GoalModal } from "@/app/goal-tracking/delivery/modals/goal-modal";
import { ActionButtons } from "@/app/layout/components/header/action-buttons";
import UserProfile from "@/app/layout/components/header/user-profile";
import { useHeaderState } from '@/app/layout/useHeader';
import { TaskModal } from "@/app/task-management/delivery/modals/task-modal";
import { InviteModal } from "@/app/team-collaboration/delivery/modals/invite-modal";
import { PreferencesModal } from "@/app/user-management/delivery/modals/preferences-modal";
import { ProfileModal } from "@/app/user-management/delivery/modals/profile-modal";


export function Header() {
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
                currentView={currentTaskView}
            />

            <GoalModal open={goalModalOpen} onOpenChange={setGoalModalOpen} />
            <InviteModal open={inviteModalOpen} onOpenChange={setInviteModalOpen} />
            <ProfileModal open={profileModalOpen} onOpenChange={setProfileModalOpen} />
            <PreferencesModal open={preferencesModalOpen} onOpenChange={setPreferencesModalOpen} />

        </>
    )
}
