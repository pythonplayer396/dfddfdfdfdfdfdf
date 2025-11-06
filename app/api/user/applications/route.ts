import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import fs from 'fs/promises'
import path from 'path'

const DB_FILE = path.join(process.cwd(), 'data', 'applications.json')

export async function GET() {
  try {
    const session = await getServerSession()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await fs.readFile(DB_FILE, 'utf8')
    const db = JSON.parse(data)
    
    // Filter applications by user (using Discord username or email)
    const userApps = db.filter((app: any) => 
      app.discordUsername === session.user.name || 
      app.email === session.user.email
    )

    return NextResponse.json(userApps)
  } catch (error) {
    return NextResponse.json([])
  }
}
