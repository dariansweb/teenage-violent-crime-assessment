// src/components/SurveyForm.jsx
import React, { useState } from 'react'
import surveyData from '../data/teen_violent_crime_survey.json'

const SurveyForm = () => {
  const [responses, setResponses] = useState({})

  const handleChange = (questionId, value) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Survey responses:', responses)
    // Eventually export to CSV or email
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-10 max-w-4xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-xl"
    >
      {surveyData.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 border-b pb-2 mb-4">
            {section.section}
          </h2>

          {section.questions.map((q) => (
            <div key={q.id} className="mb-6">
              <label
                htmlFor={q.id}
                className="block text-lg font-medium text-gray-800 dark:text-gray-100 mb-2"
              >
                {q.question}
              </label>

              <input
                id={q.id}
                name={q.id}
                type={q.type}
                onChange={(e) => handleChange(q.id, e.target.value)}
                className="w-full p-3 text-sm rounded-md border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />

              {q.followUps && (
                <div className="ml-6 mt-4 space-y-2">
                  {q.followUps.map((fu, idx) => {
                    const followUpId = `${q.id}_fu${idx + 1}`
                    return (
                      <div key={followUpId}>
                        <label
                          htmlFor={followUpId}
                          className="block text-sm text-gray-700 dark:text-gray-300 mb-1"
                        >
                          {fu}
                        </label>
                        <input
                          id={followUpId}
                          name={followUpId}
                          type="text"
                          onChange={(e) =>
                            handleChange(followUpId, e.target.value)
                          }
                          className="w-full p-2 rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-400"
                        />
                      </div>
                    )
                  })}
                </div>
              )}

              {q.subQuestions && (
                <div className="ml-6 mt-4 space-y-2">
                  {q.subQuestions.map((sub, idx) => {
                    const subId = `${q.id}_sub${idx + 1}`
                    return (
                      <div key={subId}>
                        <label
                          htmlFor={subId}
                          className="block text-sm text-gray-700 dark:text-gray-300 mb-1"
                        >
                          {sub}
                        </label>
                        <input
                          id={subId}
                          name={subId}
                          type="text"
                          onChange={(e) => handleChange(subId, e.target.value)}
                          className="w-full p-2 rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-400"
                        />
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}

      <div className="pt-4">
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-zinc-900 transition"
        >
          Submit Survey
        </button>
      </div>
    </form>
  )
}

export default SurveyForm
