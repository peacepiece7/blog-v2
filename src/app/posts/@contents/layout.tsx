import { TreeNode } from '@/app/api/navigation/route'
import { ContentsLayout } from '@/components/layout/Layout'
import Navigation from '@/components/navigation/Navigation'
import { X_CUSTOM_URL } from '@/constants/server'
import { fetcher } from '@/utils/server'
import { createNavElements, createTOCElements } from '@/utils/server-components'
import { Heading } from 'mdast'
import { headers } from 'next/headers'

export default async function ContentsLayoutPage(
  props: Readonly<{
    children: React.ReactNode
  }>
) {
  const headerList = headers()
  const url = headerList.get(X_CUSTOM_URL) || ''
  const tocRes = await fetcher<{ tocTree: Heading[] }>(
    `/api/table-of-contents?url=${url}`
  )
  const navRes = await fetcher<{ navTree: TreeNode[] }>(`/api/navigation`, {})

  return (
    <>
      <Navigation
        activeTab='toc'
        navChildren={createNavElements(navRes.navTree, [], 0)}
        tocChildren={createTOCElements(tocRes.tocTree)}
      />
      <ContentsLayout>{props.children}</ContentsLayout>
    </>
  )
}
