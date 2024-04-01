import { fetchResume } from '@/lib/chat/actions'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'
import { AspectRatio } from './ui/aspect-ratio'
import { Skeleton } from './ui/skeleton'
import Resume from './resume'
import { ScrollArea } from './ui/scroll-area'

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
          <Dialog>
            <DialogTrigger className="hover:opacity-25 duration-200 ease">
              <ResumeButton />
            </DialogTrigger>
            <DialogContent className="sm:rounded-none p-0 gap-0 sm:max-w-xl max-w-none">
              <DialogHeader className="border-t-2 border-x-2 p-4">
                <DialogTitle>Resume</DialogTitle>
                <DialogDescription>
                  View Jackson&apos;s resume below
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="h-[60vh]">
                <Resume resume={resume} />
              </ScrollArea>
            </DialogContent>
          </Dialog>

          <Button className="rounded-none">
            <a href="/cover-letter">Cover Letter</a>
          </Button>
          <Button className="rounded-none">
            <a href="/portfolio">Questions</a>
          </Button>
        </div>
      </div>
    </div>
  )
}

const ResumeButton = () => (
  <AspectRatio ratio={6 / 8}>
    <div className="size-full border-2 p-2 flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="flex flex-col gap-2 w-1/2">
          <Skeleton className="w-full h-2 rounded-none bg-border animate-none" />
          <Skeleton className="w-full h-2 rounded-none bg-border animate-none" />
          <Skeleton className="w-full h-2 rounded-none bg-border animate-none" />
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <Skeleton className="w-full h-6 rounded-none bg-border animate-none" />
          <Skeleton className="w-full h-6 rounded-none bg-border animate-none" />
        </div>
      </div>
      <Skeleton className="w-full h-2 rounded-none bg-border animate-none" />
      <Skeleton className="w-full h-2 rounded-none bg-border animate-none" />
      <Skeleton className="w-full h-2 rounded-none bg-border animate-none" />
      <Skeleton className="w-full h-2 rounded-none bg-border animate-none" />

      <span className="h-6" />

      <Skeleton className="w-full h-2 rounded-none bg-border animate-none" />
      <Skeleton className="w-full h-2 rounded-none bg-border animate-none" />
      <Skeleton className="w-full h-2 rounded-none bg-border animate-none" />
      <Skeleton className="w-full h-2 rounded-none bg-border animate-none" />
    </div>
  </AspectRatio>
)
