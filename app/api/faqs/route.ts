import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const faqs = await prisma.faqs.findMany({
      orderBy: {
        id: 'asc',
      },
    })

    if (!faqs || faqs.length === 0) {
      return NextResponse.json({ error: 'No FAQs found' }, { status: 404 })
    }

    return NextResponse.json(faqs)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 })
  }
}
