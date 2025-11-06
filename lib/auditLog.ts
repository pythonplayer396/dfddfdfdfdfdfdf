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

const GIST_ID = process.env.GIST_AUDIT_ID || process.env.GIST_ID || 'temp'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || ''

async function readAuditLogs() {
  if (!GITHUB_TOKEN || !GIST_ID || GIST_ID === 'temp') {
    return { logs: [] }
  }
  
  try {
    const response = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      },
      next: { revalidate: 0 }
    })
    
    if (response.ok) {
      const gist = await response.json()
      const content = gist.files['audit-logs.json']?.content
      if (content) {
        return JSON.parse(content)
      }
    }
  } catch (error) {
    console.error('Error reading audit logs:', error)
  }
  
  return { logs: [] }
}

async function writeAuditLogs(data: any) {
  if (!GITHUB_TOKEN || !GIST_ID || GIST_ID === 'temp') {
    return
  }
  
  try {
    await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        files: {
          'audit-logs.json': {
            content: JSON.stringify(data, null, 2)
          }
        }
      })
    })
  } catch (error) {
    console.error('Error writing audit logs:', error)
  }
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
