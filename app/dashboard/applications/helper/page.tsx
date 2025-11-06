'use client'

import { useState } from 'react'
import { Users, Send, CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function HelperApplicationPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    discordUsername: '',
    discordId: '',
    age: '',
    experience: '',
    reason: '',
    availability: '',
    additionalInfo: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/applications/helper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type: 'helper',
          timestamp: new Date().toISOString(),
        }),
      })

      const data = await response.json()
      
      if (response.ok) {
        setSubmitted(true)
      } else {
        alert('Failed to submit application: ' + (data.error || 'Unknown error'))
        console.error('Submission failed:', data)
      }
    } catch (error) {
      console.error('Error submitting application:', error)
      alert('Error submitting application. Check console for details.')
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
        <div className="bg-discord-dark border border-white/10 rounded-lg p-8 max-w-2xl text-center">
          <CheckCircle className="w-16 h-16 text-discord-green mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-3">Application Submitted!</h1>
          <p className="text-gray-300 mb-6">
            Thank you for applying! We'll review your application and contact you via Discord.
          </p>
          <Link href="/" className="btn-primary inline-block">
            Return Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/dashboard" className="text-discord-blurple hover:underline flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Applications
        </Link>

        <div className="bg-discord-dark border border-white/10 rounded-lg p-8 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-discord-green to-emerald-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Helper Application</h1>
              <p className="text-gray-400">Join our support team</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-discord-dark border border-white/10 rounded-lg p-8 space-y-6">
            <div>
              <label htmlFor="discordUsername" className="block text-sm font-semibold mb-2">
                Discord Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="discordUsername"
                name="discordUsername"
                required
                value={formData.discordUsername}
                onChange={handleChange}
                placeholder="username#0000"
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="discordId" className="block text-sm font-semibold mb-2">
                Discord User ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="discordId"
                name="discordId"
                required
                value={formData.discordId}
                onChange={handleChange}
                placeholder="123456789012345678"
                className="input-field"
              />
              <p className="text-xs text-gray-400 mt-1">
                Enable Developer Mode in Discord settings to copy your User ID
              </p>
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-semibold mb-2">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="age"
                name="age"
                required
                min="13"
                value={formData.age}
                onChange={handleChange}
                placeholder="18"
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-semibold mb-2">
                Previous Experience <span className="text-red-500">*</span>
              </label>
              <textarea
                id="experience"
                name="experience"
                required
                value={formData.experience}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us about your experience helping or moderating Discord servers..."
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="reason" className="block text-sm font-semibold mb-2">
                Why do you want to be a Helper? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="reason"
                name="reason"
                required
                value={formData.reason}
                onChange={handleChange}
                rows={4}
                placeholder="What motivates you to join our team?"
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="availability" className="block text-sm font-semibold mb-2">
                Availability <span className="text-red-500">*</span>
              </label>
              <textarea
                id="availability"
                name="availability"
                required
                value={formData.availability}
                onChange={handleChange}
                rows={3}
                placeholder="When are you typically available? (e.g., Weekdays 5-9 PM EST)"
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="additionalInfo" className="block text-sm font-semibold mb-2">
                Additional Information
              </label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                rows={3}
                placeholder="Anything else you'd like us to know?"
                className="input-field"
              />
            </div>

            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
              <Send className="w-5 h-5" />
              Submit Application
            </button>
          </form>
      </div>
    </div>
  )
}
