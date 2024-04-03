import React from 'react'

export default function QuestionCard({
  question
}: {
  question: {
    question: string
    response: string
  }
}) {
  return (
    <div>
      <div className="border-2 flex">
        <h2 className="text-2xl font-bold p-4">{question.question}</h2>
        <div className="border-l-2 flex-1 basis-1/3" />
      </div>
      <div className="p-4 border-x-2 border-b-2">
        <p>{question.response}</p>
      </div>
    </div>
  )
}
