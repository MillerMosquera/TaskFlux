'use client';

import ProjectLine from '@/app/project-management/common/project-line';
import { projects } from '@/app/project-management/data/projects';
import { motion } from 'framer-motion';

export default function Projects() {
   return (
      <motion.div 
         className="w-full"
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, ease: "easeOut" }}
      >
         <motion.div 
            className="bg-container px-6 py-1.5 text-sm flex items-center text-muted-foreground border-b sticky top-0 z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
         >
            <div className="w-[60%] sm:w-[70%] xl:w-[46%] flex items-center gap-2">
               <div className="size-6"></div> {/* Espacio para el icono */}
               <span>Title</span>
            </div>
            <div className="flex justify-start w-[20%] sm:w-[10%] xl:w-[13%]">Health</div>
            <div className="flex justify-start w-[10%] sm:w-[10%]">Priority</div>
            <div className="flex justify-start xl:w-[13%]">Lead</div>
            <div className="flex justify-center xl:w-[13%]">Target date</div>
            <div className="flex justify-start w-[20%] sm:w-[10%]">Status</div>
         </motion.div>

         <motion.div 
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
         >
            {projects.map((project, index) => (
               <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -30, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ 
                     duration: 0.5, 
                     delay: 0.6 + (index * 0.08),
                     ease: "easeOut" 
                  }}
                  whileHover={{ 
                     scale: 1.01,
                     transition: { duration: 0.2 }
                  }}
                  className="transform-gpu"
               >
                  <ProjectLine project={project} />
               </motion.div>
            ))}
         </motion.div>
      </motion.div>
   );
}
