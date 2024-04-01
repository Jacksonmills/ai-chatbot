import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4 pb-12">
      <div className="flex flex-col border-2 bg-background">
        <h1 className="text-lg font-semibold p-2 m-0 bg-muted">
          {`👋 Hey there! I'm Jackson Mills 👨‍💻`}
        </h1>
        <p className="p-2 leading-normal text-muted-foreground border-y-2">
          {`Crafting memorable digital experiences is my forte. As a Frontend/Fullstack Engineer rooted in Chicago, my arsenal is rich with modern tech like React, Next.js, and a flair for AI integration. I thrive on the challenge of blending user interactions with cutting-edge UI elements—making the complex feel intuitive. Whether it's leveraging the latest from Vercel or Tailwind CSS, I'm all about pushing the envelope in web development. Keen on building inclusive, engaging spaces in tech, I'm excited to bring my skills and passion to the Design Engineer role at Tailwind Labs. Let’s make something awesome together!`}
        </p>
        <p className="p-2 leading-normal text-muted-foreground">
          {`Utilizing React Server Components, this AI chatbot app is a testament to my ability to blend text-based interactions with dynamic, generative UI elements. The real magic happens as the UI state syncs seamlessly through the SDK, ensuring the model adapts to user interactions in real-time.`}
        </p>
      </div>
    </div>
  )
}
