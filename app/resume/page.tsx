import Resume from '@/components/resume'
import { fetchResume } from '@/lib/chat/actions'
import React from 'react'

export default async function Page() {
  const resume = await fetchResume()
  return (
    <div className="flex items-center justify-center w-full">
      <div className="p-4 max-w-xl ">
        <Resume resume={resume} />
      </div>
    </div>
  )
}
