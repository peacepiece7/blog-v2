import type { MDXComponents } from 'mdx/types'
import { Heading } from '@/components/heading'
import { CodeBlock } from '@/components/codeBlock'
import { Preview } from '@/components/preview'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  /**
   * @node code-block
   * pre > code.language-<name>
   */
  return {
    h1: Heading,
    code: CodeBlock,
    pre: Preview,
    ...components,
  }
}
