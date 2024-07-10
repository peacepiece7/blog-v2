import { headers } from 'next/headers'

/**
 * @param path /api/...?query=... 형태로 입력한다.
 */
export const fetcher = async <T>(path: string, options?: RequestInit) => {
  const headerList = headers()
  const host = headerList.get('host')
  const sheme = process.env.NODE_ENV === 'development' ? 'http' : 'https'
  const url = `${sheme}://${host}${path}`
  return fetch(url, options).then((res) => res.json() as T)
}
