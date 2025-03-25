import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const faqs = (await prisma.faqs.findMany()) || [] // Ensure it's faqs (not faq)
    return NextResponse.json(faqs)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to fetch FAQs', faqs: [] },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
