import { NextResponse } from 'next/server'
import { getAuditLogs } from '@/lib/auditLog'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '100')
    
    const logs = await getAuditLogs(limit)
    return NextResponse.json(logs)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch audit logs' },
      { status: 500 }
    )
  }
}
