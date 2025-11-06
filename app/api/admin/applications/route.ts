import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getStore } from '@netlify/blobs'
import { logAuditEvent } from '@/lib/auditLog'

async function readDatabase() {
  try {
    const store = getStore('applications')
    const data = await store.get('all', { type: 'json' })
    return data || { applications: [] }
  } catch {
    return { applications: [] }
  }
}

async function writeDatabase(data: any) {
  const store = getStore('applications')
  await store.setJSON('all', data)
}

// Middleware to check admin authentication
function checkAdminAuth() {
  const cookieStore = cookies()
  const adminSession = cookieStore.get('admin_session')?.value
  const validToken = process.env.ADMIN_SESSION_SECRET || 'admin-authenticated'
  
  if (!adminSession || adminSession !== validToken) {
    return false
  }
  return true
}

export async function GET(request: Request) {
  // Check authentication
  if (!checkAdminAuth()) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const db = await readDatabase()
    console.log('Admin fetching applications, count:', db.applications?.length || 0)
    console.log('Applications data:', db.applications)
    return NextResponse.json(db.applications || [])
  } catch (error) {
    console.error('Error fetching applications for admin:', error)
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  // Check authentication
  if (!checkAdminAuth()) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const { id, status } = await request.json()
    const db = await readDatabase()
    
    const appIndex = db.applications.findIndex((app: any) => app.id === id)
    if (appIndex !== -1) {
      const oldStatus = db.applications[appIndex].status
      db.applications[appIndex].status = status
      db.applications[appIndex].updatedAt = new Date().toISOString()
      await writeDatabase(db)
      
      // Log status change
      await logAuditEvent({
        action: 'APPLICATION_STATUS_CHANGED',
        adminUser: 'admin', // In production, get from session
        targetId: id,
        targetType: 'application',
        details: {
          oldStatus,
          newStatus: status,
          applicationType: db.applications[appIndex].type,
          discordUsername: db.applications[appIndex].discordUsername
        }
      })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  // Check authentication
  if (!checkAdminAuth()) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Application ID required' },
        { status: 400 }
      )
    }
    
    const db = await readDatabase()
    const appToDelete = db.applications.find((app: any) => app.id === id)
    db.applications = db.applications.filter((app: any) => app.id !== id)
    
    await writeDatabase(db)
    
    // Log deletion
    if (appToDelete) {
      await logAuditEvent({
        action: 'APPLICATION_DELETED',
        adminUser: 'admin', // In production, get from session
        targetId: id,
        targetType: 'application',
        details: {
          applicationType: appToDelete.type,
          discordUsername: appToDelete.discordUsername,
          status: appToDelete.status
        }
      })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete application' },
      { status: 500 }
    )
  }
}
