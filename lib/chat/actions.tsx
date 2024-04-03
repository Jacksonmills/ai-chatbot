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
import Resume, { ResumeSkeleton, ResumeType } from '@/components/resume'
import ResumeEducation from '@/components/resume-education'
import {
  BotCard,
  BotMessage,
  SpinnerMessage,
  UserMessage
} from '@/components/message'
import QuestionCard from '@/components/question-card'
import QuestionSkeleton from '@/components/question-skeleton'

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
      showTeachingExperienceQuestion: {
        description: 'Show the application question about teaching experience.',
        parameters: z.object({
          question: z
            .string()
            .describe('The question about teaching experience'),
          response: z.string().describe('The response of the person')
        }),
        render: async function* () {
          yield (
            <BotCard>
              <QuestionSkeleton />
            </BotCard>
          )

          await sleep(1000)

          const teachingExperienceQuestion = {
            question: 'How is your teaching ability?',
            response:
              "At SteelSeries, I've led initiatives to demystify our tech stack, fostering an environment where knowledge sharing is second nature. I'm passionate about making technology accessible to everyone. By adhering to best practices and leveraging modern CSS, JavaScript, and TypeScript, I strive to create clear, concise, and well-documented code. This not only benefits the end-users but also enables fellow developers to easily understand and build upon my work. As an avid learner, I'm constantly exploring new technologies and techniques. This curiosity allows me to stay at the forefront of the industry and share my knowledge with others. Whether it's through mentoring, writing technical documentation, or contributing to open-source projects, I'm committed to helping others grow and succeed in their development careers."
          }

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'function',
                name: 'showTeachingExperienceQuestion',
                content: JSON.stringify(teachingExperienceQuestion)
              }
            ]
          })

          return (
            <BotCard>
              <QuestionCard question={teachingExperienceQuestion} />
            </BotCard>
          )
        }
      },
      showOpenSourceQuestion: {
        description:
          'Show the application question about open-source projects.',
        parameters: z.object({
          question: z
            .string()
            .describe('The question about open-source projects'),
          response: z.string().describe('The response of the person')
        }),
        render: async function* () {
          yield (
            <BotCard>
              <QuestionSkeleton />
            </BotCard>
          )

          await sleep(1000)

          const openSourceQuestion = {
            question: 'What open-source projects have you contributed to?',
            response:
              "My contributions to open-source projects showcase my commitment to the developer community and my ability to collaborate effectively. I've worked on an AI wearable device project, developing the web application using Tailwind CSS and Next.js. I've also contributed to popular projects like the T3 Stack and Typehero, submitting pull requests and engaging in meaningful discussions. Moreover, I actively participate in the issues and discussions of projects that inspire me, such as shadcn/ui. By providing insights, reporting bugs, and suggesting improvements, I aim to give back to the community and help shape the future of these powerful tools."
          }

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'function',
                name: 'showOpenSourceQuestion',
                content: JSON.stringify(openSourceQuestion)
              }
            ]
          })

          return (
            <BotCard>
              <QuestionCard question={openSourceQuestion} />
            </BotCard>
          )
        }
      },
      showRoleExcitedQuestion: {
        description: 'Show the application question about role excitement.',
        parameters: z.object({
          question: z.string().describe('The question about the role'),
          response: z.string().describe('The response of the person')
        }),
        render: async function* () {
          yield (
            <BotCard>
              <QuestionSkeleton />
            </BotCard>
          )

          await sleep(1000)

          const roleExcitedQuestion = {
            question:
              'Why are you excited about the Design Engineer role at Tailwind Labs?',
            response:
              "I am excited about the Design Engineer role at Tailwind Labs because I strongly resonate with the company's commitment to simplicity and usability. As someone who has spent years as the key UX/Frontend engineer spearheading accessibility and design in the absence of a dedicated UX team, I deeply appreciate Tailwind's philosophy. My journey in front-end development has been marked by a transition from SCSS and styled-components to fully embracing Tailwind CSS over the past year. This shift has not only accelerated my growth but also reinforced my belief in the power of utility-first CSS. I'm particularly drawn to Tailwind Labs for the opportunity to innovate at the intersection of design and functionality. My excitement lies in crafting experiences that are as intuitive as they are visually stunning. Having relied heavily on best practices and the Refactoring UI book written by Adam Wathan, I am thrilled at the prospect of contributing to projects that will be used by millions of developers worldwide and helping to shape the future of such an innovative company."
          }

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'function',
                name: 'showRoleExcitedQuestion',
                content: JSON.stringify(roleExcitedQuestion)
              }
            ]
          })

          return (
            <BotCard>
              <QuestionCard question={roleExcitedQuestion} />
            </BotCard>
          )
        }
      },
      showProjectsQuestion: {
        description:
          'Show the application question about projects and Jackson Mills response.',
        parameters: z.object({
          question: z.string().describe('The question about projects'),
          response: z.string().describe('The response of the person')
        }),
        render: async function* () {
          yield (
            <BotCard>
              <QuestionSkeleton />
            </BotCard>
          )

          await sleep(1000)

          const projectsQuestion = {
            question: 'What are some projects you’re proud of?',
            response:
              "I'd like to highlight a few projects that showcase my passion for web development and my ability to create engaging, user-centric experiences. First is ComboZ, a web app designed for Dragon Ball FighterZ enthusiasts. It features a combo builder and integrates Chrome's Picture-in-Picture API, allowing users to practice their combos in real-time while referring to the app. This project combines my love for gaming with my web development skills. Next is Ratioed!, a Next.js project that visualizes Twitter ratios. It provides an interactive experience where users can explore tweets and their ratios, and even download playful PNG cards. This project demonstrates my ability to create fun and shareable web experiences. Another project I'm proud of is Oki, an anonymous, temporary chat application designed for fighting game tournaments. It enhances live event engagement by providing a platform for attendees to connect and discuss the tournament in real-time. This project showcases my understanding of real-time communication and event-driven experiences. Lastly, there's the Armored Core Garage, an AI-assisted mech building assistant for Armored Core players. By leveraging OpenAI's GPT-4, this project offers interactive user guidance, helping players create and optimize their mech builds. This demonstrates my interest in exploring the potential of AI in web applications. These projects not only highlight my technical skills but also my creativity and ability to develop solutions that resonate with users."
          }

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'function',
                name: 'showProjectsQuestion',
                content: JSON.stringify(projectsQuestion)
              }
            ]
          })

          return (
            <BotCard>
              <QuestionCard question={projectsQuestion} />
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
              LinkedIn: z.string().describe('The LinkedIn link of the person')
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
              <ResumeSkeleton />
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
              <Resume resume={resume} />
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
              <Resume resume={JSON.parse(message.content)} />
            </BotCard>
          ) : message.name === 'showProjectsQuestion' ? (
            <BotCard>
              <QuestionCard question={JSON.parse(message.content)} />
            </BotCard>
          ) : null
        ) : message.role === 'user' ? (
          <UserMessage>{message.content}</UserMessage>
        ) : (
          <BotMessage content={message.content} />
        )
    }))
}
