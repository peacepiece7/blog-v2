import Link from 'next/link'

export function Header() {
  return (
    <div className='col-start-1 col-end-5 row-start-1 row-end-2 shadow-md'>
      <Link href='/'>
        <h1 className='w-fit text-2xl pt-2 px-4'>Blog v2</h1>
      </Link>
    </div>
  )
}
