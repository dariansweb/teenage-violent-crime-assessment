import React, { createContext, useState, useContext } from 'react'
import { useEffect } from 'react'

// Create the context
const SurveyContext = createContext()

// Export this to use in components
export const useSurvey = () => useContext(SurveyContext)

// Provider component
export const SurveyProvider = ({ children }) => {
  const [responses, setResponses] = useState(() => {
    const saved = localStorage.getItem('survey-responses')
    return saved ? JSON.parse(saved) : {}
  })

  const [currentStep, setCurrentStep] = useState(0)
  const [darkMode, setDarkMode] = useState(false)

  const updateResponse = (id, value) => {
    setResponses((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const resetSurvey = () => {
    setResponses({})
    setCurrentStep(0)
    localStorage.removeItem('survey-responses')
  }

  const toggleDark = () => {
    document.documentElement.classList.toggle('dark')
    setDarkMode((prev) => !prev)
  }

  useEffect(() => {
    localStorage.setItem('survey-responses', JSON.stringify(responses))
  }, [responses])

  return (
    <SurveyContext.Provider
      value={{
        responses,
        updateResponse,
        currentStep,
        setCurrentStep,
        darkMode,
        toggleDark,
        resetSurvey,
      }}
    >
      {children}
    </SurveyContext.Provider>
  )
}
