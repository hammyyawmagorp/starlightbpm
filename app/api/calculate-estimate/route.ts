import { NextResponse } from 'next/server'

// Simple rate limiting configuration
const RATE_LIMIT = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 20, // 20 requests per minute
  store: new Map<string, { count: number; resetTime: number }>(),
}

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of RATE_LIMIT.store.entries()) {
    if (now > value.resetTime) {
      RATE_LIMIT.store.delete(key)
    }
  }
}, 5 * 60 * 1000)

type RequestData = {
  windowCount: number
  storyType: 'one' | 'two'
  cleaningType: 'full' | 'exterior'
}

export async function POST(request: Request) {
  try {
    // Get client IP
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    const now = Date.now()

    // Check rate limit
    const clientData = RATE_LIMIT.store.get(ip)
    if (clientData) {
      if (now > clientData.resetTime) {
        // Reset if window has passed
        RATE_LIMIT.store.set(ip, {
          count: 1,
          resetTime: now + RATE_LIMIT.windowMs,
        })
      } else if (clientData.count >= RATE_LIMIT.maxRequests) {
        // Too many requests
        return NextResponse.json(
          { error: 'Please wait a moment before trying again' },
          { status: 429 }
        )
      } else {
        // Increment count
        clientData.count++
      }
    } else {
      // First request from this IP
      RATE_LIMIT.store.set(ip, {
        count: 1,
        resetTime: now + RATE_LIMIT.windowMs,
      })
    }

    const { windowCount, storyType, cleaningType } =
      (await request.json()) as RequestData

    if (!windowCount || !storyType || !cleaningType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    let base: number
    let baseCalc: number
    let price: number
    let message: string

    if (storyType === 'one') {
      if (cleaningType === 'full') {
        base = 175
        baseCalc = windowCount * 6.5
        price = windowCount >= 26 ? baseCalc : base
        message = `A one story full-cleaning for ${windowCount} windows will cost:`
      } else {
        base = 125
        baseCalc = windowCount * 5
        price = windowCount >= 26 ? baseCalc : base
        message = `A one story exterior only cleaning for ${windowCount} windows will cost:`
      }
    } else {
      if (cleaningType === 'full') {
        base = 250
        baseCalc = windowCount * 6.5
        price = windowCount >= 38 ? baseCalc : base
        message = `Full-cleaning for a 2+ story house with ${windowCount} windows will cost:`
      } else {
        base = 125
        baseCalc = windowCount * 5
        price = windowCount >= 38 ? baseCalc : base
        message = `Exterior only cleaning for a 2+ story house with ${windowCount} windows will cost:`
      }
    }

    return NextResponse.json({
      message,
      priceRange: `$${price} - $${price + 200} + HST`,
    })
  } catch {
    return NextResponse.json(
      { error: 'Failed to calculate estimate' },
      { status: 500 }
    )
  }
}
