// Data service to fetch labhouse data from API or fallback to static JSON
import labhouseDataStatic from '@/data/labhouse-data.json'

let cachedData: any = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 30 * 1000 // 30 seconds for better development experience

// Function to clear cache manually
export function clearLabhouseDataCache() {
  cachedData = null
  cacheTimestamp = 0
}

export async function getLabhouseData() {
  // Check if we have cached data that's still fresh
  if (cachedData && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return cachedData
  }

  try {
    // Always use same-origin relative URL to avoid port/domain mismatches
    const response = await fetch(`/api/labhouse`, {
      cache: 'no-store', // Disable Next.js fetch cache for fresh data
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
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
    // Use same-origin relative fetch on server as well
    const response = await fetch(`/api/labhouse`, {
      cache: 'no-store', // Always fetch fresh data on server
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
      // Add timeout to prevent hanging
      // @ts-ignore - AbortSignal.timeout is available in runtime
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