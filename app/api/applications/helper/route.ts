import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { addApplication } from '@/lib/storage'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    console.log('Received helper application:', body)
    
    const application = {
      id: uuidv4(),
      ...body,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    await addApplication(application)
    
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
