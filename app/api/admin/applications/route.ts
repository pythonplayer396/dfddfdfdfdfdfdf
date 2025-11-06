import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import fs from 'fs/promises'
import path from 'path'
import { logAuditEvent } from '@/lib/auditLog'

const DB_PATH = path.join(process.cwd(), 'data', 'applications.json')

async function readDatabase() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8')
    return JSON.parse(data)
  } catch {
    return { applications: [] }
  }
}

async function writeDatabase(data: any) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2))
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
    return NextResponse.json(db.applications)
  } catch (error) {
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
    const data = await fs.readFile(DB_PATH, 'utf8')
    const db = JSON.parse(data)
    
    const appIndex = db.applications.findIndex((app: any) => app.id === id)
    if (appIndex !== -1) {
      const oldStatus = db.applications[appIndex].status
      db.applications[appIndex].status = status
      db.applications[appIndex].updatedAt = new Date().toISOString()
      await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2))
      
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
