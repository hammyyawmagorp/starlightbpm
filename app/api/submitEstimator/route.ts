import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library'
import { generateConfirmationNumber } from '@/lib/utils'

type ErrorWithMessage = {
  message: string
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  )
}

function getErrorMessage(error: unknown): string {
  if (isErrorWithMessage(error)) return error.message
  return 'Unknown error'
}

export async function POST(request: Request) {
  try {
    const formData = await request.json()
    console.log('Received form data:', formData)

    if (!formData.name || !formData.email || !formData.phone) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields',
          error: 'Validation error',
        },
        { status: 400 }
      )
    }

    const confNumber = generateConfirmationNumber()
    console.log('Generated confirmation number:', confNumber)

    // Format estimate details
    let estimateDetails: string
    if (formData.estimateDetails) {
      estimateDetails =
        typeof formData.estimateDetails === 'string'
          ? formData.estimateDetails
          : JSON.stringify(formData.estimateDetails)
    } else {
      // If for some reason it's missing, throw an error
      return NextResponse.json(
        {
          success: false,
          message: 'Missing estimate details',
          error: 'Validation error',
        },
        { status: 400 }
      )
    }

    const submissionData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address || undefined,
      city: formData.city || undefined,
      postal_code: formData.postalCode || undefined,
      message: formData.message || undefined,
      estimate_details: estimateDetails,
      conf_number: confNumber,
    }

    console.log('Creating submission with data:', submissionData)

    try {
      const newSubmission = await prisma.estimatorSubmission.create({
        data: submissionData,
      })

      console.log('Submission created:', newSubmission)

      return NextResponse.json(
        {
          success: true,
          message: 'Form submitted successfully!',
          submission: newSubmission,
          confNumber: confNumber,
        },
        { status: 200 }
      )
    } catch (dbError: unknown) {
      const errorMessage = getErrorMessage(dbError)
      console.log('Database error:', errorMessage)

      if (dbError instanceof PrismaClientKnownRequestError) {
        return NextResponse.json(
          {
            success: false,
            message: 'Database error',
            error: dbError.message,
          },
          { status: 500 }
        )
      }

      if (dbError instanceof PrismaClientValidationError) {
        return NextResponse.json(
          {
            success: false,
            message: 'Validation error',
            error: dbError.message,
          },
          { status: 400 }
        )
      }

      return NextResponse.json(
        {
          success: false,
          message: 'Database error',
          error: 'Unknown database error',
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
