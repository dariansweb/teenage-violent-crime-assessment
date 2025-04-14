import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SurveyProvider } from './contexts/SurveyContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SurveyProvider>
      <App />
    </SurveyProvider>
  </StrictMode>
)
