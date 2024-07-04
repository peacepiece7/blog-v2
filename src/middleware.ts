import { NextRequest, NextResponse } from 'next/server'
import { urlPathRegExp } from '@/constants/regexp'
import { X_CUSTOM_URL } from '@/constants/server'

/**
 * 로그인 여부를 검사하는 미들웨어 입니다.
 */
export async function middleware(req: NextRequest) {
  const match = req.url.match(urlPathRegExp)
  const path = match ? match[1] : '/'

  req.headers.set(X_CUSTOM_URL, path)

  return NextResponse.next({
    request: {
      headers: req.headers,
    },
  })
}
// 로그인을 해야하는 경우만 미들웨어 사용
export const config = {
  matcher: ['/posts/:path*'],
}
