import { NextResponse } from 'next/server'
import { getStore } from '@netlify/blobs'

export async function GET() {
  try {
    const store = getStore('applications')
    
    // Try to read
    const data = await store.get('all', { type: 'json' })
    
    console.log('Blobs test - data retrieved:', data)
    
    return NextResponse.json({
      success: true,
      blobsWorking: true,
      data: data,
      message: 'Netlify Blobs is working correctly'
    })
  } catch (error) {
    console.error('Blobs test error:', error)
    return NextResponse.json({
      success: false,
      blobsWorking: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Netlify Blobs is NOT working'
    }, { status: 500 })
  }
}

export async function POST() {
  try {
    const store = getStore('applications')
    
    // Try to write test data
    const testData = {
      applications: [
        {
          id: 'test-123',
          discordUsername: 'TestUser',
          type: 'developer',
          status: 'pending',
          submittedAt: new Date().toISOString()
        }
      ]
    }
    
    await store.setJSON('all', testData)
    
    console.log('Blobs test - wrote test data')
    
    // Read it back
    const readBack = await store.get('all', { type: 'json' })
    
    console.log('Blobs test - read back:', readBack)
    
    return NextResponse.json({
      success: true,
      message: 'Test data written and read successfully',
      writtenData: testData,
      readBackData: readBack
    })
  } catch (error) {
    console.error('Blobs write test error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
