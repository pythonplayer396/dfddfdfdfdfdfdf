'use client'

import { useState, useEffect } from 'react'
import { Shield, Clock, User, Activity } from 'lucide-react'
import Link from 'next/link'
import { getAdminToken } from '@/lib/adminAuth'
import { useRouter } from 'next/navigation'

interface AuditLog {
  id: string
  timestamp: string
  action: string
  adminUser: string
  targetId?: string
  targetType?: string
  details?: any
  ipAddress?: string
  userAgent?: string
}

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = getAdminToken()
    if (!token) {
      router.push('/admin/auth/login')
      return
    }
    fetchLogs()
  }, [])

  const fetchLogs = async () => {
    try {
      const response = await fetch('/api/admin/audit-logs?limit=100')
      const data = await response.json()
      setLogs(data)
    } catch (error) {
      console.error('Failed to fetch logs:', error)
    } finally {
      setLoading(false)
    }
  }

  const getActionColor = (action: string) => {
    if (action.includes('SUCCESS')) return 'text-green-500'
    if (action.includes('FAILED')) return 'text-red-500'
    if (action.includes('DELETED')) return 'text-orange-500'
    if (action.includes('CHANGED')) return 'text-blue-500'
    return 'text-gray-400'
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Activity className="w-12 h-12 text-discord-blurple" />
            <div>
              <h1 className="text-4xl font-bold">Audit Logs</h1>
              <p className="text-gray-400">System activity and security events</p>
            </div>
          </div>
          <Link href="/admin" className="btn-secondary">
            Back to Dashboard
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading audit logs...</p>
          </div>
        ) : (
          <div className="bg-discord-dark border border-white/10 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-discord-darker border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Timestamp</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Action</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">User</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Details</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">IP Address</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id} className="border-b border-white/5 hover:bg-discord-darker/50">
                      <td className="px-6 py-4 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {new Date(log.timestamp).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-sm font-semibold ${getActionColor(log.action)}`}>
                          {log.action.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          {log.adminUser}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {log.details && (
                          <div className="max-w-xs truncate">
                            {JSON.stringify(log.details)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {log.ipAddress || 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {logs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">No audit logs found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
