import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const DB_PATH = path.join(process.cwd(), 'data', 'applications.json')

async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data')
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

async function readDatabase() {
  try {
    await ensureDataDir()
    const data = await fs.readFile(DB_PATH, 'utf-8')
    return JSON.parse(data)
  } catch {
    return { applications: [] }
  }
}

async function writeDatabase(data: any) {
  await ensureDataDir()
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2))
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const db = await readDatabase()
    
    const application = {
      id: uuidv4(),
      ...body,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    db.applications.push(application)
    await writeDatabase(db)
    
    return NextResponse.json({ success: true, id: application.id })
  } catch (error) {
    console.error('Error saving application:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save application' },
      { status: 500 }
    )
  }
}
