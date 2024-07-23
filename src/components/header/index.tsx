import Link from "next/link"

export function Header() {
  return (
    <div className="col-start-1 col-end-5 row-start-1 row-end-2 shadow-md border-b-[1px]">
      <Link href="/">
        <h1 className="w-fit text-2xl py-4 px-4">Blog 만드는 중..</h1>
      </Link>
    </div>
  )
}
