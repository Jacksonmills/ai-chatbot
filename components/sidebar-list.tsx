import { SidebarItems } from '@/components/sidebar-items'
import { ThemeToggle } from '@/components/theme-toggle'
import { cache } from 'react'

interface SidebarListProps {
  userId?: string
  children?: React.ReactNode
}

export async function SidebarList({}: SidebarListProps) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-auto">
        <div className="p-8 text-center">
          <p className="text-sm text-muted-foreground">No chat history</p>
        </div>
      </div>
      <div className="flex items-center justify-between p-4">
        <ThemeToggle />
      </div>
    </div>
  )
}
