// app/api/submitForm/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function POST(request: Request) {
  try {
    // Parse the JSON body
    const formData = await request.json()

    // Add logging to debug the incoming data
    console.log('Received form data:', JSON.stringify(formData, null, 2))

    // Validate the required fields
    if (!formData.name || !formData.email || !formData.phone) {
      console.log('Missing required fields:', {
        name: !formData.name,
        email: !formData.email,
        phone: !formData.phone,
      })
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    try {
      const contactData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address || null,
        city: formData.city || null,
        postal_code: formData.postalCode || null,
        message: formData.message || null,
      }

      console.log(
        'Attempting to create contact with data:',
        JSON.stringify(contactData, null, 2)
      )

      const newContact = await prisma.contact.create({
        data: contactData,
      })

      // Add logging for successful creation
      console.log(
        'Contact created successfully:',
        JSON.stringify(newContact, null, 2)
      )

      return NextResponse.json(
        {
          success: true,
          message: 'Form submitted successfully!',
          contact: newContact,
        },
        { status: 200 }
      )
    } catch (dbError) {
      console.error('Database error details:', {
        error: dbError,
        message: dbError instanceof Error ? dbError.message : 'Unknown error',
        stack: dbError instanceof Error ? dbError.stack : undefined,
      })
      throw dbError // Re-throw to be caught by outer catch
    }
  } catch (error) {
    // Detailed error logging
    console.error('Error details:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    })

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
