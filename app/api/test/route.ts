// app/api/test/route.ts
export async function GET() {
  throw new Error('Simulated 500 error')
}
