'use client'

import { Users, Code } from 'lucide-react'
import Link from 'next/link'

export default function DashboardHome() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
      <div className="max-w-4xl mx-auto w-full">
        {/* Welcome Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Welcome to FXG</h1>
          <p className="text-2xl text-gray-400">Staff Application Portal</p>
        </div>

        {/* Application Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Helper Application */}
          <Link href="/dashboard/applications/helper">
            <div className="bg-discord-dark border border-white/10 hover:border-discord-green rounded-lg p-8 transition-all cursor-pointer text-center h-full">
              <div className="w-20 h-20 bg-gradient-to-br from-discord-green to-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-3">Helper</h2>
              <p className="text-gray-400 mb-4">Apply to join our support team</p>
              <button className="btn-primary w-full">Apply Now</button>
            </div>
          </Link>

          {/* Developer Application */}
          <Link href="/dashboard/applications/developer">
            <div className="bg-discord-dark border border-white/10 hover:border-discord-blurple rounded-lg p-8 transition-all cursor-pointer text-center h-full">
              <div className="w-20 h-20 bg-gradient-to-br from-discord-blurple to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Code className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-3">Developer</h2>
              <p className="text-gray-400 mb-4">Apply to join our dev team</p>
              <button className="btn-primary w-full">Apply Now</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
