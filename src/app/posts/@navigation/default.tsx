import { createTableOfContents } from '@/components/mdx/toc'
import { X_CUSTOM_URL } from '@/constants/server'
import { getPostPath } from '@/utils/fs'
import { headers } from 'next/headers'

export default function NavFallbackPage() {
  const headerList = headers()
  const url = headerList.get(X_CUSTOM_URL) || '' // /posts/raspberry_pi_home_server/1
  const [_empty, _posts, ...rest] = url.split('/')

  const index = rest[rest.length - 1]
  rest.pop()
  rest.push('[index]')
  const contentPath = getPostPath(...rest)

  return (
    <div>
      <p>navigation default page :</p>
      {createTableOfContents(contentPath, parseInt(index) - 1)}
    </div>
  )
}
