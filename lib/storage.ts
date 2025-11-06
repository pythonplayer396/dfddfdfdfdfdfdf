import clientPromise from './mongodb'

export async function readDatabase() {
  try {
    const client = await clientPromise
    const db = client.db('fxg_applications')
    const applications = await db.collection('applications').find({}).toArray()
    
    console.log(`Read ${applications.length} applications from MongoDB`)
    
    return { 
      applications: applications.map(app => ({
        ...app,
        _id: app._id.toString() // Convert ObjectId to string
      }))
    }
  } catch (error) {
    console.error('Error reading from MongoDB:', error)
    return { applications: [] }
  }
}

export async function writeDatabase(data: any) {
  try {
    const client = await clientPromise
    const db = client.db('fxg_applications')
    
    // Clear existing data and insert new
    await db.collection('applications').deleteMany({})
    
    if (data.applications && data.applications.length > 0) {
      await db.collection('applications').insertMany(data.applications)
      console.log(`Successfully wrote ${data.applications.length} applications to MongoDB`)
    }
  } catch (error) {
    console.error('Error writing to MongoDB:', error)
  }
}

export async function addApplication(application: any) {
  try {
    const client = await clientPromise
    const db = client.db('fxg_applications')
    
    const result = await db.collection('applications').insertOne(application)
    console.log(`Added application with ID: ${result.insertedId}`)
    
    return result.insertedId.toString()
  } catch (error) {
    console.error('Error adding application to MongoDB:', error)
    throw error
  }
}

export async function updateApplication(id: string, updates: any) {
  try {
    const client = await clientPromise
    const db = client.db('fxg_applications')
    
    await db.collection('applications').updateOne(
      { id },
      { $set: updates }
    )
    
    console.log(`Updated application ${id}`)
  } catch (error) {
    console.error('Error updating application in MongoDB:', error)
    throw error
  }
}

export async function deleteApplication(id: string) {
  try {
    const client = await clientPromise
    const db = client.db('fxg_applications')
    
    await db.collection('applications').deleteOne({ id })
    console.log(`Deleted application ${id}`)
  } catch (error) {
    console.error('Error deleting application from MongoDB:', error)
    throw error
  }
}
