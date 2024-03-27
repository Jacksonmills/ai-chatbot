import React from 'react'
import { Button } from './ui/button'
import { ArrowTopRightIcon } from '@radix-ui/react-icons'

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
  responsibilities: string
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
          <Button className="rounded-none h-full" asChild>
            <a href={resume.personal_info.social_links.GitHub || ''}>Github</a>
          </Button>
          <Button
            className="rounded-none border-t-2"
            variant={'secondary'}
            asChild
          >
            <a href={resume.personal_info.social_links.LinkedIn || ''}>
              LinkedIn
            </a>
          </Button>
        </div>
      </div>

      <div className="border-b-2 py-px px-4">
        <h2 className="text-lg font-bold">Work</h2>
      </div>

      <div className="border-b-2 p-4 flex flex-col gap-2">
        {resume.personal_work.map((work, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <h3 className="font-bold">{work.project_name}</h3>
              <Button className="w-fit rounded-none" variant={'ghost'}>
                <a
                  href={work.repo_link}
                  className="flex gap-2 items-center"
                  target="_blank"
                >
                  Repo <ArrowTopRightIcon />
                </a>
              </Button>
            </div>
            <p>{work.description}</p>
          </div>
        ))}
      </div>

      <h2>Experience</h2>
      {resume.experience.map((exp, i) => (
        <div key={i}>
          <h3>{exp.role}</h3>
          <p>{exp.company}</p>
          <p>{exp.location}</p>
          <p>{exp.time_period}</p>
          <p>{exp.responsibilities}</p>
        </div>
      ))}

      <h2>Education</h2>
      <h3>{resume.education.degree}</h3>
      <p>{resume.education.institution}</p>
      <p>{resume.education.location}</p>
      <p>{resume.education.time_period}</p>

      <h2>Certifications</h2>
      {resume.certifications.map((cert, i) => (
        <p key={i}>{cert}</p>
      ))}
    </div>
  )
}
