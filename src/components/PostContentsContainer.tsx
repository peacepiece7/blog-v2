import { headers } from "next/headers"
import { Heading } from "mdast"
import { TreeNode } from "@/app/api/navigation/route"
import { ContentsLayout } from "@/components/layout/Layout"
import Navigation from "@/components/navigation/Navigation"
import { X_CUSTOM_URL } from "@/constants/server"
import { PostAreaSlideProvider } from "@/contexts/usePostAreaContext"
import { fetcher } from "@/utils/server"
import { createNavElements, createTOCElements } from "@/utils/server-components"
import { SearchItem } from "@/app/api/search/route"
import { SearchListProvider } from "@/contexts/useSearchListContext"

export default async function PostContentsContainer(
  props: Readonly<{
    children: React.ReactNode
  }>
) {
  const headerList = headers()
  const url = headerList.get(X_CUSTOM_URL) || ""
  const tocRes = await fetcher<{ tocTree: Heading[] }>(
    `/api/table-of-contents?url=${url}`
  )
  const navRes = await fetcher<{ navTree: TreeNode[] }>(`/api/navigation`, {})
  const searchRes = await fetcher<{ list: SearchItem[] }>(`/api/search`, {})

  return (
    <PostAreaSlideProvider>
      <SearchListProvider value={searchRes.list}>
        <Navigation
          activeTab="toc"
          navChildren={createNavElements(navRes.navTree, [], 0)}
          tocChildren={createTOCElements(tocRes.tocTree)}
        />
        <ContentsLayout key={url}>{props.children}</ContentsLayout>
      </SearchListProvider>
    </PostAreaSlideProvider>
  )
}
