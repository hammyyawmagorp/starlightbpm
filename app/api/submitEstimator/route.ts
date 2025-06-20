import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library'
import { sendEstimatorFormEmail } from '@/lib/email'

const prisma = new PrismaClient()

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

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  return String(error)
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

    const formData = await request.json()

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate a unique confirmation number
    const timestamp = Date.now().toString().slice(-5) // Get last 5 digits of timestamp
    const random = Math.floor(Math.random() * 100000)
      .toString()
      .padStart(5, '0') // 5-digit random number
    const confNumber = `SBM${timestamp.slice(-2)}${random}` // Format: SBM1234567 (10 chars)

    // Format estimate details
    let estimateDetails: string
    if (formData.storyType === 'one') {
      if (formData.cleaningType === 'full') {
        const base = 175
        const baseCalc = formData.windowCount * 6.5
        const price = formData.windowCount >= 26 ? baseCalc : base
        estimateDetails = `One story full-cleaning for ${formData.windowCount} windows: $${price} - $${price + 200} + HST`
      } else {
        const base = 125
        const baseCalc = formData.windowCount * 5
        const price = formData.windowCount >= 26 ? baseCalc : base
        estimateDetails = `One story exterior only cleaning for ${formData.windowCount} windows: $${price} - $${price + 200} + HST`
      }
    } else {
      if (formData.cleaningType === 'full') {
        const base = 250
        const baseCalc = formData.windowCount * 6.5
        const price = formData.windowCount >= 38 ? baseCalc : base
        estimateDetails = `Full-cleaning for a 2+ story house with ${formData.windowCount} windows: $${price} - $${price + 200} + HST`
      } else {
        const base = 125
        const baseCalc = formData.windowCount * 5
        const price = formData.windowCount >= 38 ? baseCalc : base
        estimateDetails = `Exterior only cleaning for a 2+ story house with ${formData.windowCount} windows: $${price} - $${price + 200} + HST`
      }
    }

    const submissionData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address || null,
      city: formData.city || null,
      postal_code: formData.postalCode || null,
      window_count: formData.windowCount,
      story_type: formData.storyType,
      cleaning_type: formData.cleaningType,
      estimate_details: estimateDetails,
      conf_number: confNumber,
    }

    try {
      const newSubmission = await prisma.estimatorSubmission.create({
        data: submissionData,
      })

      // Send email notification
      try {
        await sendEstimatorFormEmail({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          windowCount: formData.windowCount,
          storyType: formData.storyType,
          cleaningType: formData.cleaningType,
          confNumber: confNumber,
        })
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError)
        // Don't fail the request if email fails, just log it
      }

      return NextResponse.json({
        success: true,
        message: 'Form submitted successfully!',
        submission: newSubmission,
        confNumber: confNumber,
      })
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error'
      console.log('Database error:', errorMessage)

      if (error instanceof PrismaClientKnownRequestError) {
        return NextResponse.json(
          {
            success: false,
            message: 'Database error',
            error: error.message,
          },
          { status: 500 }
        )
      }

      if (error instanceof PrismaClientValidationError) {
        return NextResponse.json(
          {
            success: false,
            message: 'Validation error',
            error: error.message,
          },
          { status: 400 }
        )
      }

      return NextResponse.json(
        {
          success: false,
          message: 'Failed to submit form',
          error: errorMessage,
        },
        { status: 500 }
      )
    }
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error)
    console.log('Error in submitEstimator:', errorMessage)

    return NextResponse.json(
      {
        success: false,
        message: 'Error submitting form',
        error: errorMessage,
      },
      { status: 500 }
    )
  }
}
