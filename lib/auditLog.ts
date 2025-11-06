import fs from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const AUDIT_LOG_PATH = path.join(process.cwd(), 'data', 'audit-logs.json')

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

async function ensureAuditLogFile() {
  try {
    await fs.access(AUDIT_LOG_PATH)
  } catch {
    const dataDir = path.join(process.cwd(), 'data')
    await fs.mkdir(dataDir, { recursive: true })
    await fs.writeFile(AUDIT_LOG_PATH, JSON.stringify({ logs: [] }, null, 2))
  }
}

export async function logAuditEvent(event: Omit<AuditLogEntry, 'id' | 'timestamp'>): Promise<void> {
  try {
    await ensureAuditLogFile()
    
    const data = await fs.readFile(AUDIT_LOG_PATH, 'utf-8')
    const auditData = JSON.parse(data)
    
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
    
    await fs.writeFile(AUDIT_LOG_PATH, JSON.stringify(auditData, null, 2))
  } catch (error) {
    console.error('Failed to log audit event:', error)
  }
}

export async function getAuditLogs(limit: number = 100): Promise<AuditLogEntry[]> {
  try {
    await ensureAuditLogFile()
    const data = await fs.readFile(AUDIT_LOG_PATH, 'utf-8')
    const auditData = JSON.parse(data)
    return auditData.logs.slice(0, limit)
  } catch (error) {
    console.error('Failed to read audit logs:', error)
    return []
  }
}
