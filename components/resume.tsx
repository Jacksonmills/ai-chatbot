import React from 'react'
import { Button } from './ui/button'
import { ArrowTopRightIcon } from '@radix-ui/react-icons'
import { AspectRatio } from './ui/aspect-ratio'
import { Skeleton } from './ui/skeleton'

export interface ResumeType {
  personal_info: PersonalInfo
  personal_work: PersonalWork[]
  experience: Experience[]
  education: Education
  certifications: string[]
}

interface PersonalInfo {
  name: string
  role: string
  location: string
  contact_number: string
  email: string
  social_links: {
    GitHub: string
    LinkedIn: string
  }
}

interface PersonalWork {
  project_name: string
  description: string
  repo_link: string
}

interface Experience {
  role: string
  company: string
  location: string
  time_period: string
  responsibilities: string[]
}

interface Education {
  degree: string
  institution: string
  location: string
  time_period: string
}

export default function Resume({ resume }: { resume: ResumeType }) {
  return (
    <div className="flex flex-col border-2 bg-card">
      <div className="border-b-2 flex">
        <div className="p-4">
          <h2 className="text-xl font-bold">{resume.personal_info.name}</h2>
          <h3 className="italic">{resume.personal_info.role}</h3>
          <p>{resume.personal_info.location}</p>
          <p>{resume.personal_info.contact_number}</p>
          <p>{resume.personal_info.email}</p>
        </div>

        <div className="flex flex-col border-l-2 w-full">
          <Button className="rounded-none h-full border-none" asChild>
            <a
              href={resume.personal_info.social_links.GitHub || ''}
              target="_blank"
            >
              Github
            </a>
          </Button>
          <Button
            className="rounded-none border-t-2 border-b-0 border-x-0"
            variant={'secondary'}
            asChild
          >
            <a
              href={resume.personal_info.social_links.LinkedIn || ''}
              target="_blank"
            >
              LinkedIn
            </a>
          </Button>
        </div>
      </div>

      <Heading>Projects</Heading>

      <div className="flex flex-col">
        {resume.personal_work.map((work, i) => (
          <div key={i} className="flex flex-col border-b-2">
            <div className="flex gap-2 items-center justify-between">
              <h3 className="font-bold pl-4">{work.project_name}</h3>
              <div className="border-b-2 border-l-2">
                <Button
                  className="w-fit rounded-none border-none"
                  variant={'accent'}
                >
                  <a
                    href={work.repo_link}
                    className="flex gap-2 items-center"
                    target="_blank"
                  >
                    Repo <ArrowTopRightIcon />
                  </a>
                </Button>
              </div>
            </div>
            <p className="px-4 pb-4">{work.description}</p>
          </div>
        ))}
      </div>

      <Heading>Experience</Heading>

      <div className="p-4 border-b-2">
        {resume.experience.map((exp, i) => (
          <div key={i} className="pb-4">
            <div>
              <h3 className="font-bold text-xl">{exp.role}</h3>
              <p className="italic">{exp.company}</p>
              <div className="text-muted-foreground">
                <p>{exp.location}</p>
                <p>{exp.time_period}</p>
              </div>
            </div>
            <ul className="list-disc pl-4">
              {exp.responsibilities.map((resp, i) => (
                <li key={i}>{resp}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Heading>Education</Heading>

      <div className="p-4 border-b-2">
        <h3 className="text-md font-bold">{resume.education.degree}</h3>
        <p className="italic">{resume.education.institution}</p>
        <div className="text-muted-foreground">
          <p>{resume.education.location}</p>
          <p>{resume.education.time_period}</p>
        </div>
      </div>

      <Heading>Certifications</Heading>

      <div className="p-4">
        <ul className="pl-4 list-disc">
          {resume.certifications.map((cert, i) => (
            <li key={i}>{cert}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const Heading = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border-b-2 py-px px-4 bg-muted">
      <h2 className="text-lg font-bold">{children}</h2>
    </div>
  )
}

export const ResumeSkeleton = () => {
  return (
    <AspectRatio ratio={6 / 8}>
      <div className="size-full border-2 p-2 flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="flex flex-col gap-2 w-1/2">
            <Skeleton className="w-full h-2 rounded-none bg-border" />
            <Skeleton className="w-full h-2 rounded-none bg-border" />
            <Skeleton className="w-full h-2 rounded-none bg-border" />
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <Skeleton className="w-full h-6 rounded-none bg-border" />
            <Skeleton className="w-full h-6 rounded-none bg-border" />
          </div>
        </div>
        <Skeleton className="w-full h-2 rounded-none bg-border" />
        <Skeleton className="w-full h-2 rounded-none bg-border" />
        <Skeleton className="w-full h-2 rounded-none bg-border" />
        <Skeleton className="w-full h-2 rounded-none bg-border" />

        <span className="h-6" />

        <Skeleton className="w-full h-2 rounded-none bg-border" />
        <Skeleton className="w-full h-2 rounded-none bg-border" />
        <Skeleton className="w-full h-2 rounded-none bg-border" />
        <Skeleton className="w-full h-2 rounded-none bg-border" />
      </div>
    </AspectRatio>
  )
}
