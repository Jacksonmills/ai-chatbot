import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-lg font-semibold">
          {`🌟 Hey there! I'm Jackson Mills 🌟`}
        </h1>
        <p className="leading-normal text-muted-foreground">
          {`I'm Jackson Mills, a Frontend/Fullstack Engineer with a passion for integrating modern technologies to create engaging user experiences. This project is a showcase of my skills in leveraging Next.js, the cutting-edge Vercel AI SDK, and Vercel KV for state management.`}
        </p>
        <p className="leading-normal text-muted-foreground">
          {`Utilizing React Server Components, this AI chatbot app is a testament to my ability to blend text-based interactions with dynamic, generative UI elements. The real magic happens as the UI state syncs seamlessly through the SDK, ensuring the model adapts to user interactions in real-time.`}
        </p>
        <p className="leading-normal text-muted-foreground">
          {`Designed with a focus on user-centric development and the innovative
          use of AI, this project reflects my enthusiasm for exploring new
          frontiers in web development. I'm excited to present this as part of
          my application for the Design Engineer role at Tailwind Labs,
          demonstrating my commitment to pushing the boundaries of what's
          possible with Tailwind CSS and beyond.`}
        </p>
      </div>
    </div>
  )
}
