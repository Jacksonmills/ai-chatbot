import * as React from 'react'

import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { IconShare } from '@/components/ui/icons'
import { FooterText } from '@/components/footer'
import { useAIState, useActions, useUIState } from 'ai/rsc'
import type { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { UserMessage } from './message'

export interface ChatPanelProps {
  id?: string
  title?: string
  input: string
  setInput: (value: string) => void
  isAtBottom: boolean
  scrollToBottom: () => void
}

export function ChatPanel({
  id,
  title,
  input,
  setInput,
  isAtBottom,
  scrollToBottom
}: ChatPanelProps) {
  const [aiState] = useAIState()
  const [messages, setMessages] = useUIState<typeof AI>()
  const { submitUserMessage } = useActions()
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false)

  const exampleMessages = [
    {
      heading: 'Show me',
      subheading: 'Jackson Mills’ resume highlights',
      message: `Can you show me Jackson Mills’ resume highlights?`
    },
    {
      heading: 'What are Jackson’s',
      subheading: 'key projects and technologies used?',
      message: `What are Jackson Mills’ key projects and the technologies used in them?`
    },
    {
      heading: 'I’d like to see Jackson’s response to',
      subheading: 'application question about Tailwind CSS experience',
      message: `I’d like to see Jackson’s response to the application question regarding his experience with Tailwind CSS.`
    },
    {
      heading: 'Can we simulate',
      subheading: 'an interview scenario based on Jackson’s skills?',
      message: `Can we simulate an interview scenario based on Jackson’s skills in React and TypeScript?`
    }
  ]

  return (
    <div className="w-full duration-300 ease-in-out animate-in fixed inset-x-0 bottom-0 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
      <ButtonScrollToBottom
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />

      <div className="mx-auto sm:max-w-2xl sm:pl-2 sm:pr-6">
        <div className="grid grid-cols-2 border">
          {messages.length === 0 &&
            exampleMessages.map((example, index) => (
              <div
                key={example.heading}
                className={`cursor-pointer border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${
                  index > 1 && 'hidden md:block'
                }`}
                onClick={async () => {
                  setMessages(currentMessages => [
                    ...currentMessages,
                    {
                      id: nanoid(),
                      display: <UserMessage>{example.message}</UserMessage>
                    }
                  ])

                  const responseMessage = await submitUserMessage(
                    example.message
                  )

                  setMessages(currentMessages => [
                    ...currentMessages,
                    responseMessage
                  ])
                }}
              >
                <div className="text-sm font-semibold">{example.heading}</div>
                <div className="text-sm text-zinc-600">
                  {example.subheading}
                </div>
              </div>
            ))}
        </div>

        <div className="border-t-0 bg-background sm:border-x-2">
          <PromptForm input={input} setInput={setInput} />
          <FooterText className="hidden sm:block py-2" />
        </div>
      </div>
    </div>
  )
}
