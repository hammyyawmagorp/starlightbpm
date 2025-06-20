// app/api/submitForm/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendContactFormEmail } from '@/lib/email'

// Simple rate limiting configuration
const RATE_LIMIT = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 20, // 20 requests per minute
  store: new Map<string, { count: number; resetTime: number }>(),
}

// Clean up old entries every 5 minutes
setInterval(
  () => {
    const now = Date.now()
    for (const [key, value] of RATE_LIMIT.store.entries()) {
      if (now > value.resetTime) {
        RATE_LIMIT.store.delete(key)
      }
    }
  },
  5 * 60 * 1000
)

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

    const formData = await request.json()

    if (!formData.name || !formData.email || !formData.phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Save to database
    await prisma.contact.create({
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address || null,
        city: formData.city || null,
        postal_code: formData.postalCode || null,
        message: formData.message || null,
      },
    })

    // Send email notification
    try {
      await sendContactFormEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        message: formData.message,
      })
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError)
      // Don't fail the request if email fails, just log it
    }

    return NextResponse.json(
      { success: true, message: 'Contact created successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error in submitForm:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
