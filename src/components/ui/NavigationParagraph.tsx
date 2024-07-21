'use client'
export const NAV_DIR_CLASS_ID = 'nav-dir'

export default function NavigationParagraph({
  text,
}: Readonly<{
  text: string
}>) {
  return (
    <p
      className={`${NAV_DIR_CLASS_ID} truncate select-none ml-2`}
      data-name={text}
    >
      {text}
    </p>
  )
}
