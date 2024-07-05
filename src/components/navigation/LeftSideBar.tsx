import Navigation from './Navigation'
import { TableOfContents } from './TableOfContents'

export function LeftSideBar() {
  // navigation data
  // tableofcontents data

  return (
    <>
      <div className='flex'>
        <button className='mr-10'>Navigation</button>
        <button>Table of Contents</button>
      </div>
      {/* {tabIdx === 0 ? <Navigation /> : <TableOfContents />} */}
    </>
  )
}
