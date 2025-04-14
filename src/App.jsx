import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import SurveyWizard from './components/SurveyWizard'
import ReviewPage from './components/ReviewPage'
import SubmittedPage from './components/SubmittedPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/survey" replace />} />
        <Route path="/survey" element={<SurveyWizard />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/submitted" element={<SubmittedPage />} />
      </Routes>
    </Router>
  )
}

export default App
