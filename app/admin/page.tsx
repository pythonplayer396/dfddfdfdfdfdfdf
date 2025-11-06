'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminRedirect() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to home to hide admin access
    router.push('/')
  }, [router])
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-400">Redirecting...</p>
    </div>
  )
}
