import { SidebarMobile } from './sidebar-mobile'
import { SidebarList } from './sidebar-list'
import { SidebarToggle } from './sidebar-toggle'
import { Avatar, AvatarImage } from './ui/avatar'
import { ArrowLeftIcon } from '@radix-ui/react-icons'

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full border-b-2 shrink-0 backdrop-blur-xl bg-muted">
      <div className="flex items-center w-full">
        <div className="border-r-2">
          <SidebarToggle />
          <SidebarMobile>
            <SidebarList />
          </SidebarMobile>
        </div>
        <div className="ml-auto flex gap-2 items-center">
          <span className="text-2xl animate-wave">👋</span>
          <Avatar className="rounded-none border-l-2">
            <AvatarImage
              src="https://media.licdn.com/dms/image/D5603AQEzcIVVZG0hUA/profile-displayphoto-shrink_200_200/0/1699901752431?e=1717027200&v=beta&t=yRJ_nUgADfWvfhkNetj9kbXc8eO1n-GCGFyliGDAMcY"
              alt="avatar"
            />
          </Avatar>
        </div>
      </div>
    </header>
  )
}
