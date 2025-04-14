import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSurvey } from '../contexts/SurveyContext'

const ReviewPage = () => {
  const { responses, resetSurvey } = useSurvey()
  const navigate = useNavigate()

  const handleSubmit = () => {
    console.log('Final submission:', responses)
    resetSurvey()
    navigate('/submitted')
  }

  const renderQuestionAnswer = (questionId) => {
    const answer = responses[questionId]
    if (!answer) return null
    return (
      <div key={questionId} className="mb-4">
        <div className="font-medium">{questionId}</div>
        <div className="ml-2 text-gray-700">{answer}</div>
      </div>
    )
  }

  const allIds = Object.keys(responses)

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">Review Your Answers</h2>

      <div className="bg-white border p-4 rounded">
        {allIds.length === 0 && <p>No responses yet.</p>}
        {allIds.map((id) => renderQuestionAnswer(id))}
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => navigate('/survey')}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          ← Back to Survey
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          ✅ Submit Survey
        </button>
        <button
          onClick={resetSurvey}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          🔄 Clear Saved Progress
        </button>
      </div>
    </div>
  )
}

export default ReviewPage
