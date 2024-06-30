import type { MDXComponents } from 'mdx/types'
import { CodeBlock } from '@/components/mdx/codeBlock'
import { Preview } from '@/components/mdx/preview'
import { Heading } from './components/mdx/heading'
import Anchor from './components/mdx/link'
import { List } from './components/mdx/list'
import { Paragraph } from './components/mdx/paragraph'
import { Blockquote } from './components/mdx/blockquote'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  /**
   * @node code-block
   * pre > code.language-<name>
   */
  return {
    h1: (props) => Heading({ as: 'h1', props }),
    h2: (props) => Heading({ as: 'h2', props }),
    h3: (props) => Heading({ as: 'h3', props }),
    h4: (props) => Heading({ as: 'h4', props }),
    h5: (props) => Heading({ as: 'h5', props }),
    h6: (props) => Heading({ as: 'h6', props }),
    ul: (props) => List({ as: 'ul', props }),
    ol: (props) => List({ as: 'ol', props }),
    li: (props) => List({ as: 'li', props }),
    blockquote: Blockquote,
    code: CodeBlock,
    pre: Preview,
    a: Anchor,
    p: Paragraph,
    ...components,
  }
}
