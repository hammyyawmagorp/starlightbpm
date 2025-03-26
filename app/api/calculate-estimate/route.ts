import { NextResponse } from 'next/server'

type RequestData = {
  windowCount: number
  storyType: 'one' | 'two'
  cleaningType: 'full' | 'exterior'
}

export async function POST(request: Request) {
  try {
    const { windowCount, storyType, cleaningType } =
      (await request.json()) as RequestData

    if (!windowCount || !storyType || !cleaningType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    let base: number
    let baseCalc: number
    let price: number
    let message: string

    if (storyType === 'one') {
      if (cleaningType === 'full') {
        base = 175
        baseCalc = windowCount * 6.5
        price = windowCount >= 26 ? baseCalc : base
        message = `A one story full-cleaning for ${windowCount} windows will cost:`
      } else {
        base = 125
        baseCalc = windowCount * 5
        price = windowCount >= 26 ? baseCalc : base
        message = `A one story exterior only cleaning for ${windowCount} windows will cost:`
      }
    } else {
      if (cleaningType === 'full') {
        base = 250
        baseCalc = windowCount * 6.5
        price = windowCount >= 38 ? baseCalc : base
        message = `Full-cleaning for a 2+ story house with ${windowCount} windows will cost:`
      } else {
        base = 125
        baseCalc = windowCount * 5
        price = windowCount >= 38 ? baseCalc : base
        message = `Exterior only cleaning for a 2+ story house with ${windowCount} windows will cost:`
      }
    }

    return NextResponse.json({
      message,
      priceRange: `$${price} - $${price + 200} + HST`,
    })
  } catch {
    return NextResponse.json(
      { error: 'Failed to calculate estimate' },
      { status: 500 }
    )
  }
}
