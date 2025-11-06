import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Protect admin routes
  if (path.startsWith('/secure-admin-portal-x9k2m')) {
    // Check for admin session cookie
    const adminToken = request.cookies.get('admin_session')?.value
    
    // If no admin token and not on login page, redirect to login
    if (!adminToken && !path.includes('/auth/login')) {
      return NextResponse.redirect(new URL('/secure-admin-portal-x9k2m', request.url))
    }
    
    // Verify admin token is valid
    if (adminToken && adminToken !== process.env.ADMIN_SESSION_SECRET) {
      // Invalid token - clear it and redirect to login
      const response = NextResponse.redirect(new URL('/secure-admin-portal-x9k2m', request.url))
      response.cookies.delete('admin_session')
      return response
    }
  }

  // Protect user dashboard routes with NextAuth
  if (path.startsWith('/dashboard')) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/secure-admin-portal-x9k2m/:path*',
  ],
}
