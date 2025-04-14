// src/App.jsx
import React from 'react'
import SurveyForm from './components/SurveyForm'
import SurveyWizard from './components/SurveyWizard'
import './index.css'

function App() {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="bg-rose-600 text-white p-4 rounded shadow-lg text-xl">
        Tailwind has RISEN ☀️🎉
      </div>

      <h1 className="text-3xl font-bold text-center mb-8">
        Teen Violent Crime Survey
      </h1>
      <SurveyWizard />
    </div>
  )
}

export default App
