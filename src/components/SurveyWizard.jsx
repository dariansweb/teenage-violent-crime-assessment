import React, { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSurvey } from '../contexts/SurveyContext'
import surveyData from '../data/teen_violent_crime_survey.json'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast from 'react-hot-toast'

const SurveyWizard = () => {
  const { responses, updateResponse, currentStep, setCurrentStep } = useSurvey()
  const navigate = useNavigate()
  const currentSection = surveyData[currentStep]

  const sectionIcons = {
    'A. Introduction': '👋',
    'B. Background': '🏠',
    'C. Education': '📚',
    'D. Moral/Faith': '⛪',
    'E. Criminal Behavior': '🚔',
  }

  // 🔁 Build validation schema dynamically for the current section
  const schema = useMemo(() => {
    const shape = {}
    currentSection.questions.forEach((q) => {
      shape[q.id] = yup.string().required('This field is required')
    })
    return yup.object().shape(shape)
  }, [currentSection])

  const {
    control,
    trigger,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: responses,
  })

  // ⏪ Update inputs when moving between steps
  useEffect(() => {
    reset(
      surveyData[currentStep].questions.reduce((acc, q) => {
        acc[q.id] = responses[q.id] || ''
        return acc
      }, {}),
    )
  }, [currentStep, reset])

  const handleNext = async () => {
    const isValid = await trigger()
    if (isValid) {
      const values = getValues()
      Object.entries(values).forEach(([id, val]) => updateResponse(id, val))
      toast.success('✅ Progress saved!')
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleReview = async () => {
    const isValid = await trigger()
    if (isValid) {
      const values = getValues()
      Object.entries(values).forEach(([id, val]) => updateResponse(id, val))
      navigate('/review')
    }
  }

  return (
    <div className="bg-white py-6 px-4 border-b border-gray-200 shadow-sm">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 text-center mt-8 mb-4 tracking-tight drop-shadow-sm">
        <span className="inline-block border-b-4 border-blue-600 pb-1">
          Teen Violent Crime Survey
        </span>
      </h1>
      <p className="text-center text-gray-500 text-sm sm:text-base mb-8">
        A qualitative assessment tool for juvenile justice professionals
      </p>

      {/* 🔖 Tabs */}
      <div className="flex flex-wrap justify-center gap-3 my-6 sticky top-[5.25rem] bg-white z-40 shadow-sm">
        {surveyData.map((section, index) => {
          const isComplete = section.questions.some((q) => responses[q.id])
          const isActive = index === currentStep

          return (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`px-4 py-2 rounded-full border flex items-center gap-2 transition-all duration-200 shadow-sm
          ${
            isActive
              ? 'bg-purple-600 text-white border-blue-700 shadow-md'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:text-blue-700'
          }
        `}
            >
              <span className="font-medium">{section.section}</span>
              {isComplete && <span className="text-green-500 text-xl">✓</span>}
            </button>
          )
        })}
      </div>

      {/* 📝 Survey Form */}
      <div className="animate-fade-in transition-opacity duration-300">
        <form className="space-y-6 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 bg-white rounded-md px-4 py-2 border-l-4 border-blue-600 shadow-sm mb-6 flex items-center gap-2">
            <span className="text-2xl">
              {sectionIcons[currentSection.section] ?? '🧩'}
            </span>
            {currentSection.section}
          </h2>

          {currentSection.questions.map((q) => (
            <div
              key={q.id}
              className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-md shadow-sm"
            >
              <label
                htmlFor={q.id}
                className="block font-medium mb-2 text-gray-800"
              >
                {q.question}
              </label>

              <Controller
                name={q.id}
                control={control}
                defaultValue={responses[q.id] || ''}
                render={({ field }) => (
                  <input
                    {...field}
                    id={q.id}
                    type={q.type || 'text'}
                    className="w-full p-2 border rounded bg-white border-gray-800 focus:ring-blue-500 focus:border-blue-500"
                  />
                )}
              />

              {errors[q.id] && (
                <p className="text-red-600 text-sm mt-2">
                  {errors[q.id]?.message}
                </p>
              )}

              {/* 🔁 Follow-ups */}
              {q.followUps?.map((fu, idx) => {
                const followId = `${q.id}_fu${idx}`
                return (
                  <div key={followId} className="mt-4 ml-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {fu}
                    </label>
                    <input
                      type="text"
                      value={responses[followId] || ''}
                      onChange={(e) => updateResponse(followId, e.target.value)}
                      className="w-full p-2 border rounded bg-white border-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                )
              })}

              {/* 🔁 Sub-questions */}
              {q.subQuestions?.map((sq, idx) => {
                const subId = `${q.id}_sub${idx}`
                return (
                  <div key={subId} className="mt-4 ml-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {sq}
                    </label>
                    <input
                      type="text"
                      value={responses[subId] || ''}
                      onChange={(e) => updateResponse(subId, e.target.value)}
                      className="w-full p-3 bg-gradient-to-br from-white to-gray-50 border border-gray-300 rounded shadow-inner focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                )
              })}
            </div>
          ))}

          {/* ⏭️ Wizard Buttons */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="px-4 py-2 bg-gray-400 text-white rounded disabled:opacity-50"
            >
              ← Back
            </button>

            {currentStep === surveyData.length - 1 ? (
              <button
                type="button"
                onClick={handleReview}
                className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Review Answers →
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
