// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

const RATE_LIMIT = 60
const TIME_WINDOW = 60 * 1000
const ipRequests = new Map<string, { count: number; startTime: number }>()

export function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith('/api/cloudinary')) {
    return NextResponse.next()
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0] ||
    req.headers.get('x-real-ip') ||
    crypto.randomUUID()

  const now = Date.now()
  const entry = ipRequests.get(ip)

  if (entry) {
    if (now - entry.startTime < TIME_WINDOW) {
      if (entry.count >= RATE_LIMIT) {
        return new NextResponse(
          JSON.stringify({
            error: 'Too many requests, please try again later.',
          }),
          { status: 429, headers: { 'Content-Type': 'application/json' } }
        )
      }
      entry.count++
    } else {
      ipRequests.set(ip, { count: 1, startTime: now })
    }
  } else {
    ipRequests.set(ip, { count: 1, startTime: now })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/cloudinary/:path*'],
}
