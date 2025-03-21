import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('Attempting to fetch services...')
    const services = await prisma.services.findMany({
      orderBy: {
        id: 'asc',
      },
    })
    console.log('Services fetched successfully:', services)

    if (!services || services.length === 0) {
      console.log('No services found')
      return NextResponse.json({ error: 'No services found' }, { status: 404 })
    }

    return NextResponse.json({ data: services })
  } catch (error) {
    console.error('Detailed error in getCardInfo:', {
      name: error instanceof Error ? error.name : 'Unknown error type',
      message: error instanceof Error ? error.message : 'Unknown error message',
      stack: error instanceof Error ? error.stack : 'No stack trace',
    })

    return NextResponse.json(
      {
        error: 'Failed to fetch services',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
