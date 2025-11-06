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
    
    console.log('Received helper application data:', body)
    
    const db = await readDatabase()
    
    console.log('Current database state:', db)
    
    const application = {
      id: uuidv4(),
      ...body,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    console.log('New helper application:', application)
    
    db.applications.push(application)
    
    console.log('Database after push:', db)
    
    await writeDatabase(db)
    
    console.log('Helper application saved successfully')
    
    return NextResponse.json({ success: true, id: application.id })
  } catch (error) {
    console.error('Error saving helper application:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to save application' },
      { status: 500 }
    )
  }
}
