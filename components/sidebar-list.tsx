import { fetchResume } from '@/lib/chat/actions'
import { Button } from './ui/button'

interface SidebarListProps {
  userId?: string
  children?: React.ReactNode
}

export async function SidebarList({}: SidebarListProps) {
  const resume = await fetchResume()

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-auto">
        <div className="p-8 flex flex-col gap-2">
          <h1 className="font-bold text-4xl">About me</h1>
          <p>
            Access all of Jackson&apos;s Documents here if you would rather not
            chat
          </p>
          <Button className="rounded-none">
            <a href="/resume">Resume</a>
          </Button>
          <Button className="rounded-none">
            <a href="/cover-letter">Cover Letter</a>
          </Button>
          <Button className="rounded-none">
            <a href="/portfolio">Questions</a>
          </Button>
          {/* <Resume props={resume} /> */}
        </div>
      </div>
    </div>
  )
}
