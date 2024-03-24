import Resume from './resume'
import { fetchResume } from '@/lib/chat/actions'

export async function SidebarContent() {
  const resume = await fetchResume()

  return (
    <>
      <h1>Docs</h1>
      <p>
        Access all of Jackson&apos;s Documents here if you would rather not chat
      </p>
      <Resume props={resume} />
    </>
  )
}
