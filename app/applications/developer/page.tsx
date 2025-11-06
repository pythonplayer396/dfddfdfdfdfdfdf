'use client'

import { useState } from 'react'
import { Code, Send, CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function DeveloperApplicationPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    // Basic Info
    discordUsername: '',
    minecraftUsername: '',
    age: '',
    portfolioLink: '',
    
    // Experience & Skills
    developerExperience: '',
    languagesFrameworks: '',
    previousProjects: '',
    botsPluginsMods: '',
    versionControl: '',
    
    // Motivation & Availability
    whyDeveloper: '',
    hoursPerWeek: '',
    handleDeadlines: '',
    
    // Personal Info / Fit
    aboutYourself: '',
    teamworkConflicts: '',
    strengthsWeaknesses: '',
    priorModeration: '',
    followGuidelines: '',
    
    // Optional / Fun
    favoriteProject: '',
    serverIdeas: '',
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
        <Link href="/applications" className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
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

        <form onSubmit={handleSubmit} className="bg-discord-dark border border-white/10 rounded-lg p-8 space-y-8">
          {/* Basic Info Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-discord-blurple border-b border-white/10 pb-2">Basic Info</h2>
            
            <div>
              <label htmlFor="discordUsername" className="block text-sm font-semibold mb-2">
                1. Discord Username (with tag, e.g., User#1234) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="discordUsername"
                name="discordUsername"
                required
                value={formData.discordUsername}
                onChange={handleChange}
                placeholder="username#1234"
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="minecraftUsername" className="block text-sm font-semibold mb-2">
                2. Minecraft Username (if applicable)
              </label>
              <input
                type="text"
                id="minecraftUsername"
                name="minecraftUsername"
                value={formData.minecraftUsername}
                onChange={handleChange}
                placeholder="Your Minecraft username"
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-semibold mb-2">
                3. Age (must be 14 or above) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="age"
                name="age"
                required
                min="14"
                value={formData.age}
                onChange={handleChange}
                placeholder="18"
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="portfolioLink" className="block text-sm font-semibold mb-2">
                4. GitHub / GitLab / Portfolio link <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                id="portfolioLink"
                name="portfolioLink"
                required
                value={formData.portfolioLink}
                onChange={handleChange}
                placeholder="https://github.com/yourusername or your portfolio URL"
                className="input-field"
              />
            </div>
          </div>

          {/* Experience & Skills Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-discord-blurple border-b border-white/10 pb-2">Experience & Skills</h2>
            
            <div>
              <label htmlFor="developerExperience" className="block text-sm font-semibold mb-2">
                5. What is your experience as a developer? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="developerExperience"
                name="developerExperience"
                required
                value={formData.developerExperience}
                onChange={handleChange}
                rows={4}
                placeholder="Describe your development experience, how long you've been coding, etc."
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="languagesFrameworks" className="block text-sm font-semibold mb-2">
                6. What programming languages and frameworks are you comfortable with? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="languagesFrameworks"
                name="languagesFrameworks"
                required
                value={formData.languagesFrameworks}
                onChange={handleChange}
                rows={3}
                placeholder="e.g., JavaScript, Python, React, Node.js, Discord.js, etc."
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="previousProjects" className="block text-sm font-semibold mb-2">
                7. Have you worked on any projects before? If yes, describe them. <span className="text-red-500">*</span>
              </label>
              <textarea
                id="previousProjects"
                name="previousProjects"
                required
                value={formData.previousProjects}
                onChange={handleChange}
                rows={4}
                placeholder="Describe your previous projects, what you built, technologies used, etc."
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="botsPluginsMods" className="block text-sm font-semibold mb-2">
                8. Do you have experience with bots, plugins, or mods? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="botsPluginsMods"
                name="botsPluginsMods"
                required
                value={formData.botsPluginsMods}
                onChange={handleChange}
                rows={3}
                placeholder="Describe your experience with Discord bots, Minecraft plugins, mods, etc."
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="versionControl" className="block text-sm font-semibold mb-2">
                9. Are you familiar with version control systems like Git? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="versionControl"
                name="versionControl"
                required
                value={formData.versionControl}
                onChange={handleChange}
                rows={2}
                placeholder="Describe your experience with Git, GitHub, GitLab, etc."
                className="input-field"
              />
            </div>
          </div>

          {/* Motivation & Availability Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-discord-blurple border-b border-white/10 pb-2">Motivation & Availability</h2>
            
            <div>
              <label htmlFor="whyDeveloper" className="block text-sm font-semibold mb-2">
                10. Why do you want to be a developer in our server? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="whyDeveloper"
                name="whyDeveloper"
                required
                value={formData.whyDeveloper}
                onChange={handleChange}
                rows={4}
                placeholder="What motivates you to join our development team?"
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="hoursPerWeek" className="block text-sm font-semibold mb-2">
                11. How many hours per week can you dedicate? <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="hoursPerWeek"
                name="hoursPerWeek"
                required
                value={formData.hoursPerWeek}
                onChange={handleChange}
                placeholder="e.g., 10-15 hours per week"
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="handleDeadlines" className="block text-sm font-semibold mb-2">
                12. How do you handle deadlines or stressful situations? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="handleDeadlines"
                name="handleDeadlines"
                required
                value={formData.handleDeadlines}
                onChange={handleChange}
                rows={3}
                placeholder="Describe your approach to managing stress and meeting deadlines"
                className="input-field"
              />
            </div>
          </div>

          {/* Personal Info / Fit Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-discord-blurple border-b border-white/10 pb-2">Personal Info / Fit</h2>
            
            <div>
              <label htmlFor="aboutYourself" className="block text-sm font-semibold mb-2">
                13. Tell us about yourself. <span className="text-red-500">*</span>
              </label>
              <textarea
                id="aboutYourself"
                name="aboutYourself"
                required
                value={formData.aboutYourself}
                onChange={handleChange}
                rows={4}
                placeholder="Share a bit about who you are, your interests, background, etc."
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="teamworkConflicts" className="block text-sm font-semibold mb-2">
                14. How do you handle teamwork or conflicts in a group? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="teamworkConflicts"
                name="teamworkConflicts"
                required
                value={formData.teamworkConflicts}
                onChange={handleChange}
                rows={3}
                placeholder="Describe your approach to collaboration and conflict resolution"
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="strengthsWeaknesses" className="block text-sm font-semibold mb-2">
                15. What are your strengths and weaknesses? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="strengthsWeaknesses"
                name="strengthsWeaknesses"
                required
                value={formData.strengthsWeaknesses}
                onChange={handleChange}
                rows={3}
                placeholder="Be honest about your strengths and areas for improvement"
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="priorModeration" className="block text-sm font-semibold mb-2">
                16. Do you have any prior experience in server moderation or community management?
              </label>
              <textarea
                id="priorModeration"
                name="priorModeration"
                value={formData.priorModeration}
                onChange={handleChange}
                rows={3}
                placeholder="Describe any moderation or community management experience"
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="followGuidelines" className="block text-sm font-semibold mb-2">
                17. Are you comfortable following server rules and coding guidelines? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="followGuidelines"
                name="followGuidelines"
                required
                value={formData.followGuidelines}
                onChange={handleChange}
                rows={2}
                placeholder="Yes/No and explain your approach to following guidelines"
                className="input-field"
              />
            </div>
          </div>

          {/* Optional / Fun Questions Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-discord-blurple border-b border-white/10 pb-2">Optional / Fun Questions</h2>
            
            <div>
              <label htmlFor="favoriteProject" className="block text-sm font-semibold mb-2">
                18. What's your favorite project or thing you've coded so far?
              </label>
              <textarea
                id="favoriteProject"
                name="favoriteProject"
                value={formData.favoriteProject}
                onChange={handleChange}
                rows={3}
                placeholder="Tell us about your favorite coding project"
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="serverIdeas" className="block text-sm font-semibold mb-2">
                19. Do you have any ideas you'd like to implement in our server?
              </label>
              <textarea
                id="serverIdeas"
                name="serverIdeas"
                value={formData.serverIdeas}
                onChange={handleChange}
                rows={3}
                placeholder="Share any ideas or features you'd like to build"
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="additionalInfo" className="block text-sm font-semibold mb-2">
                20. Anything else you want us to know about you?
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
