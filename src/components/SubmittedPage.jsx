import React from 'react'
import { Link } from 'react-router-dom'

const SubmittedPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Survey Submitted!</h1>
      <p className="text-lg text-gray-700 mb-6">Thank you for your responses.</p>
      <Link to="/survey" className="text-blue-600 underline">
        Start Over
      </Link>
    </div>
  )
}

export default SubmittedPage
