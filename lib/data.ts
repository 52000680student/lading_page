// Data service to fetch labhouse data from API or fallback to static JSON
import labhouseDataStatic from '@/data/labhouse-data.json'

let cachedData: any = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export async function getLabhouseData() {
  // Check if we have cached data that's still fresh
  if (cachedData && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return cachedData
  }

  try {
    // Try to fetch from API first
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_PRISMA || 'http://localhost:3000'}/api/labhouse`, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (response.ok) {
      const data = await response.json()
      // Only cache if we got valid data
      if (data && typeof data === 'object') {
        cachedData = data
        cacheTimestamp = Date.now()
        return data
      } else {
        throw new Error('Invalid data format received')
      }
    } else {
      throw new Error(`API response not ok: ${response.status}`)
    }
  } catch (error) {
    console.warn('Failed to fetch from API, falling back to static data:', error)
    // Fallback to static JSON data
    return labhouseDataStatic
  }
}

// Server-side function for use in server components and API routes
export async function getLabhouseDataServer() {
  try {
    // For server-side, we can directly use the API route logic
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/labhouse`, {
      cache: 'no-store', // Always fetch fresh data on server
      headers: {
        'Content-Type': 'application/json',
      },
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(10000), // 10 second timeout
    })
    
    if (response.ok) {
      const data = await response.json()
      // Validate data before returning
      if (data && typeof data === 'object') {
        return data
      } else {
        throw new Error('Invalid data format received from server')
      }
    } else {
      throw new Error(`API response not ok: ${response.status} ${response.statusText}`)
    }
  } catch (error) {
    console.warn('Failed to fetch from API on server, falling back to static data:', error)
    return labhouseDataStatic
  }
}