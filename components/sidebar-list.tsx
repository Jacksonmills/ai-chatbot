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
import {
  QuestionMarkCircledIcon,
  QuestionMarkIcon
} from '@radix-ui/react-icons'
import { Label } from './ui/label'
import QuestionCard from './question-card'

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
          <h1 className="font-bold text-4xl">Docs</h1>
          <p>
            Access Jackson&apos;s resume and answers to application questions
            below
          </p>

          <div className="flex flex-col gap-4">
            {/* Resume */}
            <Dialog>
              <Label className="p-2 bg-primary/20 border-2 font-bold">
                Resume
              </Label>
              <DialogTrigger className="hover:opacity-25 duration-200 ease">
                <ResumeButton />
              </DialogTrigger>
              <DialogContent className="sm:rounded-none p-0 gap-0 sm:max-w-xl max-w-none">
                <DialogHeader className="p-4">
                  <DialogTitle>Resume</DialogTitle>
                </DialogHeader>
                <div className="p-6">
                  <ScrollArea className="h-[60vh]">
                    <Resume resume={resume} />
                  </ScrollArea>
                </div>
              </DialogContent>
            </Dialog>

            {/* Application Questions */}
            <Dialog>
              <Label className="p-2 bg-accent/20 border-2 font-bold">
                What are some projects you’re proud of?
              </Label>
              <DialogTrigger className="hover:opacity-25 duration-200 ease">
                <QuestionButton />
              </DialogTrigger>
              <DialogContent className="sm:rounded-none p-0 gap-0 sm:max-w-xl max-w-none">
                <DialogHeader className="p-4">
                  <DialogTitle>Question</DialogTitle>
                </DialogHeader>
                <div className="p-6">
                  <QuestionCard
                    question={{
                      question: 'What are some projects you’re proud of?',
                      response:
                        "I'd like to highlight a few projects that showcase my passion for web development and my ability to create engaging, user-centric experiences. First is ComboZ, a web app designed for Dragon Ball FighterZ enthusiasts. It features a combo builder and integrates Chrome's Picture-in-Picture API, allowing users to practice their combos in real-time while referring to the app. This project combines my love for gaming with my web development skills. Next is Ratioed!, a Next.js project that visualizes Twitter ratios. It provides an interactive experience where users can explore tweets and their ratios, and even download playful PNG cards. This project demonstrates my ability to create fun and shareable web experiences. Another project I'm proud of is Oki, an anonymous, temporary chat application designed for fighting game tournaments. It enhances live event engagement by providing a platform for attendees to connect and discuss the tournament in real-time. This project showcases my understanding of real-time communication and event-driven experiences. Lastly, there's the Armored Core Garage, an AI-assisted mech building assistant for Armored Core players. By leveraging OpenAI's GPT-4, this project offers interactive user guidance, helping players create and optimize their mech builds. This demonstrates my interest in exploring the potential of AI in web applications. These projects not only highlight my technical skills but also my creativity and ability to develop solutions that resonate with users."
                    }}
                  />
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <Label className="p-2 bg-secondary/20 border-2 font-bold">
                Why are you excited about the Design Engineer role at Tailwind
                Labs?
              </Label>
              <DialogTrigger className="hover:opacity-25 duration-200 ease">
                <QuestionButton />
              </DialogTrigger>
              <DialogContent className="sm:rounded-none p-0 gap-0 sm:max-w-xl max-w-none">
                <DialogHeader className="p-4">
                  <DialogTitle>Question</DialogTitle>
                </DialogHeader>
                <div className="p-6">
                  <QuestionCard
                    question={{
                      question:
                        'Why are you excited about the Design Engineer role at Tailwind Labs?',
                      response:
                        "I am excited about the Design Engineer role at Tailwind Labs because I strongly resonate with the company's commitment to simplicity and usability. As someone who has spent years as the key UX/Frontend engineer spearheading accessibility and design in the absence of a dedicated UX team, I deeply appreciate Tailwind's philosophy. My journey in front-end development has been marked by a transition from SCSS and styled-components to fully embracing Tailwind CSS over the past year. This shift has not only accelerated my growth but also reinforced my belief in the power of utility-first CSS. I'm particularly drawn to Tailwind Labs for the opportunity to innovate at the intersection of design and functionality. My excitement lies in crafting experiences that are as intuitive as they are visually stunning. Having relied heavily on best practices and the Refactoring UI book written by Adam Wathan, I am thrilled at the prospect of contributing to projects that will be used by millions of developers worldwide and helping to shape the future of such an innovative company."
                    }}
                  />
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <Label className="p-2 bg-primary/20 border-2 font-bold">
                What open-source projects have you contributed to?
              </Label>
              <DialogTrigger className="hover:opacity-25 duration-200 ease">
                <QuestionButton />
              </DialogTrigger>
              <DialogContent className="sm:rounded-none p-0 gap-0 sm:max-w-xl max-w-none">
                <DialogHeader className="p-4">
                  <DialogTitle>Question</DialogTitle>
                </DialogHeader>
                <div className="p-6">
                  <QuestionCard
                    question={{
                      question:
                        'What open-source projects have you contributed to?',
                      response:
                        "My contributions to open-source projects showcase my commitment to the developer community and my ability to collaborate effectively. I've worked on an AI wearable device project, developing the web application using Tailwind CSS and Next.js. I've also contributed to popular projects like the T3 Stack and Typehero, submitting pull requests and engaging in meaningful discussions. Moreover, I actively participate in the issues and discussions of projects that inspire me, such as shadcn/ui. By providing insights, reporting bugs, and suggesting improvements, I aim to give back to the community and help shape the future of these powerful tools."
                    }}
                  />
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <Label className="p-2 bg-accent/20 border-2 font-bold">
                How is your teaching ability?
              </Label>
              <DialogTrigger className="hover:opacity-25 duration-200 ease">
                <QuestionButton />
              </DialogTrigger>
              <DialogContent className="sm:rounded-none p-0 gap-0 sm:max-w-xl max-w-none">
                <DialogHeader className="p-4">
                  <DialogTitle>Question</DialogTitle>
                </DialogHeader>
                <div className="p-6">
                  <QuestionCard
                    question={{
                      question: 'How is your teaching ability?',
                      response:
                        "At SteelSeries, I've led initiatives to demystify our tech stack, fostering an environment where knowledge sharing is second nature. I'm passionate about making technology accessible to everyone. By adhering to best practices and leveraging modern CSS, JavaScript, and TypeScript, I strive to create clear, concise, and well-documented code. This not only benefits the end-users but also enables fellow developers to easily understand and build upon my work. As an avid learner, I'm constantly exploring new technologies and techniques. This curiosity allows me to stay at the forefront of the industry and share my knowledge with others. Whether it's through mentoring, writing technical documentation, or contributing to open-source projects, I'm committed to helping others grow and succeed in their development careers."
                    }}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  )
}

const QuestionButton = () => {
  return (
    <div className="size-full border-2 p-2 flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <div className="flex flex-col gap-2 w-5/6">
          <Skeleton className="w-full h-2 rounded-none bg-border animate-none" />
          <Skeleton className="w-full h-2 rounded-none bg-border animate-none" />
        </div>
        <div className="flex flex-col gap-2 w-auto">
          <QuestionMarkCircledIcon className="size-12 text-border" />
        </div>
      </div>
      <Skeleton className="w-full h-2 rounded-none bg-border animate-none" />
      <Skeleton className="w-full h-2 rounded-none bg-border animate-none" />
      <Skeleton className="w-full h-2 rounded-none bg-border animate-none" />
      <Skeleton className="w-full h-2 rounded-none bg-border animate-none" />
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

      <span className="h-2" />

      <Skeleton className="w-full h-2 rounded-none bg-border animate-none" />
      <Skeleton className="w-full h-2 rounded-none bg-border animate-none" />
      <Skeleton className="w-full h-2 rounded-none bg-border animate-none" />
      <Skeleton className="w-full h-2 rounded-none bg-border animate-none" />

      <span className="h-2" />

      <Skeleton className="w-full h-2 rounded-none bg-border animate-none" />
      <Skeleton className="w-full h-2 rounded-none bg-border animate-none" />
      <Skeleton className="w-full h-2 rounded-none bg-border animate-none" />
      <Skeleton className="w-full h-2 rounded-none bg-border animate-none" />
    </div>
  </AspectRatio>
)
