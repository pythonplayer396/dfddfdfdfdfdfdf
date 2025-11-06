'use client'

import { Users, Code, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function ApplicationsPage() {
  const applications = [
    {
      title: 'Staff Application',
      description: 'Join our team as a staff member and support our community',
      icon: <Users className="w-12 h-12" />,
      color: 'from-discord-green to-emerald-600',
      href: '/applications/helper',
      requirements: [
        'Active Discord user',
        'Good communication skills',
        'Familiar with server rules',
        'Available regularly',
      ],
    },
    {
      title: 'Developer Application',
      description: 'Help us build amazing features and tools for our community',
      icon: <Code className="w-12 h-12" />,
      color: 'from-discord-blurple to-purple-600',
      href: '/applications/developer',
      requirements: [
        'Programming experience',
        'Knowledge of web technologies',
        'Portfolio or GitHub',
        'Team player mindset',
      ],
    },
  ]

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-discord-dark border border-white/10 rounded-lg p-8 mb-6">
          <h1 className="text-4xl font-bold mb-3">Staff Applications</h1>
          <p className="text-gray-400 text-lg">
            Choose a position below and fill out the application form
          </p>
        </div>

        {/* Application Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {applications.map((app, index) => (
            <Link key={index} href={app.href}>
              <div className="bg-discord-dark border border-white/10 hover:border-discord-blurple rounded-lg p-6 transition-all cursor-pointer h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${app.color} rounded-lg flex items-center justify-center`}>
                    <div className="text-white">{app.icon}</div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{app.title}</h2>
                    <p className="text-gray-400 text-sm">{app.description}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-semibold mb-2 text-gray-400">Requirements:</h3>
                  <ul className="space-y-1">
                    {app.requirements.map((req, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-discord-green flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-2 text-discord-blurple font-semibold text-sm">
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Section */}
        <div className="bg-discord-dark border border-white/10 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Application Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="w-10 h-10 bg-discord-blurple/20 rounded-lg flex items-center justify-center mb-3">
                <span className="text-lg font-bold text-discord-blurple">1</span>
              </div>
              <h3 className="font-semibold mb-1">Submit Application</h3>
              <p className="text-gray-400 text-sm">Fill out the form with your details</p>
            </div>
            <div>
              <div className="w-10 h-10 bg-discord-blurple/20 rounded-lg flex items-center justify-center mb-3">
                <span className="text-lg font-bold text-discord-blurple">2</span>
              </div>
              <h3 className="font-semibold mb-1">Review Process</h3>
              <p className="text-gray-400 text-sm">Our team reviews your application</p>
            </div>
            <div>
              <div className="w-10 h-10 bg-discord-blurple/20 rounded-lg flex items-center justify-center mb-3">
                <span className="text-lg font-bold text-discord-blurple">3</span>
              </div>
              <h3 className="font-semibold mb-1">Get Response</h3>
              <p className="text-gray-400 text-sm">We'll contact you via Discord</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
