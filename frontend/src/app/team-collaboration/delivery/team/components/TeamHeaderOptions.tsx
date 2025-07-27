'use client';

import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Grid3X3, List, ListFilter, X } from "lucide-react";

interface TeamHeaderOptionsProps {
  viewMode: 'table' | 'cards';
  onViewModeChange: (mode: 'table' | 'cards') => void;
  availableTeams: string[];
  selectedTeams: string[];
  onTeamFilterChange: (teams: string[]) => void;
}

function TeamHeaderOptions({ 
  viewMode, 
  onViewModeChange, 
  availableTeams, 
  selectedTeams, 
  onTeamFilterChange 
}: TeamHeaderOptionsProps) {
  const handleTeamToggle = (team: string) => {
    if (selectedTeams.includes(team)) {
      onTeamFilterChange(selectedTeams.filter(t => t !== team));
    } else {
      onTeamFilterChange([...selectedTeams, team]);
    }
  };

  const handleClearFilters = () => {
    onTeamFilterChange([]);
  };

  const hasActiveFilters = selectedTeams.length > 0;

  return (
    <div className="w-full flex justify-between items-center border-b py-2 px-6 h-11 bg-muted/30">
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              size="sm" 
              variant="ghost" 
              className={`text-muted-foreground hover:text-foreground ${hasActiveFilters ? 'text-primary bg-primary/10' : ''}`}
            >
              <ListFilter className="size-4 mr-1" />
              Filtrar
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-1 h-4 px-1 text-xs">
                  {selectedTeams.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56" align="start">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm">Filtrar por equipos</h4>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearFilters}
                    className="h-6 px-2 text-xs"
                  >
                    <X className="size-3 mr-1" />
                    Limpiar
                  </Button>
                )}
              </div>
              <div className="space-y-2">
                {availableTeams.map((team) => (
                  <div key={team} className="flex items-center space-x-2">
                    <Checkbox
                      id={`team-${team}`}
                      checked={selectedTeams.includes(team)}
                      onCheckedChange={() => handleTeamToggle(team)}
                    />
                    <label
                      htmlFor={`team-${team}`}
                      className="text-sm font-normal cursor-pointer flex-1"
                    >
                      {team}
                    </label>
                  </div>
                ))}
              </div>
              {selectedTeams.length > 0 && (
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    {selectedTeams.length} de {availableTeams.length} equipos seleccionados
                  </p>
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="flex items-center gap-1 bg-background border rounded-md p-1">
        <Button 
          size="sm" 
          variant={viewMode === 'table' ? 'default' : 'ghost'}
          onClick={() => onViewModeChange('table')}
          className="h-7 px-3"
        >
          <List className="size-4 mr-1" />
          Tabla
        </Button>
        <Button 
          size="sm" 
          variant={viewMode === 'cards' ? 'default' : 'ghost'}
          onClick={() => onViewModeChange('cards')}
          className="h-7 px-3"
        >
          <Grid3X3 className="size-4 mr-1" />
          Cards
        </Button>
      </div>
    </div>
  );
}

export default TeamHeaderOptions;
