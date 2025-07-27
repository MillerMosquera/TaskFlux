'use client'

import { useViewStore, ViewType } from '@/shared/hooks/use-view-store'
import { Button } from '@/shared/ui/button'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { cn } from '@/shared/utils/utils'
import { LayoutGrid, LayoutList, ListFilter, SlidersHorizontal } from 'lucide-react'

export default function ProjectHeaderOptions() {
  const { viewType, setViewType } = useViewStore()

  const handleViewChange = (type: ViewType) => {
    setViewType(type)
  }

  return (
    <div className="w-full flex justify-between items-center border-b py-1.5 px-6 h-10">
      <Button size="sm" variant="ghost">
        <ListFilter className="size-4 mr-1" />
        Filter
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="relative" size="sm" variant="secondary">
            <SlidersHorizontal className="size-4 mr-1" />
            Display
            {viewType === 'board' && (
              <span className="absolute right-0 top-0 w-2 h-2 bg-orange-500 rounded-full" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-72 flex p-3 gap-2" align="end">
          <DropdownMenuItem
            onClick={() => handleViewChange('list')}
            className={cn(
              'w-full text-xs border border-accent flex flex-col gap-1 p-4 cursor-pointer',
              viewType === 'list' ? 'bg-accent' : ''
            )}
          >
            <LayoutList className="size-4" />
            List
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleViewChange('board')}
            className={cn(
              'w-full text-xs border border-accent flex flex-col gap-1 p-4 cursor-pointer',
              viewType === 'board' ? 'bg-accent' : ''
            )}
          >
            <LayoutGrid className="size-4" />
            Board
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
