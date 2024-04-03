import React from 'react'
import { Skeleton } from './ui/skeleton'
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons'

export default function QuestionSkeleton() {
  return (
    <div className="size-full border-2 p-2 flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <div className="flex flex-col gap-2 w-5/6">
          <Skeleton className="w-full h-2 rounded-none bg-border " />
          <Skeleton className="w-full h-2 rounded-none bg-border " />
        </div>
        <div className="flex flex-col gap-2 w-auto">
          <QuestionMarkCircledIcon className="size-12 text-border" />
        </div>
      </div>
      <Skeleton className="w-full h-2 rounded-none bg-border " />
      <Skeleton className="w-full h-2 rounded-none bg-border " />
      <Skeleton className="w-full h-2 rounded-none bg-border " />
      <Skeleton className="w-full h-2 rounded-none bg-border " />
    </div>
  )
}
