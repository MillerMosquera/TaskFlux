import { Project } from '@/app/project-management/data/projects';
import { DatePicker } from './date-picker';
import { HealthPopover } from './health-popover';
import { LeadSelector } from './lead-selector';
import { PrioritySelector } from './priority-selector';
import { StatusWithPercent } from './status-with-percent';

interface ProjectLineProps {
   project: Project;
}

export default function ProjectLine({ project }: ProjectLineProps) {
   return (
      <div className="w-full flex items-center py-3 px-6 border-b hover:bg-sidebar/50 border-muted-foreground/5 text-sm transition-all duration-300 ease-out hover:shadow-sm group">
         <div className="w-[60%] sm:w-[70%] xl:w-[46%] flex items-center gap-2">
            <div className="relative">
               <div className="inline-flex size-6 bg-muted/50 items-center justify-center rounded shrink-0 transition-all duration-200 group-hover:bg-primary/10 group-hover:scale-110">
                  <project.icon className="size-4 transition-colors duration-200 group-hover:text-primary" />
               </div>
            </div>
            <div className="flex flex-col items-start overflow-hidden">
               <span className="font-medium truncate w-full transition-colors duration-200 group-hover:text-foreground">{project.name}</span>
            </div>
         </div>

         <div className="w-[20%] sm:w-[10%] xl:w-[13%] transform transition-transform duration-200 group-hover:scale-105">
            <HealthPopover project={project} />
         </div>

         <div className="hidden w-[10%] sm:block transform transition-transform duration-200 group-hover:scale-105">
            <PrioritySelector priority={project.priority} />
         </div>
         <div className="hidden xl:block xl:w-[13%] transform transition-transform duration-200 group-hover:scale-105">
            <LeadSelector lead={project.lead} />
         </div>

         <div className="hidden xl:block xl:w-[13%] transform transition-transform duration-200 group-hover:scale-105">
            <DatePicker date={project.startDate ? new Date(project.startDate) : undefined} />
         </div>

         <div className="w-[20%] sm:w-[10%] transform transition-transform duration-200 group-hover:scale-105">
            <StatusWithPercent status={project.status} percentComplete={project.percentComplete} />
         </div>
      </div>
   );
}
