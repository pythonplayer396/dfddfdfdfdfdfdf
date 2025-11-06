import { NextResponse } from 'next/server'
import { getStore } from '@netlify/blobs'
import { v4 as uuidv4 } from 'uuid'

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

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const db = await readDatabase()
    
    const application = {
      id: uuidv4(),
      ...body,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    db.applications.push(application)
    await writeDatabase(db)
    
    return NextResponse.json({ success: true, id: application.id })
  } catch (error) {
    console.error('Error saving application:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save application' },
      { status: 500 }
    )
  }
}
