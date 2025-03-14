// app/api/submitForm/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function POST(request: Request) {
  try {
    // Parse the JSON body
    const formData = await request.json()

    // Add logging to debug the incoming data
    console.log('Received form data:', formData)

    // Validate the required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.postalCode
    ) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    const newCustomer = await prisma.customer.create({
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        postal_code: formData.postalCode,
        message: formData.message,
      },
    })

    // Add logging for successful creation
    console.log('Customer created successfully:', newCustomer)

    return NextResponse.json(
      {
        success: true,
        message: 'Form submitted successfully!',
        customer: newCustomer,
      },
      { status: 200 }
    )
  } catch (error) {
    // Detailed error logging
    console.error('Error details:', error)

    // Handle specific Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          message: 'Database error',
          error: error.message,
          code: error.code,
        },
        { status: 500 }
      )
    }

    // Handle validation errors
    if (error instanceof Prisma.PrismaClientValidationError) {
      return NextResponse.json(
        {
          message: 'Validation error',
          error: error.message,
        },
        { status: 400 }
      )
    }

    // Generic error response
    return NextResponse.json(
      {
        success: false,
        message: 'Error submitting form',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
