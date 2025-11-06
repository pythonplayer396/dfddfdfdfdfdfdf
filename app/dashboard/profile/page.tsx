'use client'

import { useSession, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { User, CheckCircle, XCircle, Clock, LogOut } from 'lucide-react'
import Link from 'next/link'

interface UserApplication {
  id: string
  type: string
  status: string
  submittedAt: string
}

export default function ProfilePage() {
  const { data: session } = useSession()
  const [applications, setApplications] = useState<UserApplication[]>([])
  const [stats, setStats] = useState({ approved: 0, declined: 0, pending: 0 })

  useEffect(() => {
    if (session?.user) {
      fetchUserApplications()
    }
  }, [session])

  const fetchUserApplications = async () => {
    try {
      const response = await fetch('/api/user/applications')
      const data = await response.json()
      setApplications(data)
      
      const approved = data.filter((app: UserApplication) => app.status === 'approved').length
      const declined = data.filter((app: UserApplication) => app.status === 'denied').length
      const pending = data.filter((app: UserApplication) => app.status === 'pending').length
      
      setStats({ approved, declined, pending })
    } catch (error) {
      console.error('Error fetching applications:', error)
    }
  }

  if (!session) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* User Info */}
        <div className="bg-discord-dark border border-white/10 rounded-lg p-8 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {session.user?.image && (
                <img 
                  src={session.user.image} 
                  alt="Avatar" 
                  className="w-20 h-20 rounded-full"
                />
              )}
              <div>
                <h1 className="text-3xl font-bold">{session.user?.name}</h1>
                <p className="text-gray-400">{session.user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/auth/login' })}
              className="btn-secondary flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-discord-dark border border-white/10 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-6 h-6 text-discord-green" />
              <span className="text-gray-400">Approved</span>
            </div>
            <p className="text-4xl font-bold text-discord-green">{stats.approved}</p>
          </div>
          <div className="bg-discord-dark border border-white/10 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <XCircle className="w-6 h-6 text-red-500" />
              <span className="text-gray-400">Declined</span>
            </div>
            <p className="text-4xl font-bold text-red-500">{stats.declined}</p>
          </div>
          <div className="bg-discord-dark border border-white/10 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-6 h-6 text-yellow-500" />
              <span className="text-gray-400">Pending</span>
            </div>
            <p className="text-4xl font-bold text-yellow-500">{stats.pending}</p>
          </div>
        </div>

        {/* Applications History */}
        <div className="bg-discord-dark border border-white/10 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Your Applications</h2>
          {applications.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No applications yet</p>
          ) : (
            <div className="space-y-3">
              {applications.map((app) => (
                <div key={app.id} className="bg-discord-darker border border-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg capitalize">{app.type} Application</h3>
                      <p className="text-sm text-gray-400">
                        Submitted: {new Date(app.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      app.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                      app.status === 'approved' ? 'bg-green-500/20 text-green-500' :
                      'bg-red-500/20 text-red-500'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link href="/dashboard" className="btn-primary inline-block">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
