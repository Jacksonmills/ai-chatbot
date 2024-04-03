import { Separator } from '@/components/ui/separator'
import { UIState } from '@/lib/chat/actions'
import Link from 'next/link'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

export interface ChatList {
  messages: UIState
}

export function ChatList({ messages }: ChatList) {
  if (!messages.length) {
    return null
  }

  return (
    <div className="relative mx-auto max-w-2xl px-4">
      {messages.map((message, index) => (
        <div key={message.id} className="my-4 flex justify-end">
          {message.display}
        </div>
      ))}
    </div>
  )
}
