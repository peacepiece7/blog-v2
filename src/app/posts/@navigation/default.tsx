import { createTableOfContents } from '@/components/mdx/toc'
import { X_CUSTOM_URL } from '@/constants/server'
import { headers } from 'next/headers'

export default function NavFallbackPage() {
  const headerList = headers()
  const path = headerList.get(X_CUSTOM_URL) || ''
  const [_empty, posts, ...rest] = path.split('/')

  // toc => /posts/**/*
  // nav => /!posts/**/*

  return (
    <div>
      <p>navigation default page :</p>
      {createTableOfContents(`src/app/${posts}/@contents/${rest.join('/')}`)}
    </div>
  )
}
