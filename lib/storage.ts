const GIST_ID = process.env.GIST_ID || 'temp'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || ''

export async function readDatabase() {
  if (!GITHUB_TOKEN || !GIST_ID || GIST_ID === 'temp') {
    console.log('No GitHub storage configured, returning empty')
    return { applications: [] }
  }
  
  try {
    const response = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      },
      next: { revalidate: 0 } // Don't cache
    })
    
    if (!response.ok) {
      console.error('Failed to read from GitHub:', response.status)
      return { applications: [] }
    }
    
    const gist = await response.json()
    const content = gist.files['applications.json']?.content
    
    if (content) {
      const data = JSON.parse(content)
      console.log(`Read ${data.applications?.length || 0} applications from GitHub`)
      return data
    }
  } catch (error) {
    console.error('Error reading database:', error)
  }
  
  return { applications: [] }
}

export async function writeDatabase(data: any) {
  if (!GITHUB_TOKEN || !GIST_ID || GIST_ID === 'temp') {
    console.log('No GitHub storage configured, data not persisted')
    console.log('Data that would be saved:', JSON.stringify(data, null, 2))
    return
  }
  
  try {
    const response = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        files: {
          'applications.json': {
            content: JSON.stringify(data, null, 2)
          }
        }
      })
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Failed to write to GitHub:', response.status, errorText)
    } else {
      console.log(`Successfully wrote ${data.applications?.length || 0} applications to GitHub Gist`)
    }
  } catch (error) {
    console.error('Error writing database:', error)
  }
}
