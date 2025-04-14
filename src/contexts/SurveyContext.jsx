import React, { createContext, useState, useContext } from 'react'

// Create the context
const SurveyContext = createContext()

// Export this to use in components
export const useSurvey = () => useContext(SurveyContext)

// Provider component
export const SurveyProvider = ({ children }) => {
  const [responses, setResponses] = useState({})
  const [currentStep, setCurrentStep] = useState(0)
  const [darkMode, setDarkMode] = useState(false)

  const updateResponse = (id, value) => {
    setResponses(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const resetSurvey = () => {
    setResponses({})
    setCurrentStep(0)
  }

  const toggleDark = () => {
    document.documentElement.classList.toggle('dark')
    setDarkMode(prev => !prev)
  }

  return (
    <SurveyContext.Provider value={{
      responses,
      updateResponse,
      currentStep,
      setCurrentStep,
      darkMode,
      toggleDark,
      resetSurvey
    }}>
      {children}
    </SurveyContext.Provider>
  )
}
