import {
  getASTTreeSafely,
  getFileNamesSafely,
  getPostFullPath,
} from '@/utils/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const createTableOfContents = async (path: string, index: number = 0) => {
    const fileNames = getFileNamesSafely(path, '.mdx')

    if (fileNames.length === 0) return ''
    const headingNodes = getASTTreeSafely<'heading'>(
      `${path}/${fileNames[index]?.name}`,
      'heading'
    )
    return headingNodes
  }

  try {
    const searchParams = new URL(request.url).searchParams
    const url = searchParams.get('url')?.split('/')

    if (!url || 2 >= url.length) return NextResponse.json({ tocTree: [] })

    const [_empty, _posts, ...rest] = url
    const index = rest[rest.length - 1]
    rest.pop()
    rest.push('[pageId]')

    const tocTree = await createTableOfContents(
      getPostFullPath(...rest),
      parseInt(index) - 1
    )

    return NextResponse.json({
      tocTree: tocTree,
    })
  } catch (err) {
    console.error(err)
    return NextResponse.error()
  }
}
