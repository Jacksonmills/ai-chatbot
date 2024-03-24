import React from 'react'
import { ResumeType } from './resume'

export default function ResumeEducation({
  education
}: {
  education: ResumeType['education']
}) {
  return (
    <div>
      <h2>Education</h2>
      <p>{education.degree}</p>
      <p>{education.institution}</p>
      <p>{education.location}</p>
      <p>{education.time_period}</p>
    </div>
  )
}
