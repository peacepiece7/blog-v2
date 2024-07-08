// import Navigation from './Navigation'
// import { TableOfContents } from './TableOfContents'

// export function LeftSideBar() {
//   // navigation data
//   // tableofcontents data

//   return (
//     <>
//       <div className='flex'>
//         <button className='mr-10'>Navigation</button>
//         <button>Table of Contents</button>
//       </div>
//       {/* {tabIdx === 0 ? <Navigation /> : <TableOfContents />} */}
//     </>
//   )
// }

import { createTableOfContents } from '@/components/mdx/toc'
import { X_CUSTOM_URL } from '@/constants/server'
import { getPostPath } from '@/utils/fs'
import { headers } from 'next/headers'

export function LeftSideBar() {
  const headerList = headers()
  const url = headerList.get(X_CUSTOM_URL) || '' // /posts/raspberry_pi_home_server/1
  const isPostPage = headerList.get(X_CUSTOM_URL)?.includes('posts')
  const [_empty, _posts, ...rest] = url.split('/')
  const index = rest[rest.length - 1]
  rest.pop()
  rest.push('[index]')

  return (
    <>
      <div className='flex'>
        <button className='mr-10'>Navigation</button>
        <button>Table of Contents</button>
      </div>
      {isPostPage &&
        createTableOfContents(getPostPath(...rest), parseInt(index) - 1)}
    </>
  )
}
