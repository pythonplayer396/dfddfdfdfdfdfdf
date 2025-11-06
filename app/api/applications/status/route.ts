import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { getStore } from '@netlify/blobs'

export async function GET(request: Request) {
  try {
    const session = await getServerSession()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const store = getStore('applications')
    const data = await store.get('all', { type: 'json' })
    const db = data || { applications: [] }

    // Filter applications by the logged-in user's Discord username
    const userApplications = db.applications.filter(
      (app: any) => app.discordUsername === session.user.name
    )

    // Return only necessary fields
    const sanitizedApps = userApplications.map((app: any) => ({
      id: app.id,
      type: app.type,
      status: app.status,
      discordUsername: app.discordUsername,
      submittedAt: app.submittedAt,
      updatedAt: app.updatedAt || app.submittedAt,
    }))

    return NextResponse.json(sanitizedApps)
  } catch (error) {
    console.error('Error fetching application status:', error)
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    )
  }
}
