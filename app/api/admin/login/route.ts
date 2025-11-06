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

      // Generate a secure session token
      const sessionToken = process.env.ADMIN_SESSION_SECRET || 'admin-authenticated'
      
      // Create response with HTTP-only cookie
      const response = NextResponse.json({ success: true, token: sessionToken })
      
      // Set secure HTTP-only cookie
      response.cookies.set('admin_session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      })
      
      return response
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
