// app/api/submitForm/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const formData = await request.json()

    if (!formData.name || !formData.email || !formData.phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

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

    return NextResponse.json(
      { success: true, message: 'Contact created successfully' },
      { status: 201 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
