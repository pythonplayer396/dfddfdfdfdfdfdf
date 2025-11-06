import { NextResponse } from 'next/server'
import { logAuditEvent } from '@/lib/auditLog'

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()
    const ipAddress = request.headers.get('x-forwarded-for') || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Check credentials from environment variables
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // Log successful login
      await logAuditEvent({
        action: 'ADMIN_LOGIN_SUCCESS',
        adminUser: username,
        ipAddress,
        userAgent,
        details: { timestamp: new Date().toISOString() }
      })

      // In production, use proper JWT tokens or sessions
      return NextResponse.json({ success: true, token: 'admin-authenticated' })
    }

    // Log failed login attempt
    await logAuditEvent({
      action: 'ADMIN_LOGIN_FAILED',
      adminUser: username,
      ipAddress,
      userAgent,
      details: { reason: 'Invalid credentials' }
    })

    return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
