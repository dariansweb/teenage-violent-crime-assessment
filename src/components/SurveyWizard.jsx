// src/components/SurveyWizard.jsx
import React, { useState } from 'react'
import surveyData from '../data/teen_violent_crime_survey.json'

const SurveyWizard = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState({})
  const [darkMode, setDarkMode] = useState(false)

  const handleChange = (id, value) => {
    setResponses((prev) => ({ ...prev, [id]: value }))
  }

  const handleNext = () => {
    if (currentStep < surveyData.length - 1) setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Survey responses:', responses)
    alert('Survey submitted! Check the console for results.')
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-gray-100 min-h-screen px-4 py-8">
        {/* 🌙 Dark Mode Toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        {/* 🔢 Section Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {surveyData.map((section, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`px-4 py-2 rounded-full border ${
                index === currentStep
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 dark:bg-zinc-800 dark:text-gray-300'
              }`}
            >
              {section.section}
            </button>
          ))}
        </div>

        {/* 📝 Survey Section Form */}
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">
            {surveyData[currentStep].section}
          </h2>

          {surveyData[currentStep].questions.map((q) => (
            <div key={q.id} className="mb-4">
              <label htmlFor={q.id} className="block font-medium mb-1">
                {q.question}
              </label>
              <input
                id={q.id}
                name={q.id}
                type={q.type}
                value={responses[q.id] || ''}
                onChange={(e) => handleChange(q.id, e.target.value)}
                className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
              />

              {q.followUps?.map((fu, idx) => {
                const followId = `${q.id}_fu${idx}`
                return (
                  <div key={followId} className="mt-2 ml-4">
                    <label className="block text-sm mb-1">{fu}</label>
                    <input
                      type="text"
                      value={responses[followId] || ''}
                      onChange={(e) => handleChange(followId, e.target.value)}
                      className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                    />
                  </div>
                )
              })}

              {q.subQuestions?.map((sq, idx) => {
                const subId = `${q.id}_sub${idx}`
                return (
                  <div key={subId} className="mt-2 ml-4">
                    <label className="block text-sm mb-1">{sq}</label>
                    <input
                      type="text"
                      value={responses[subId] || ''}
                      onChange={(e) => handleChange(subId, e.target.value)}
                      className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                    />
                  </div>
                )
              })}
            </div>
          ))}

          {/* 🚦 Wizard Buttons */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              disabled={currentStep === 0}
              onClick={handleBack}
              className="px-4 py-2 bg-gray-400 text-white rounded disabled:opacity-50"
            >
              ← Back
            </button>

            {currentStep === surveyData.length - 1 ? (
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Submit Survey
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Next →
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default SurveyWizard
