'use client'

import { useState, useEffect } from 'react'
import { Shield, Search, Download, Trash2, CheckCircle, XCircle } from 'lucide-react'
import { getAdminToken, setAdminToken, clearAdminToken } from '@/lib/adminAuth'

interface Application {
  id: string
  type: string
  discordUsername: string
  discordId: string
  status: 'pending' | 'interview' | 'approved' | 'denied' | 'interview_failed'
  submittedAt: string
  [key: string]: any
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [applications, setApplications] = useState<Application[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedApp, setSelectedApp] = useState<Application | null>(null)
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'interview' | 'approved' | 'denied' | 'interview_failed'>('all')
  const [loginError, setLoginError] = useState('')
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    // Check if already authenticated
    const token = getAdminToken()
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) fetchApplications()
  }, [isAuthenticated])

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/admin/applications', {
        credentials: 'include', // Important: include cookies
      })
      
      if (!response.ok) {
        console.error('Failed to fetch applications:', response.status)
        if (response.status === 401) {
          // Session expired, logout
          handleLogout()
        }
        return
      }
      
      const data = await response.json()
      setApplications(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching applications:', error)
      setApplications([])
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setAdminToken(data.token)
        setIsAuthenticated(true)
      } else {
        setLoginError('Invalid username or password')
      }
    } catch (error) {
      setLoginError('Login failed. Please try again.')
    }
  }

  const handleLogout = () => {
    clearAdminToken()
    setIsAuthenticated(false)
    setUsername('')
    setPassword('')
  }

  const showSuccess = (message: string) => {
    setSuccessMessage(message)
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const updateStatus = async (id: string, status: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/applications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
        credentials: 'include',
      })
      
      if (response.ok) {
        // Update locally for instant feedback
        setApplications(prev => prev.map(app => 
          app.id === id ? { ...app, status: status as Application['status'] } : app
        ))
        if (selectedApp?.id === id) {
          setSelectedApp({ ...selectedApp, status: status as Application['status'] })
        }
        showSuccess(`Status updated to ${status}`)
      }
    } catch (error) {
      console.error('Error updating status:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteApplication = async (id: string) => {
    if (!confirm('Delete this application?')) return
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/applications?id=${id}`, { 
        method: 'DELETE',
        credentials: 'include',
      })
      
      if (response.ok) {
        // Remove locally for instant feedback
        setApplications(prev => prev.filter(app => app.id !== id))
        setSelectedApp(null)
        showSuccess('Application deleted')
      }
    } catch (error) {
      console.error('Error deleting application:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportToJSON = () => {
    const dataStr = JSON.stringify(applications, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `applications-${Date.now()}.json`
    link.click()
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="glass-card max-w-md w-full">
          <Shield className="w-16 h-16 text-discord-blurple mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-center mb-6">Admin Login</h1>
          {loginError && (
            <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-4">
              {loginError}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Enter password"
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full">Login</button>
          </form>
        </div>
      </div>
    )
  }

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    interview: applications.filter(a => a.status === 'interview').length,
    approved: applications.filter(a => a.status === 'approved').length,
    denied: applications.filter(a => a.status === 'denied').length,
    interviewFailed: applications.filter(a => a.status === 'interview_failed').length,
  }

  const filtered = applications.filter(app => {
    const matchesSearch = app.discordUsername.toLowerCase().includes(searchTerm.toLowerCase())
    if (activeTab === 'all') return matchesSearch
    return matchesSearch && app.status === activeTab
  })

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Success Message */}
        {successMessage && (
          <div className="fixed top-24 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-up">
            ✓ {successMessage}
          </div>
        )}

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center">
            <div className="bg-discord-dark border border-discord-blurple rounded-lg p-6">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-discord-blurple mx-auto"></div>
              <p className="text-white mt-4">Processing...</p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Shield className="w-12 h-12 text-discord-blurple" />
            <div>
              <h1 className="text-4xl font-bold">Admin Dashboard</h1>
              <p className="text-gray-400">{stats.total} total applications</p>
            </div>
          </div>
          <button onClick={handleLogout} className="btn-secondary">
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-discord-dark border border-white/10 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">Total</p>
            <p className="text-3xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-discord-dark border border-yellow-500/20 rounded-lg p-4">
            <p className="text-yellow-500 text-sm mb-1">Pending</p>
            <p className="text-3xl font-bold text-yellow-500">{stats.pending}</p>
          </div>
          <div className="bg-discord-dark border border-blue-500/20 rounded-lg p-4">
            <p className="text-blue-500 text-sm mb-1">Interview</p>
            <p className="text-3xl font-bold text-blue-500">{stats.interview}</p>
          </div>
          <div className="bg-discord-dark border border-green-500/20 rounded-lg p-4">
            <p className="text-green-500 text-sm mb-1">Approved</p>
            <p className="text-3xl font-bold text-green-500">{stats.approved}</p>
          </div>
          <div className="bg-discord-dark border border-red-500/20 rounded-lg p-4">
            <p className="text-red-500 text-sm mb-1">Denied</p>
            <p className="text-3xl font-bold text-red-500">{stats.denied}</p>
          </div>
          <div className="bg-discord-dark border border-orange-500/20 rounded-lg p-4">
            <p className="text-orange-500 text-sm mb-1">Interview Failed</p>
            <p className="text-3xl font-bold text-orange-500">{stats.interviewFailed}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {(['all', 'pending', 'interview', 'approved', 'denied', 'interview_failed'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? 'bg-discord-blurple text-white'
                  : 'bg-discord-dark text-gray-400 hover:text-white'
              }`}
            >
              {tab.replace('_', ' ').toUpperCase()}
            </button>
          ))}
        </div>

        <div className="glass-card mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <button onClick={exportToJSON} className="btn-primary flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export JSON
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {filtered.map((app) => (
              <div
                key={app.id}
                onClick={() => setSelectedApp(app)}
                className={`glass-card cursor-pointer transition-all ${
                  selectedApp?.id === app.id ? 'border-discord-blurple' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg">{app.discordUsername}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    app.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                    app.status === 'interview' ? 'bg-blue-500/20 text-blue-500' :
                    app.status === 'approved' ? 'bg-green-500/20 text-green-500' :
                    app.status === 'denied' ? 'bg-red-500/20 text-red-500' :
                    'bg-orange-500/20 text-orange-500'
                  }`}>
                    {app.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">Type: {app.type}</p>
                <p className="text-gray-400 text-sm">ID: {app.discordId}</p>
                <p className="text-gray-400 text-xs mt-2">
                  {new Date(app.submittedAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          {selectedApp && (
            <div className="glass-card sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Application Details</h2>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-3 mb-6">
                {Object.entries(selectedApp).map(([key, value]) => {
                  if (['id', 'status', 'submittedAt', 'updatedAt'].includes(key)) return null
                  return (
                    <div key={key}>
                      <p className="text-sm text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                      <p className="text-white">{value}</p>
                    </div>
                  )
                })}
              </div>
              <div className="space-y-2">
                {selectedApp.status === 'pending' && (
                  <>
                    <button
                      onClick={() => updateStatus(selectedApp.id, 'interview')}
                      disabled={loading}
                      className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Move to Interview
                    </button>
                    <button
                      onClick={() => updateStatus(selectedApp.id, 'denied')}
                      disabled={loading}
                      className="bg-red-500 hover:bg-red-600 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <XCircle className="w-5 h-5" />
                      Deny Application
                    </button>
                  </>
                )}
                {selectedApp.status === 'interview' && (
                  <>
                    <button
                      onClick={() => updateStatus(selectedApp.id, 'approved')}
                      disabled={loading}
                      className="bg-green-500 hover:bg-green-600 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Approve (Interview Passed)
                    </button>
                    <button
                      onClick={() => updateStatus(selectedApp.id, 'interview_failed')}
                      disabled={loading}
                      className="bg-orange-500 hover:bg-orange-600 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <XCircle className="w-5 h-5" />
                      Interview Failed
                    </button>
                  </>
                )}
                {(selectedApp.status === 'approved' || selectedApp.status === 'denied' || selectedApp.status === 'interview_failed') && (
                  <p className="text-gray-400 text-center py-4">Application {selectedApp.status.replace('_', ' ')}</p>
                )}
                <button
                  onClick={() => deleteApplication(selectedApp.id)}
                  disabled={loading}
                  className="btn-secondary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete Application
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
