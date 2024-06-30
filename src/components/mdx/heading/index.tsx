import { type ComponentPropsWithoutRef } from 'react'
import { HEADING } from './utils'

interface HeadingProps {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  props: ComponentPropsWithoutRef<'h1'>
}

export function Heading({ as, props }: HeadingProps) {
  const children = props.children as string
  return HEADING[as](children)
}
