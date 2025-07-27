'use client';

import { Button } from "@/shared/ui/button";
import { Plus } from "lucide-react";

interface TeamHeaderProps {
  onInvite: () => void;
  memberCount: number;
  totalMembers?: number;
  hasActiveFilters?: boolean;
}

function TeamHeader({ onInvite, memberCount, totalMembers, hasActiveFilters }: TeamHeaderProps) {
  const displayText = hasActiveFilters && totalMembers 
    ? `${memberCount} de ${totalMembers} miembros` 
    : `${memberCount} miembros`;

  return (
    <div className="w-full flex justify-between items-center border-b py-3 px-6 h-12 bg-background">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold">Miembros</span>
          <span className={`text-xs rounded-md px-2 py-1 font-medium ${hasActiveFilters ? 'bg-primary/10 text-primary' : 'bg-accent'}`}>
            {displayText}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button className="relative" size="sm" variant="secondary" onClick={onInvite}>
          <Plus className="size-4" />
          Invitar
        </Button>
      </div>
    </div>
  );
}

export default TeamHeader;
