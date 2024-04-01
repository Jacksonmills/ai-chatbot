import { Sidebar } from '@/components/sidebar'
import { SidebarList } from './sidebar-list'

export async function SidebarDesktop() {
  return (
    <Sidebar className="peer absolute inset-y-0 z-30 hidden -translate-x-full border-r-2 bg-muted duration-300 ease-in-out data-[state=open]:translate-x-0 lg:flex lg:w-[250px] xl:w-[300px]">
      <SidebarList />
    </Sidebar>
  )
}
