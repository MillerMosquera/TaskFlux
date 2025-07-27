'use client';

import TeamMemberLine from "@/app/team-collaboration/delivery/team/components/TeamMemberLine";
import { User } from "@/shared/types/database";
import { motion } from "framer-motion";

interface TeamMembersProps {
  users: User[];
}

function TeamMembers({ users }: TeamMembersProps) {
  return (
    <motion.div 
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="bg-container px-6 py-3 text-sm flex items-center text-muted-foreground border-b sticky top-0 z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="w-[60%] sm:w-[70%] xl:w-[46%] font-medium flex items-center">Nombre</div>
        <div className="w-[20%] sm:w-[10%] xl:w-[13%] font-medium flex items-center justify-center">Estado</div>
        <div className="hidden w-[10%] sm:flex items-center justify-center font-medium">Rol</div>
        <div className="hidden xl:flex xl:w-[13%] items-center justify-center font-medium">Se unió</div>
        <div className="hidden xl:flex xl:w-[13%] items-center justify-center font-medium">Equipos</div>
        <div className="w-[20%] sm:w-[10%] font-medium flex items-center justify-center">Tareas</div>
      </motion.div>

      <div className="w-full">
        {users.map((user, index) => (
          <TeamMemberLine key={user.id} user={user} index={index} />
        ))}
      </div>
    </motion.div>
  );
}

export default TeamMembers;
