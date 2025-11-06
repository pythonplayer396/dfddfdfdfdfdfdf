'use client'

import { useState } from 'react'
import { Shield } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { setAdminToken } from '@/lib/adminAuth'

export default function AdminLoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    setLoading(true)
    
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setAdminToken(data.token)
        router.push('/admin')
      } else {
        setLoginError('Invalid username or password')
      }
    } catch (error) {
      setLoginError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
      <div className="bg-discord-dark border border-white/10 rounded-lg p-8 max-w-md w-full">
        <Shield className="w-16 h-16 text-discord-blurple mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-center mb-2">Admin Portal</h1>
        <p className="text-gray-400 text-center mb-6">Secure administrator access</p>
        
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
              placeholder="Enter admin username"
              required
              disabled={loading}
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
              placeholder="Enter admin password"
              required
              disabled={loading}
            />
          </div>
          <button 
            type="submit" 
            className="btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login to Admin Panel'}
          </button>
        </form>
        
        <p className="text-gray-500 text-xs text-center mt-6">
          Authorized personnel only. All access is logged.
        </p>
      </div>
    </div>
  )
}
