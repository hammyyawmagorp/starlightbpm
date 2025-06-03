import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface ServiceInfo {
  id: number
  title: string
  main_para: string
  h1: string
  para_1: string
  h2: string
  para_2: string
  people_say1: string
  people_say2: string
  fact_1: string
  fact_2: string
  created_at: Date
  updated_at: Date
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title')

    if (!title) {
      return NextResponse.json(
        { error: 'Title parameter is required' },
        { status: 400 }
      )
    }

    console.log('Searching for service info with title:', title)

    // Get all titles for debugging
    const allTitles = await prisma.$queryRaw`
      SELECT title FROM service_info;
    `
    console.log('All available titles in database:', allTitles)

    // Try case-insensitive search
    const serviceInfo = await prisma.$queryRaw<ServiceInfo[]>`
      SELECT * FROM service_info WHERE LOWER(title) = LOWER(${title});
    `
    console.log('Query result for title:', title, serviceInfo)

    if (!serviceInfo || serviceInfo.length === 0) {
      console.log('No service info found for title:', title)
      return NextResponse.json(
        {
          error: 'Service not found',
          availableTitles: allTitles,
          searchedTitle: title,
        },
        { status: 404 }
      )
    }

    return NextResponse.json(serviceInfo[0])
  } catch (error) {
    console.error('Error in GET /api/service-info:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch service information',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      title,
      main_para,
      h1,
      para_1,
      h2,
      para_2,
      people_say1,
      people_say2,
      fact_1,
      fact_2,
    } = body

    if (
      !title ||
      !main_para ||
      !h1 ||
      !para_1 ||
      !h2 ||
      !para_2 ||
      !people_say1 ||
      !people_say2 ||
      !fact_1 ||
      !fact_2
    ) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Check if service info already exists
    const existingService = await prisma.$queryRaw<ServiceInfo[]>`
      SELECT * FROM service_info WHERE title = ${title}
    `

    if (existingService.length > 0) {
      return NextResponse.json(existingService[0])
    }

    // Create new service info
    const serviceInfo = await prisma.$queryRaw<ServiceInfo[]>`
      INSERT INTO service_info (
        title, main_para, h1, para_1, h2, para_2, 
        people_say1, people_say2, fact_1, fact_2
      ) VALUES (
        ${title}, ${main_para}, ${h1}, ${para_1}, ${h2}, ${para_2},
        ${people_say1}, ${people_say2}, ${fact_1}, ${fact_2}
      )
      RETURNING *
    `

    return NextResponse.json(serviceInfo[0])
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to create service information' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
