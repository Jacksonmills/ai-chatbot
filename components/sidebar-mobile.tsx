'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger
} from '@/components/ui/sheet'

import { Sidebar } from '@/components/sidebar'
import { Button } from '@/components/ui/button'

import { IconSidebar } from '@/components/ui/icons'

interface SidebarMobileProps {
  children: React.ReactNode
}

export function SidebarMobile({ children }: SidebarMobileProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="accent"
          className="flex size-9 p-0 lg:hidden rounded-none border-none h-[40px]"
        >
          <IconSidebar className="size-6" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="inset-y-0 flex h-auto w-[300px] flex-col p-0"
      >
        <Sidebar className="flex p-2 bg-muted border-r-2">{children}</Sidebar>
      </SheetContent>
    </Sheet>
  )
}
