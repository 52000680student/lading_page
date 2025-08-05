import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes (except login)
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    // For client-side routing, we'll handle auth in the components
    // This middleware is mainly for API protection
    if (request.nextUrl.pathname.startsWith('/api/admin')) {
      // For now, we'll allow API calls since we're using simple localStorage auth
      // In production, you'd want to check for proper session tokens
      return NextResponse.next()
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*']
}