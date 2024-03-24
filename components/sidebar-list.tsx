import { ThemeToggle } from '@/components/theme-toggle'
import { SidebarContent } from './sidebar-content'

interface SidebarListProps {
  userId?: string
  children?: React.ReactNode
}

export async function SidebarList({}: SidebarListProps) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <SidebarContent />
        </div>
      </div>
      <div className="flex items-center justify-between p-4">
        <ThemeToggle />
      </div>
    </div>
  )
}
