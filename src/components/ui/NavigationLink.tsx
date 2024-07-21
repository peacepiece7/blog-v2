import Link from 'next/link'
export default function NavigationLink({
  href,
  children,
}: Readonly<{
  href: string
  children: React.ReactNode
}>) {
  return (
    <Link className='truncate select-none ml-1' href={href}>
      {children}
    </Link>
  )
}
