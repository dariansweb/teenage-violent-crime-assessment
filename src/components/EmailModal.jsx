// src/components/EmailModal.jsx

import React, { useState } from 'react'
import toast from 'react-hot-toast'
import emailjs from 'emailjs-com'
import surveyData from '../data/teen_violent_crime_survey.json'

const EmailModal = ({ isOpen, onClose, responses }) => {
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)

  if (!isOpen) return null

  const formatPlaintextResponses = () => {
    let text = 'JJIS – Juvenile Justice Informational Survey #1\n\n'

    surveyData.forEach((section) => {
      text += `=== ${section.section} ===\n\n`

      section.questions.forEach((q) => {
        const answer = responses[q.id]
        if (answer !== undefined && answer !== '') {
          text += `${q.question}\n${answer}\n\n`

          // Add followUps if applicable
          if (q.followUps) {
            q.followUps.forEach((fu, idx) => {
              const fuId = `${q.id}_fu${idx}`
              if (responses[fuId]) {
                text += `${fu}\n${responses[fuId]}\n\n`
              }
            })
          }

          // Add subQuestions if applicable
          if (q.subQuestions) {
            q.subQuestions.forEach((sub, idx) => {
              const subId = `${q.id}_sub${idx}`
              if (responses[subId]) {
                text += `${sub}\n${responses[subId]}\n\n`
              }
            })
          }
        }
      })

      text += `\n`
    })

    return text
  }

  const handleSend = async () => {
    if (!email) return toast.error('Please enter an email address.')

    setSending(true)

    const message = formatPlaintextResponses() 

    const templateParams = {
      to_email: email,
      name: 'JJIS Survey System',
      time: new Date().toLocaleString(),
      message, // ✅ use the variable you created
    }

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_USER_ID,
      )

      toast.success('📩 Survey emailed to case manager!')
      onClose(true)
    } catch (err) {
      toast.error('⚠️ Failed to send email.')
      console.error('EmailJS error:', err)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-xl w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Send Survey Results</h2>
        <p className="text-sm mb-2 text-gray-600">
          Enter the case manager’s email address:
        </p>
        <input
          type="email"
          placeholder="example@agency.org"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onClose(false)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={sending}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {sending ? 'Sending...' : 'Send Email'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmailModal
