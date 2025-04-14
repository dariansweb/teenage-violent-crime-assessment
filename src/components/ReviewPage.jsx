import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSurvey } from '../contexts/SurveyContext'
import surveyData from '../data/teen_violent_crime_survey.json'
import CSVExportButton from './CSVExportButton'
import toast from 'react-hot-toast'

const ReviewPage = () => {
  const { responses, setCurrentStep, resetSurvey } = useSurvey()
  const navigate = useNavigate()

  const handleEditSection = (index) => {
    setCurrentStep(index)
    navigate('/survey')
  }

  const handleSubmit = () => {
    console.log('Final submission:', responses)
    toast.success('🎉 Survey submitted!')
    resetSurvey()
    navigate('/submitted')
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">Review Your Answers</h2>

      {surveyData.map((section, idx) => (
        <div key={section.section} className="mb-8 border-b pb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">{section.section}</h3>
            <button
              onClick={() => handleEditSection(idx)}
              className="text-blue-600 underline text-sm"
            >
              ✏️ Edit Section
            </button>
          </div>

          {section.questions.map((q) => (
            <div key={q.id} className="mb-4">
              <div className="font-medium text-gray-700">{q.question}</div>
              <div className="ml-2 text-gray-900">
                {responses[q.id] || (
                  <em className="text-gray-400">No response</em>
                )}
              </div>

              {q.followUps?.map((fu, fuIdx) => {
                const followId = `${q.id}_fu${fuIdx}`
                return (
                  <div key={followId} className="ml-4 mt-1">
                    <div className="text-sm text-gray-600">{fu}</div>
                    <div className="ml-2 text-gray-800">
                      {responses[followId] || (
                        <em className="text-gray-400">No response</em>
                      )}
                    </div>
                  </div>
                )
              })}

              {q.subQuestions?.map((sq, sqIdx) => {
                const subId = `${q.id}_sub${sqIdx}`
                return (
                  <div key={subId} className="ml-4 mt-1">
                    <div className="text-sm text-gray-600">{sq}</div>
                    <div className="ml-2 text-gray-800">
                      {responses[subId] || (
                        <em className="text-gray-400">No response</em>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      ))}

      <div className="mt-8 flex flex-col items-center gap-4">
        <CSVExportButton />
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          ✅ Submit Survey
        </button>
      </div>
    </div>
  )
}

export default ReviewPage
