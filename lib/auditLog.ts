import { getStore } from '@netlify/blobs'
import { v4 as uuidv4 } from 'uuid'

export interface AuditLogEntry {
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

async function readAuditLogs() {
  try {
    const store = getStore('audit-logs')
    const data = await store.get('all', { type: 'json' })
    return data || { logs: [] }
  } catch {
    return { logs: [] }
  }
}

async function writeAuditLogs(data: any) {
  const store = getStore('audit-logs')
  await store.setJSON('all', data)
}

export async function logAuditEvent(event: Omit<AuditLogEntry, 'id' | 'timestamp'>): Promise<void> {
  try {
    const auditData = await readAuditLogs()
    
    const logEntry: AuditLogEntry = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      ...event,
    }
    
    auditData.logs.unshift(logEntry) // Add to beginning
    
    // Keep only last 1000 entries
    if (auditData.logs.length > 1000) {
      auditData.logs = auditData.logs.slice(0, 1000)
    }
    
    await writeAuditLogs(auditData)
  } catch (error) {
    console.error('Failed to log audit event:', error)
  }
}

export async function getAuditLogs(limit: number = 100): Promise<AuditLogEntry[]> {
  try {
    const auditData = await readAuditLogs()
    return auditData.logs.slice(0, limit)
  } catch (error) {
    console.error('Failed to read audit logs:', error)
    return []
  }
}
