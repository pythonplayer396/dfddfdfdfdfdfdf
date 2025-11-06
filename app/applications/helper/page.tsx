'use client'

import { useState } from 'react'
import { Users, Send, CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function HelperApplicationPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    discordUsername: '',
    age: '',
    microphone: '',
    aboutYourself: '',
    whyHireYou: '',
    whyStaff: '',
    rulesKnowledge: '',
    gameInfo: '',
    priorExperience: '',
    additionalInfo: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        <Link href="/applications" className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Applications
        </Link>

        <div className="bg-discord-dark border border-white/10 rounded-lg p-8 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-discord-green to-emerald-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Staff Application</h1>
              <p className="text-gray-400">Join our staff team</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-discord-dark border border-white/10 rounded-lg p-8 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-2">
              1. Your name and discord username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe - username#1234"
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-semibold mb-2">
              2. Your age <span className="text-red-500">*</span>
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
            <label htmlFor="microphone" className="block text-sm font-semibold mb-2">
              3. Do you have a working microphone? <span className="text-red-500">*</span>
            </label>
            <select
              id="microphone"
              name="microphone"
              required
              value={formData.microphone}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div>
            <label htmlFor="aboutYourself" className="block text-sm font-semibold mb-2">
              4. Tell us about yourself! <span className="text-red-500">*</span>
            </label>
            <textarea
              id="aboutYourself"
              name="aboutYourself"
              required
              value={formData.aboutYourself}
              onChange={handleChange}
              rows={4}
              placeholder="Share a bit about who you are, your interests, hobbies, etc."
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="whyHireYou" className="block text-sm font-semibold mb-2">
              5. Why do we hire you? <span className="text-red-500">*</span>
            </label>
            <textarea
              id="whyHireYou"
              name="whyHireYou"
              required
              value={formData.whyHireYou}
              onChange={handleChange}
              rows={4}
              placeholder="What makes you a good fit for our staff team?"
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="whyStaff" className="block text-sm font-semibold mb-2">
              6. Why do you want to be staff member on our server? <span className="text-red-500">*</span>
            </label>
            <textarea
              id="whyStaff"
              name="whyStaff"
              required
              value={formData.whyStaff}
              onChange={handleChange}
              rows={4}
              placeholder="What motivates you to join our staff team?"
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="rulesKnowledge" className="block text-sm font-semibold mb-2">
              7. Are you well aware regarding the server rules and guidelines? If yes, let us know how would you impose that on our members if you see on of them abusing or breaking the rules in the chat? <span className="text-red-500">*</span>
            </label>
            <textarea
              id="rulesKnowledge"
              name="rulesKnowledge"
              required
              value={formData.rulesKnowledge}
              onChange={handleChange}
              rows={5}
              placeholder="Describe your understanding of server rules and how you would handle rule violations"
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="gameInfo" className="block text-sm font-semibold mb-2">
              8. Let us know your In game name(IGN), Rank and Fakepixel Networth and your total playtime! <span className="text-red-500">*</span>
            </label>
            <textarea
              id="gameInfo"
              name="gameInfo"
              required
              value={formData.gameInfo}
              onChange={handleChange}
              rows={4}
              placeholder="IGN: YourName | Rank: VIP | Networth: 100M | Playtime: 500 hours"
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="priorExperience" className="block text-sm font-semibold mb-2">
              9. Have you ever been a staff member in another server? If yes, let us know about your strength and weakness! <span className="text-red-500">*</span>
            </label>
            <textarea
              id="priorExperience"
              name="priorExperience"
              required
              value={formData.priorExperience}
              onChange={handleChange}
              rows={4}
              placeholder="Describe your previous staff experience, strengths, and areas for improvement"
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="additionalInfo" className="block text-sm font-semibold mb-2">
              10. Is there anything you want us to know about?
            </label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              rows={3}
              placeholder="Any additional information you'd like to share"
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
