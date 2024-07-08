import { getFileNamesSafely } from '@/utils/fs'
import { NextRequest, NextResponse } from 'next/server'

export function GET(req: NextRequest) {
  //   const searchParams = req.nextUrl.searchParams
  //   const path = searchParams.get('path')
  //   if (!path) return NextResponse.error()
  //   const fileNames = getFileNamesSafely(path, '.mdx')
  //   return NextResponse.json(fileNames)
}
