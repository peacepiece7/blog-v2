import type { MDXComponents } from 'mdx/types'
import { Heading } from '@/components/heading'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  /**
   * @node code-block
   * pre > code.language-<name>
   */
  return {
    h1: Heading,
    pre: (props) => {
      return <pre {...props} />
    }, // pre > code.language-<name>
    ...components,
  }
}
