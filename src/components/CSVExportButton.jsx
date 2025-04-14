import React from 'react'
import { useSurvey } from '../contexts/SurveyContext'
import { saveAs } from 'file-saver'
import Papa from 'papaparse'

const CSVExportButton = () => {
  const { responses } = useSurvey()

  const handleExport = () => {
    if (Object.keys(responses).length === 0) {
      alert('No responses to export!')
      return
    }

    // Convert responses into array format
    const data = Object.entries(responses).map(([questionId, answer]) => ({
      questionId,
      answer
    }))

    const csv = Papa.unparse(data)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, 'survey_responses.csv')
  }

  return (
    <button
      onClick={handleExport}
      className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
    >
      📤 Download Responses as CSV
    </button>
  )
}

export default CSVExportButton
