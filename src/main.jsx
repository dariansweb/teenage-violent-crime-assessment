import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SurveyProvider } from './contexts/SurveyContext'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SurveyProvider>
      <App />
      <Toaster position="top-right" />
    </SurveyProvider>
  </React.StrictMode>
)
