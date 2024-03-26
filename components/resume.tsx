import React from 'react'

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
    Github: string
    LinkedIn: string
    Portfolio: string
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

export default function Resume({ props: resume }: { props: ResumeType }) {
  return (
    <div className="flex flex-col gap-2 p-4 border-2 bg-card">
      <h1>Resume</h1>
      <div>
        <h2>{resume.personal_info.name}</h2>
        <h3>{resume.personal_info.role}</h3>
        <p>{resume.personal_info.location}</p>
        <p>{resume.personal_info.contact_number}</p>
        <p>{resume.personal_info.email}</p>
        <div>
          <a href={resume.personal_info.social_links.Github}>Github</a>
          <a href={resume.personal_info.social_links.LinkedIn}>LinkedIn</a>
          <a href={resume.personal_info.social_links.Portfolio}>Portfolio</a>
        </div>

        <h2>Work</h2>
        {resume.personal_work.map((work, i) => (
          <div key={i}>
            <h3>{work.project_name}</h3>
            <p>{work.description}</p>
            <a href={work.repo_link}>Repo</a>
          </div>
        ))}

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
    </div>
  )
}
