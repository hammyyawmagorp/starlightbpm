import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const services = await prisma.services.findMany({
      orderBy: {
        id: 'asc',
      },
    })

    if (!services || services.length === 0) {
      return NextResponse.json({ error: 'No services found' }, { status: 404 })
    }

    return NextResponse.json({ data: services })
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}
