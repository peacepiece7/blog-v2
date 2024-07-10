import Link from 'next/link'

export function Header() {
  return (
    <div className='col-start-1 col-end-5 row-start-1 row-end-2'>
      <Link href='/'>Blog v2</Link>
    </div>
  )
}
