import 'server-only'

import {
  createAI,
  getMutableAIState,
  render,
  createStreamableValue
} from 'ai/rsc'
import OpenAI from 'openai'

import { z } from 'zod'
import { sleep, nanoid } from '@/lib/utils'
import { Chat } from '@/lib/types'
import fs from 'fs'
import { promisify } from 'util'
import path from 'path'
import Resume, { ResumeType } from '@/components/resume'
import ResumeEducation from '@/components/resume-education'
import {
  BotCard,
  BotMessage,
  SpinnerMessage,
  UserMessage
} from '@/components/message'
import { StocksSkeleton } from '@/components/stocks-skeleton'

const systemPrompt = `\
    You are a resume and application review assistant bot, designed to aid interviewers and application reviewers in exploring Jackson Mills' application for the Tailwind Labs Design Engineer role. This bot facilitates an interactive examination of Jackson's skills, experiences, and responses to application questions, all through a user-friendly interface.

    Messages inside [] denote a UI element or a user event. For example:

    "[Resume of Jackson Mills]" indicates that Jackson Mills' resume interface is being displayed to the reviewer.
    "[Reviewer has selected to view response to Question 4]" means the reviewer is viewing Jackson's response to the fourth application question in the UI.
    When a reviewer wishes to delve into a specific part of Jackson's resume or a particular application response, use show_resume_section to present the detailed section.
    To view Jackson's answers to application questions, employ show_application_response.
    For showcasing Jackson's portfolio projects that are relevant to the Tailwind Labs application, utilize list_portfolio_projects.
    To simulate potential interview scenarios based on Jackson's application and resume, activate simulate_interview_scenario.
    If a reviewer seeks to initiate actions outside the scope of this demo, such as contacting Jackson directly through the bot, respond that this is a demo and such actions cannot be performed.

    This bot also enables reviewers to engage in discussions about Jackson's qualifications, offering insights into how his experiences and skills align with the role at Tailwind Labs, and can perform calculations if needed to analyze the technical specifics or achievements highlighted in his application.`

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

const readFile = promisify(fs.readFile)

export async function fetchResume(): Promise<ResumeType> {
  const jsonPath = path.join(process.cwd(), 'public', 'resume.json')
  const jsonData = await readFile(jsonPath, 'utf8')
  const resume = JSON.parse(jsonData)

  return resume
}

export async function fetchResumePart<K extends keyof ResumeType>(
  key: K
): Promise<ResumeType[K]> {
  const jsonPath = path.join(process.cwd(), 'public', 'resume.json')
  const jsonData = await readFile(jsonPath, 'utf8')
  const resume: ResumeType = JSON.parse(jsonData)

  return resume[key]
}

async function submitUserMessage(content: string) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: 'user',
        content
      }
    ]
  })

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>
  let textNode: undefined | React.ReactNode

  const ui = render({
    model: 'gpt-3.5-turbo',
    provider: openai,
    initial: <SpinnerMessage />,
    messages: [
      {
        role: 'system',
        content: systemPrompt
      },
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name
      }))
    ],
    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue('')
        textNode = <BotMessage content={textStream.value} />
      }

      if (done) {
        textStream.done()
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: 'assistant',
              content
            }
          ]
        })
      } else {
        textStream.update(delta)
      }

      return textNode
    },
    functions: {
      showEducation: {
        description: 'Show the education of Jackson Mills.',
        parameters: z.object({
          education: z.object({
            degree: z.string().describe('The degree of the person'),
            institution: z.string().describe('The institution of the person'),
            location: z.string().describe('The location of the person'),
            time_period: z.string().describe('The time period of the person')
          })
        }),
        render: async function* () {
          yield (
            <BotCard>
              <StocksSkeleton />
            </BotCard>
          )

          await sleep(1000)

          const education = await fetchResumePart('education')

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'function',
                name: 'showEducation',
                content: JSON.stringify(education)
              }
            ]
          })

          return (
            <BotCard>
              <ResumeEducation education={education} />
            </BotCard>
          )
        }
      },
      showResume: {
        description: 'Show the resume of Jackson Mills.',
        parameters: z.object({
          personal_info: z.object({
            name: z.string().describe('The name of the person'),
            role: z.string().describe('The role of the person'),
            location: z.string().describe('The location of the person'),
            contact_number: z
              .string()
              .describe('The contact number of the person'),
            email: z.string().describe('The email of the person'),
            social_links: z.object({
              Github: z.string().describe('The Github link of the person'),
              LinkedIn: z.string().describe('The LinkedIn link of the person'),
              Portfolio: z.string().describe('The Portfolio link of the person')
            })
          }),
          personal_work: z.array(
            z.object({
              project_name: z.string().describe('The name of the project'),
              description: z
                .string()
                .describe('The description of the project'),
              repo_link: z.string().describe('The repo link of the project')
            })
          ),
          experience: z.array(
            z.object({
              role: z.string().describe('The role of the person'),
              company: z.string().describe('The company of the person'),
              location: z.string().describe('The location of the person'),
              time_period: z.string().describe('The time period of the person'),
              responsibilities: z
                .string()
                .describe('The responsibilities of the person')
            })
          ),
          education: z.object({
            degree: z.string().describe('The degree of the person'),
            institution: z.string().describe('The institution of the person'),
            location: z.string().describe('The location of the person'),
            time_period: z.string().describe('The time period of the person')
          }),
          certifications: z.array(
            z.string().describe('The certifications of the person')
          )
        }),
        render: async function* () {
          yield (
            <BotCard>
              <StocksSkeleton />
            </BotCard>
          )

          await sleep(1000)

          const resume = await fetchResume()

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'function',
                name: 'showResume',
                content: JSON.stringify(resume)
              }
            ]
          })

          return (
            <BotCard>
              <Resume props={resume} />
            </BotCard>
          )
        }
      }
    }
  })

  return {
    id: nanoid(),
    display: ui
  }
}

export type Message = {
  role: 'user' | 'assistant' | 'system' | 'function' | 'data' | 'tool'
  content: string
  id: string
  name?: string
}

export type AIState = {
  chatId: string
  messages: Message[]
}

export type UIState = {
  id: string
  display: React.ReactNode
}[]

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [] }
})

export const getUIStateFromAIState = (aiState: Chat) => {
  return aiState.messages
    .filter(message => message.role !== 'system')
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
      display:
        message.role === 'function' ? (
          message.name === 'showResume' ? (
            <BotCard>
              <Resume props={JSON.parse(message.content)} />
            </BotCard>
          ) : message.name === 'showEducation' ? (
            <BotCard>
              <ResumeEducation education={JSON.parse(message.content)} />
            </BotCard>
          ) : null
        ) : message.role === 'user' ? (
          <UserMessage>{message.content}</UserMessage>
        ) : (
          <BotMessage content={message.content} />
        )
    }))
}
