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
    <div className="min-h-screen bg-gray-100 text-gray-900 px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Teen Violent Crime Survey
      </h1>

      {/* 🔖 Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {surveyData.map((section, index) => {
          const isComplete = section.questions.some((q) => responses[q.id])
          return (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`px-4 py-2 rounded-full border flex items-center gap-2 ${
                index === currentStep
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {section.section}
              {isComplete && <span className="text-green-500 text-xl">✓</span>}
            </button>
          )
        })}
      </div>

      {/* 📝 Survey Form */}
      <form className="space-y-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">
          {currentSection.section}
        </h2>

        {currentSection.questions.map((q) => (
          <div key={q.id} className="mb-4">
            <label htmlFor={q.id} className="block font-medium mb-1">
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
                  className="w-full p-2 border rounded bg-white border-gray-300"
                />
              )}
            />

            {errors[q.id] && (
              <p className="text-red-600 text-sm mt-1">
                {errors[q.id]?.message}
              </p>
            )}

            {/* 🔁 Follow-up Questions */}
            {q.followUps?.map((fu, idx) => {
              const followId = `${q.id}_fu${idx}`
              return (
                <div key={followId} className="mt-2 ml-4">
                  <label className="block text-sm mb-1">{fu}</label>
                  <input
                    type="text"
                    value={responses[followId] || ''}
                    onChange={(e) => updateResponse(followId, e.target.value)}
                    className="w-full p-2 border rounded bg-white border-gray-300"
                  />
                </div>
              )
            })}

            {/* 🔁 Sub-Questions */}
            {q.subQuestions?.map((sq, idx) => {
              const subId = `${q.id}_sub${idx}`
              return (
                <div key={subId} className="mt-2 ml-4">
                  <label className="block text-sm mb-1">{sq}</label>
                  <input
                    type="text"
                    value={responses[subId] || ''}
                    onChange={(e) => updateResponse(subId, e.target.value)}
                    className="w-full p-2 border rounded bg-white border-gray-300"
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
  )
}

export default SurveyWizard
