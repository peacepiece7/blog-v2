import { NextResponse } from 'next/server'

export async function GET() {
  console.log('GET /api/navigation/route.ts')
  // TODO : createTableOfContents에서 return heainds
  return NextResponse.json('')
}
