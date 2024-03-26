import { SidebarMobile } from './sidebar-mobile'
import { SidebarList } from './sidebar-list'

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-2 shrink-0 backdrop-blur-xl bg-muted">
      <div className="pr-2">
        <SidebarMobile>
          <SidebarList />
        </SidebarMobile>
      </div>
      <div className="overflow-hidden size-full flex border-l-2 -mr-4">
        <span className="bg-pattern size-[100vw] rotate-45 relative -top-20 left-20" />
      </div>
    </header>
  )
}
