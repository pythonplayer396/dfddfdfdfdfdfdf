'use client'

import { useState } from 'react'
import { Code, Send, CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function DeveloperApplicationPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    discordUsername: '',
    discordId: '',
    programmingExperience: '',
    languages: '',
    frameworks: '',
    portfolio: '',
    github: '',
    reason: '',
    contactInfo: '',
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
      const response = await fetch('/api/applications/developer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type: 'developer',
          timestamp: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        setSubmitted(true)
      }
    } catch (error) {
      console.error('Error submitting application:', error)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
        <div className="bg-discord-dark border border-white/10 rounded-lg p-8 max-w-2xl text-center">
          <CheckCircle className="w-16 h-16 text-discord-green mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-3">Application Submitted!</h1>
          <p className="text-gray-300 mb-6">
            Thank you for applying! We'll review your application and portfolio, then contact you via Discord.
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
            <div className="w-12 h-12 bg-gradient-to-br from-discord-blurple to-purple-600 rounded-lg flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Developer Application</h1>
              <p className="text-gray-400">Join our development team</p>
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
            </div>

            <div>
              <label htmlFor="programmingExperience" className="block text-sm font-semibold mb-2">
                Programming Experience <span className="text-red-500">*</span>
              </label>
              <textarea
                id="programmingExperience"
                name="programmingExperience"
                required
                value={formData.programmingExperience}
                onChange={handleChange}
                rows={4}
                placeholder="How long have you been programming? What projects have you worked on?"
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="languages" className="block text-sm font-semibold mb-2">
                Programming Languages <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="languages"
                name="languages"
                required
                value={formData.languages}
                onChange={handleChange}
                placeholder="JavaScript, Python, TypeScript, etc."
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="frameworks" className="block text-sm font-semibold mb-2">
                Frameworks & Technologies <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="frameworks"
                name="frameworks"
                required
                value={formData.frameworks}
                onChange={handleChange}
                placeholder="React, Node.js, Next.js, Discord.js, etc."
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="github" className="block text-sm font-semibold mb-2">
                GitHub Profile
              </label>
              <input
                type="url"
                id="github"
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="https://github.com/yourusername"
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="portfolio" className="block text-sm font-semibold mb-2">
                Portfolio / Previous Projects <span className="text-red-500">*</span>
              </label>
              <textarea
                id="portfolio"
                name="portfolio"
                required
                value={formData.portfolio}
                onChange={handleChange}
                rows={4}
                placeholder="Share links to your projects, websites, or describe your best work..."
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="reason" className="block text-sm font-semibold mb-2">
                Why do you want to join our dev team? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="reason"
                name="reason"
                required
                value={formData.reason}
                onChange={handleChange}
                rows={4}
                placeholder="What motivates you to contribute to our community?"
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="contactInfo" className="block text-sm font-semibold mb-2">
                Contact Information
              </label>
              <input
                type="text"
                id="contactInfo"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                placeholder="Email or other contact method"
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
