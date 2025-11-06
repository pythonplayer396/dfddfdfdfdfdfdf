// Simple admin authentication helper
// In production, use proper JWT or session-based auth

export function isAdminAuthenticated(token: string | null): boolean {
  // This is a basic check - in production, verify JWT token
  return token === 'admin-authenticated'
}

export function getAdminToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('admin_token')
}

export function setAdminToken(token: string) {
  if (typeof window === 'undefined') return
  localStorage.setItem('admin_token', token)
}

export function clearAdminToken() {
  if (typeof window === 'undefined') return
  localStorage.removeItem('admin_token')
}
