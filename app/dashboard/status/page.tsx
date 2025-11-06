'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, Clock, AlertCircle, FileText } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Application {
  id: string
  type: 'developer' | 'helper'
  status: 'pending' | 'interview' | 'approved' | 'denied' | 'interview_failed'
  discordUsername: string
  submittedAt: string
  updatedAt: string
}

export default function ApplicationStatus() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      fetchApplications()
    }
  }, [status, session])

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/applications/status')
      if (response.ok) {
        const data = await response.json()
        setApplications(data)
      }
    } catch (error) {
      console.error('Error fetching applications:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-discord-blurple"></div>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-8 h-8 text-green-500" />
      case 'denied':
      case 'interview_failed':
        return <XCircle className="w-8 h-8 text-red-500" />
      case 'interview':
        return <AlertCircle className="w-8 h-8 text-yellow-500" />
      default:
        return <Clock className="w-8 h-8 text-blue-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Under Review'
      case 'interview':
        return 'Interview Scheduled'
      case 'approved':
        return 'Approved'
      case 'denied':
        return 'Declined'
      case 'interview_failed':
        return 'Interview Not Passed'
      default:
        return status
    }
  }

  const getStatusDescription = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Your application is being reviewed by our team. We\'ll update you soon!'
      case 'interview':
        return 'Congratulations! You\'ve been selected for an interview. Check your Discord DMs for details.'
      case 'approved':
        return 'Welcome to the team! Check your Discord for next steps and server access.'
      case 'denied':
        return 'Unfortunately, your application was not accepted at this time. You can apply again in the future.'
      case 'interview_failed':
        return 'Thank you for interviewing. Unfortunately, we won\'t be moving forward at this time.'
      default:
        return ''
    }
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <FileText className="w-12 h-12 text-discord-blurple" />
          <div>
            <h1 className="text-4xl font-bold">Application Status</h1>
            <p className="text-gray-400">Track your applications</p>
          </div>
        </div>

        {applications.length === 0 ? (
          <div className="glass-card text-center py-12">
            <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">No Applications Found</h2>
            <p className="text-gray-400 mb-6">You haven't submitted any applications yet.</p>
            <button
              onClick={() => router.push('/dashboard')}
              className="btn-primary"
            >
              Apply Now
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((app) => (
              <div key={app.id} className="glass-card">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {getStatusIcon(app.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-2xl font-bold capitalize">{app.type} Application</h2>
                      <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
                        app.status === 'approved' ? 'bg-green-500/20 text-green-500' :
                        app.status === 'denied' || app.status === 'interview_failed' ? 'bg-red-500/20 text-red-500' :
                        app.status === 'interview' ? 'bg-yellow-500/20 text-yellow-500' :
                        'bg-blue-500/20 text-blue-500'
                      }`}>
                        {getStatusText(app.status)}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-4">
                      {getStatusDescription(app.status)}
                    </p>
                    <div className="flex gap-6 text-sm text-gray-400">
                      <div>
                        <span className="font-semibold">Submitted:</span>{' '}
                        {new Date(app.submittedAt).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-semibold">Last Updated:</span>{' '}
                        {new Date(app.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
